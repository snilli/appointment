# ------ BUILDER ------ #
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY . .

RUN pnpm add -g turbo

FROM base AS builder
RUN turbo prune --scope=appointments --docker

FROM base AS installer
WORKDIR /app

# COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml

RUN pnpm
RUN turbo run build --filter=appointments...

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


WORKDIR /app/apps/backend

EXPOSE 3000

CMD ["node", "dist/main.js"]