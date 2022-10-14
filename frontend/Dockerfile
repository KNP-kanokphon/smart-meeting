FROM node:18-alpine as builder

ENV DISABLE_ESLINT_PLUGIN true

ARG REACT_APP_API_BASE_URL

ENV REACT_APP_API_BASE_URL https://ddebt.gsb.or.th/public/api/report

WORKDIR /app
COPY package*.json ./
RUN npm ci --ignore-scripts 
COPY . .

RUN npm run build

FROM nginx

RUN apt-get update \
  && apt-get upgrade -y \
  && apt-get remove -y curl

RUN chgrp -R root /var/cache/nginx && chmod -R 770 /var/cache/nginx
RUN chgrp -R root /var/run && chmod -R 770 /var/run

ADD deploy/default.conf /etc/nginx/conf.d/
RUN mkdir -p /usr/share/nginx/html/report
COPY --from=builder /app/build /usr/share/nginx/html/report
# ADD deploy/default.conf /etc/nginx/conf.d/
# COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
