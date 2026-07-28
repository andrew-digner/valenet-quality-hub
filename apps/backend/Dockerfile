# syntax=docker/dockerfile:1.7

FROM node:24-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME/bin:$PATH
RUN corepack enable
WORKDIR /workspace

FROM base AS fetched
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=valenet-pnpm-store,target=/pnpm/store \
    pnpm fetch --frozen-lockfile

FROM fetched AS build
COPY . .
RUN --mount=type=cache,id=valenet-pnpm-store,target=/pnpm/store \
    pnpm install --offline --frozen-lockfile
ENV DATABASE_URL=postgresql://valenet:build-only@localhost:5432/valenet_quality_hub?schema=public
RUN pnpm --filter @valenet/backend prisma:generate
RUN pnpm --filter @valenet/backend build
RUN --mount=type=cache,id=valenet-pnpm-store,target=/pnpm/store \
    pnpm --filter @valenet/backend --prod deploy /prod/backend

FROM node:24-alpine AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build --chown=node:node /prod/backend ./
USER node
EXPOSE 3001
CMD ["node", "dist/main.js"]
