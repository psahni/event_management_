package cmd

import (
	"context"
	"fmt"
	"net/http"

	"booking_server/db"
	"booking_server/internal/config"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/redis/go-redis/v9"
	"github.com/spf13/cobra"
)

var httpServerCommand = &cobra.Command{
	RunE:  runHTTPServer,
	Use:   "http_server",
	Short: "to run http server",
}

func runHTTPServer(_ *cobra.Command, _ []string) error {
	fmt.Println("==runHTTPServer()")
	err := config.Read()
	if err != nil {
		fmt.Println(err)
		panic("Invalid configuration")
	}
	cfg := config.GetConfig()
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	gormDB, err := db.Connect()
	if err == nil {
		fmt.Println("Successfully connected to DB", gormDB)
	} else {
		panic("can't connect to DB")
	}

	ctx := context.Background()

	// Connect to redis server
	client := redis.NewClient(&redis.Options{
		Addr:     fmt.Sprintf("%v:%v", cfg.Redis.Host, cfg.Redis.Port),
		Password: cfg.Redis.Password,
		DB:       cfg.Redis.DB,
	})

	testRedis(ctx, client)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello booking server"))
	})

	http.ListenAndServe(fmt.Sprintf(":%d", cfg.Server.Port), r)
	return nil
}

func testRedis(ctx context.Context, client *redis.Client) {
	err := client.Set(ctx, "foo", "bar", 0).Err()
	if err != nil {
		panic(err)
	}

	val, err := client.Get(ctx, "foo").Result()
	if err != nil {
		panic(err)
	}

	if val == "bar" {
		fmt.Println("redis is working")
	}
}
