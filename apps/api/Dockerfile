# syntax=docker/dockerfile:1
FROM node:20-slim AS base
WORKDIR /app
COPY package.json pnpm-workspace.yaml tsconfig.base.json .npmrc*? ./
COPY apps/api/package.json apps/api/
RUN corepack enable && corepack prepare pnpm@8.15.4 --activate
RUN pnpm install --frozen-lockfile --filter @novalms/api...
COPY . .
RUN pnpm --filter @novalms/api build

FROM node:20-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=base /app/apps/api/dist ./apps/api/dist
COPY --from=base /app/apps/api/package.json ./apps/api/package.json
COPY --from=base /app/node_modules ./node_modules
CMD ["node", "apps/api/dist/main.js"]
