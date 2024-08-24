package config

import (
	"fmt"

	"github.com/redis/go-redis/v9"
)

var redisClient *redis.Client

func ConnectRedis(host string, port int) {
	redisClient = redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%v:%v", host, port),
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})
}

func GetRedisClient() *redis.Client {
	return redisClient
}
