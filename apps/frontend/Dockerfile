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
RUN pnpm --filter @valenet/frontend build

FROM node:24-alpine AS runtime
ENV HOSTNAME=0.0.0.0
ENV NODE_ENV=production
ENV PORT=3000
WORKDIR /app
COPY --from=build --chown=node:node /workspace/apps/frontend/.next/standalone ./
COPY --from=build --chown=node:node /workspace/apps/frontend/.next/static ./apps/frontend/.next/static
USER node
EXPOSE 3000
CMD ["node", "apps/frontend/server.js"]
