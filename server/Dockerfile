FROM node:24-bullseye AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate --schema=./src/prisma/schema.prisma && \
    npm run build && \
    npm prune --omit=dev

FROM node:24-bullseye-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/app.js ./app.js
COPY --from=build /app/logger.js ./logger.js
COPY --from=build /app/environment.d.ts ./environment.d.ts
COPY --from=build /app/src ./src
COPY --from=build /app/src/prisma/schema.prisma ./src/prisma/schema.prisma
COPY --from=build /app/docker_startup ./docker_startup

EXPOSE 1337
CMD ["sh", "./docker_startup/docker_startup.sh"]