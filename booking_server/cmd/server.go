package cmd

import (
	"fmt"
	"net/http"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/v5/middleware"
	"booking_server/db"
	"booking_server/internal/config"
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

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world..."))
	})

	http.ListenAndServe(fmt.Sprintf(":%d", cfg.Server.Port), r)
	return nil
}
