package booking

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

type Handler struct {
	bookingService Service
}

func NewHandler(bookingService Service) *Handler {
	return &Handler{bookingService}
}

func (handler *Handler) CreateBooking(w http.ResponseWriter, r *http.Request) {
	req := json.NewDecoder(r.Body)

	var bookingReq BookingRequest
	err := req.Decode(&bookingReq)
	if err != nil {
		fmt.Errorf("Error: %v", err)
	}

	bookingRes, err := handler.bookingService.CreateBooking(r.Context(), bookingReq)

	if err != nil {
		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, err)
		return
	}

	render.Status(r, http.StatusOK)
	render.JSON(w, r, bookingRes)
}
