# syntax=docker/dockerfile:1
FROM node:20-slim AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml tsconfig.base.json ./
COPY apps/web/package.json apps/web/
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --frozen-lockfile --filter @novalms/web...
COPY . .
RUN pnpm --filter @novalms/web build

FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/apps/web/.next ./apps/web/.next
COPY --from=base /app/apps/web/public ./apps/web/public
COPY --from=base /app/apps/web/package.json ./apps/web/package.json
COPY --from=base /app/node_modules ./node_modules
CMD ["pnpm", "--filter", "@novalms/web", "start"]
