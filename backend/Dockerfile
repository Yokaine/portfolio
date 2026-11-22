FROM php:8.3-cli-alpine

RUN apk add --no-cache git unzip
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app
EXPOSE 8000

CMD ["sh", "-c", "composer install --no-interaction --prefer-dist && php -S 0.0.0.0:8000 -t public"]
