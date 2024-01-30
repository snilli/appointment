FROM node:20-alpine AS base
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN pnpm add -g turbo

FROM base AS builder
WORKDIR /app
COPY . .
RUN turbo prune --scope=appointments --docker

FROM base AS installer
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/full/ .
RUN pnpm install --frozen-lockfile
RUN turbo run build --filter=appointments...
RUN pnpm install --prod --frozen-lockfile

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nest
USER nest

COPY --from=installer --chown=nest:nodejs /app/apps/backend/dist ./apps/backend/dist
COPY --from=installer --chown=nest:nodejs /app/apps/backend/node_modules ./apps/backend/node_modules
COPY --from=installer --chown=nest:nodejs /app/apps/backend/package.json ./apps/backend/package.json

COPY --from=installer --chown=nest:nodejs /app/package.json ./package.json
COPY --from=installer --chown=nest:nodejs /app/node_modules ./node_modules
COPY --from=installer --chown=nest:nodejs /app/turbo.json ./turbo.json

EXPOSE 3000

CMD ["node", "apps/backend/dist/main.js"]