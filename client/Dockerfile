FROM node:lts-alpine as build
ENV NODE_ENV=production
WORKDIR /front
COPY ./ .
ARG VITE_BACKEND_BASE_URL
ARG VITE_MAX_HINTS
RUN npm install && npm run build

FROM nginx:alpine
COPY --from=build --chmod=755 /front/docker_entrypoint_scripts/*.sh /docker-entrypoint.d
COPY --from=build /front/dist /usr/share/nginx/html
COPY --from=build /front/nginx_conf /etc/nginx/conf.d