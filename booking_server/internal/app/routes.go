package app

import (
	"booking_server/internal/booking"
	"booking_server/internal/repository"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"gorm.io/gorm"
)

func ConfigureRoutes(dbInstance *gorm.DB) *chi.Mux {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello booking server"))
	})

	repo := repository.NewRepository(dbInstance)
	bookingService := booking.NewService(repo)
	bookingHandler := booking.NewHandler(bookingService)

	r.Route("/v1", func(r chi.Router) {
		r.Post("/create_booking", bookingHandler.CreateBooking)
		r.Post("/confirm_booking", bookingHandler.ConfirmBooking)
	})

	return r
}
