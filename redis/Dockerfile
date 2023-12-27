FROM alpine3.18

RUN apk add redis

EXPOSE 6379

CMD ["redis-server", "$PWD/redis/redis.conf"]