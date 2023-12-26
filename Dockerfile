
FROM node:16.17-alpine as node
RUN apk update && \
    apk add --no-cache curl

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build
RUN yarn add serve --dev
RUN yarn prod

EXPOSE 5173
CMD ["yarn", "prod"]