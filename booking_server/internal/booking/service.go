package booking

import (
	"booking_server/internal/config"
	"booking_server/internal/repository"
	"context"
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

//--------------------------------------------------------------------------------------------------

func NewService(repo repository.Repository) *ServiceImpl {
	return &ServiceImpl{repo}
}

//--------------------------------------------------------------------------------------------------

func (svc *ServiceImpl) CreateBooking(ctx context.Context, bookingRequest BookingRequest) (*BookingResponse, error) {
	ticketsLeft, err := svc.getTicketsInfo(ctx, bookingRequest.EventId)

	if err != nil {
		slog.ErrorContext(ctx, "Booking can't be created")
		return nil, err
	}

	var bookingID string
	if bookingRequest.TicketsCount <= ticketsLeft {
		bookingID, err = svc.repo.CreateBooking(ctx, bookingRequest.EventId, bookingRequest.UserId, bookingRequest.TicketsCount)
		if err != nil {
			slog.ErrorContext(ctx, "Booking can't be created.")
			return nil, err
		}

		return &BookingResponse{
			BookingId: bookingID,
			Message:   "Successfully created booking. Please check your email for tickets.",
		}, nil
	}

	return &BookingResponse{
		BookingId: "",
		Message:   "Booking can't be created. All tickets are sold.",
	}, nil
}

//--------------------------------------------------------------------------------------------------

func (svc *ServiceImpl) getTicketsInfo(ctx context.Context, eventId string) (int, error) {
	client := config.GetRedisClient()
	val, err := client.HGet(ctx, "eventsMap", eventId).Result()

	if err != nil {
		return 0, err
	}

	v, _ := strconv.Atoi(val)

	pendingBookingsCount := svc.repo.GetPendingBookingsByEvent(ctx, eventId)

	return (v - pendingBookingsCount), nil
}

//--------------------------------------------------------------------------------------------------
