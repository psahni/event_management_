package booking

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-chi/render"
)

type BookingRequest struct {
	UserId       string `json:"user_id"`
	EventId      string `json:"event_id"`
	TicketsCount int    `json:"tickets_count"`
}

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

	fmt.Println(bookingReq)

	render.Status(r, http.StatusOK)
	render.JSON(w, r, "")
}
