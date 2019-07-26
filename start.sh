docker-compose up -d svc-nginx svc-php-fpm svc-mysql && 
docker-compose run -u $UID --entrypoint "php artisan config:cache" svc-php-fpm &&
docker-compose run -u $UID --entrypoint "php artisan migrate" svc-php-fpm