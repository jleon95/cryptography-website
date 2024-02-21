FROM node:lts-alpine
WORKDIR /back
COPY ./ .
RUN npm install && npx prisma generate --schema=./src/prisma/schema.prisma && npm run build
ENTRYPOINT ["/bin/ash"]
CMD ["docker_startup.sh"]