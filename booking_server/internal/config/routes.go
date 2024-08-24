package config

import (
	"booking_server/internal/booking"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func ConfigureRoutes() *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello booking server"))
	})

	bookingHandler := booking.NewHandler()
	r.Route("/v1", func(r chi.Router) {
		r.Post("/create_booking", bookingHandler.CreateBooking)
	})

	return r
}
