FROM node:14.17.0-alpine AS build
WORKDIR .

COPY package.json ./
COPY src ./src
COPY public ./public

RUN yarn install
RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /build /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

RUN chmod +x env.sh

RUN apk add --no-cache bash

EXPOSE 80

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]