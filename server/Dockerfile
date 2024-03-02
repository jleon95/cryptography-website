FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /back
COPY ./ .
EXPOSE 1337
RUN npm install && \ 
	npx prisma generate --schema=./src/prisma/schema.prisma && \
	npm run build
ENTRYPOINT ["/bin/ash"]
CMD ["docker_startup.sh"]