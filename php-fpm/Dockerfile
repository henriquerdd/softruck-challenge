FROM php:7.2.15-fpm-alpine3.9

# Add a non-root user to prevent files being created with root permissions on host machine.
ARG PUID=1000
ARG PGID=1000
ARG NON_ROOT_USER=laravel
ARG NON_ROOT_GROUP=laravel

ARG APP_MNT_PATH=/app

USER root

RUN apk update \
	&& apk add --no-cache zlib zlib-dev postgresql-dev \
	&& docker-php-ext-install -j$(nproc) mysqli pdo pdo_mysql pdo_pgsql mbstring zip json bcmath pgsql

ADD ./laravel.ini /usr/local/etc/php/conf.d
ADD ./laravel.pool.conf /usr/local/etc/php-fpm.d/

RUN set -x \
	&& addgroup -g ${PGID} -S ${NON_ROOT_GROUP} \
	&& adduser -u ${PUID} -D -S -G ${NON_ROOT_GROUP} ${NON_ROOT_USER}

USER ${NON_ROOT_USER}

WORKDIR ${APP_MNT_PATH}

EXPOSE 9000

CMD ["php-fpm"]
