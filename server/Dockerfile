FROM node:24-bullseye AS build
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npx prisma generate --schema=./src/prisma/schema.prisma && \
    npm run build && \
    npm prune --omit=dev

FROM node:24-bullseye-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY --from=build --exclude=./*.json --exclude=./*.tsbuildinfo --exclude=**/*.ts* /app ./

EXPOSE 1337
CMD ["sh", "./docker_startup/docker_startup.sh"]