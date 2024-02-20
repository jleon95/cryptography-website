FROM node:lts-alpine
WORKDIR /back
COPY ./ .
RUN npm install && npm run build
CMD ["npm", "run", "start"]