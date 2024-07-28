package tasks

import (
	"booking_server/internal/config"
	"booking_server/internal/events"
	httpLib "booking_server/internal/lib/http"
	"context"
	"encoding/json"
	"fmt"

	"github.com/redis/go-redis/v9"
	"github.com/spf13/cobra"
)

var CacheEventsCmd = &cobra.Command{
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
	httpClient := httpLib.GetHttpClient()
	url := fmt.Sprintf("%v/%v", cfg.APIS.EventAppUrl, "api/events")

	var response []byte
	response, err = httpLib.GetRequest(ctx, httpClient, url)
	if err != nil {
		fmt.Println("Error in fetching events ", err)
	}
	var events []events.Event
	err = json.Unmarshal(response, &events)
	if err != nil {
		fmt.Println("Error in fetching events ", err)
	}

	client.Del(ctx, "eventsMap")

	for _, event := range events {
		err := client.HSet(ctx, "eventsMap", event.ID, event.TicketsAvailable).Err()
		if err != nil {
			panic(err)
		}
	}

	/*
		val, err := client.HMGet(ctx, "eventsMap", "66a23cd5725cdab3e4c68049").Result()
		if err != nil {
			panic(err)
		}
		fmt.Println("val", val[0])
	*/
	return nil
}
