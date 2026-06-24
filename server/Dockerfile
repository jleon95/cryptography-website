FROM node:20-bullseye-slim
ENV NODE_ENV=production
WORKDIR /back
COPY ./ .
EXPOSE 1337
RUN npm install && \ 
	npx prisma generate --schema=./src/prisma/schema.prisma && \
	npm run build
CMD ["sh", "docker_startup/docker_startup.sh"]