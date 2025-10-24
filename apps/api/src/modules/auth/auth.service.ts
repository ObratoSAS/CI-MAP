import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import { prisma } from '../../prisma/client';

const ACCESS_TOKEN_TTL = '15m';
const REFRESH_TOKEN_TTL = '7d';

export const authService = {
  async register(input: { email: string; password: string; firstName: string; lastName: string }) {
    const existing = await prisma.user.findUnique({ where: { email: input.email } });
    if (existing) {
      throw createError(409, 'Email already registered');
    }

    const passwordHash = await argon2.hash(input.password);
    const user = await prisma.user.create({
      data: {
        email: input.email,
        passwordHash,
        firstName: input.firstName,
        lastName: input.lastName,
      },
    });

    return { user: sanitizeUser(user) };
  },

  async login(input: { email: string; password: string }) {
    const user = await prisma.user.findUnique({ where: { email: input.email } });
    if (!user) {
      throw createError(401, 'Invalid credentials');
    }

    const valid = await argon2.verify(user.passwordHash, input.password);
    if (!valid) {
      throw createError(401, 'Invalid credentials');
    }

    const tokens = signTokens(user.id);
    await upsertSession(user.id, tokens.refreshToken);

    return { user: sanitizeUser(user), ...tokens };
  },

  async refresh(refreshToken: string | undefined) {
    if (!refreshToken) {
      throw createError(400, 'Refresh token required');
    }

    const payload = verifyToken(refreshToken, 'refresh');
    const session = await prisma.session.findUnique({ where: { token: refreshToken } });
    if (!session) {
      throw createError(401, 'Session not found');
    }

    const tokens = signTokens(payload.sub);
    await upsertSession(payload.sub, tokens.refreshToken);

    return tokens;
  },
};

function sanitizeUser(user: { id: string; email: string; firstName: string | null; lastName: string | null }) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

function signTokens(userId: string) {
  const privateKey = process.env.JWT_PRIVATE_KEY;
  const publicKey = process.env.JWT_PUBLIC_KEY;

  if (!privateKey || !publicKey) {
    throw new Error('JWT keys not configured');
  }

  const accessToken = jwt.sign({ sub: userId, type: 'access' }, privateKey, {
    algorithm: 'RS256',
    expiresIn: ACCESS_TOKEN_TTL,
  });

  const refreshToken = jwt.sign({ sub: userId, type: 'refresh' }, privateKey, {
    algorithm: 'RS256',
    expiresIn: REFRESH_TOKEN_TTL,
  });

  return { accessToken, refreshToken };
}

function verifyToken(token: string, type: 'access' | 'refresh') {
  const publicKey = process.env.JWT_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error('JWT public key not configured');
  }

  const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
  if (typeof payload === 'string') {
    throw createError(401, 'Invalid token payload');
  }

  if ((payload as { type?: string }).type !== type) {
    throw createError(401, 'Token type mismatch');
  }

  return payload as { sub: string; type: string };
}

async function upsertSession(userId: string, token: string) {
  await prisma.session.upsert({
    where: { token },
    create: { userId, token },
    update: { userId },
  });
}
