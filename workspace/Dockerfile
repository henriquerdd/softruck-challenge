FROM prooph/composer:7.2

#####################################
# Non-Root User:
#####################################

# Add a non-root user to prevent files being created with root permissions on host machine.
ARG PUID=1000
ARG PGID=1000
ARG NON_ROOT_USER=laravel
ARG NON_ROOT_GROUP=laravel

ARG APP_MNT_PATH=/app

# RUN groupadd -g ${PGID} ${NON_ROOT_GROUP} \
#     && useradd -u ${PUID} -g ${NON_ROOT_GROUP} -m ${NON_ROOT_USER}

RUN set -x \
	&& addgroup -g ${PGID} -S ${NON_ROOT_GROUP} \
	&& adduser -u ${PUID} -D -S -G ${NON_ROOT_GROUP} ${NON_ROOT_USER} 

#####################################
# Set Timezone
#####################################

ARG TZ=UTC
ENV TZ ${TZ}
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

#####################################
# Non-root user : PHPUnit path
#####################################

# add ./vendor/bin to non-root user's bashrc (needed for phpunit)
USER ${NON_ROOT_USER}

RUN echo "" >> ~/.bashrc && \
    echo 'export PATH="${APP_MNT_PATH}/vendor/bin:$PATH"' >> ~/.bashrc

#####################################
# Laravel Artisan Alias
#####################################

USER root

RUN echo "" >> ~/.bashrc && \
    echo 'alias art="php artisan"' >> ~/.bashrc && \
    echo 'alias phpunit="$(pwd)/vendor/bin/phpunit"' >> ~/.bashrc

USER ${NON_ROOT_USER}

# Set default work directory
WORKDIR ${APP_MNT_PATH}