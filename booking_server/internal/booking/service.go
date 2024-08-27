package booking

import (
	"booking_server/internal/config"
	"booking_server/internal/repository"
	"context"
	"fmt"
	"log/slog"
	"strconv"
)

type BookingRequest struct {
	UserId       string `json:"user_id"`
	EventId      string `json:"event_id"`
	TicketsCount int    `json:"tickets"`
}

type BookingResponse struct {
	BookingId string `json:"booking_id"`
	Message   string `json:"message"`
}

type Service interface {
	CreateBooking(context.Context, BookingRequest) (*BookingResponse, error)
}

type ServiceImpl struct {
	repo repository.Repository
}

func NewService(repo repository.Repository) *ServiceImpl {
	return &ServiceImpl{repo}
}

func (svc *ServiceImpl) CreateBooking(ctx context.Context, bookingRequest BookingRequest) (*BookingResponse, error) {
	fmt.Println(bookingRequest)
	ticketsLeft, err := svc.getTicketsInfo(ctx, bookingRequest.EventId)

	if err != nil {
		slog.ErrorContext(ctx, "Booking can't be created")
		return nil, err
	}

	fmt.Println("ticketsLeft = ", ticketsLeft)

	return &BookingResponse{
		BookingId: "ekjubj456af",
		Message:   "Successfully Booked",
	}, nil
}

func (svc *ServiceImpl) getTicketsInfo(ctx context.Context, eventId string) (int, error) {
	client := config.GetRedisClient()
	val, err := client.HGet(ctx, "eventsMap", eventId).Result()

	if err != nil {
		return 0, err
	}

	v, _ := strconv.Atoi(val)

	return v, nil
}
