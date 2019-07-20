FROM nginx:1.15.9-alpine

ARG PUID=1000
ARG PGID=1000
ARG NON_ROOT_USER=laravel
ARG NON_ROOT_GROUP=laravel

ARG PHP_UPSTREAM=svc-php-fpm:9000

ARG APP_MNT_PATH=/app

ADD nginx.conf /etc/nginx/
ADD sites/ /etc/nginx/sites-available

RUN apk update \
    && set -x \
	&& addgroup -g ${PGID} -S ${NON_ROOT_GROUP} \
	&& adduser -u ${PUID} -D -S -G ${NON_ROOT_GROUP} ${NON_ROOT_USER} \
    && rm /etc/nginx/conf.d/default.conf \
    && echo "upstream php-upstream { server ${PHP_UPSTREAM}; }" > /etc/nginx/conf.d/upstream.conf

WORKDIR ${APP_MNT_PATH}

CMD ["nginx"]

EXPOSE 80 443