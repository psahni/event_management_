package cmd

import (
	"booking_server/internal/config"
	"booking_server/internal/lib/http"
	"context"
	"fmt"

	"github.com/redis/go-redis/v9"
	"github.com/spf13/cobra"
)

var cacheEventsCmd = &cobra.Command{
	RunE:  cacheEvents,
	Use:   "cache_events",
	Short: "cache events from the events app server",
}

func cacheEvents(_ *cobra.Command, _ []string) error {
	err := config.Read()
	if err != nil {
		fmt.Println(err)
		panic("Invalid configuration")
	}
	cfg := config.GetConfig()

	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%v:%v", cfg.Redis.Host, cfg.Redis.Port),
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})

	err = client.Ping(context.Background()).Err()

	if err != nil {
		return err
	}

	ctx := context.Background()
	httpClient := http.GetHttpClient()
	url := fmt.Sprintf("%v/%v", cfg.APIS.EventAppUrl, "api/events")

	http.MakeRequest(ctx, httpClient, url, "GET")
	return nil
}
