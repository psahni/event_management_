package booking

import (
	"booking_server/internal/config"
	"booking_server/internal/repository"
	"context"
	"errors"
	"log/slog"
	"strconv"

	"github.com/google/uuid"
)

type BookingRequest struct {
	UserId       string `json:"user_id"`
	EventId      string `json:"event_id"`
	TicketsCount int    `json:"tickets"`
}

type ConfirmBookingRequest struct {
	UserId    string `json:"user_id"`
	BookingId string `json:"booking_id"`
}

type BookingResponse struct {
	BookingId string `json:"booking_id"`
	Status    string `json:"status"`
	Message   string `json:"message"`
}

type Service interface {
	CreateBooking(context.Context, BookingRequest) (*BookingResponse, error)
	ConfirmBooking(context.Context, ConfirmBookingRequest) (*BookingResponse, error)
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

func (svc *ServiceImpl) ConfirmBooking(ctx context.Context, confirmBookingReq ConfirmBookingRequest) (*BookingResponse, error) {
	bookingID := confirmBookingReq.BookingId
	userID := confirmBookingReq.UserId

	bookingIDuuID := uuid.MustParse(bookingID)

	booking, err := svc.repo.ConfirmBooking(ctx, bookingIDuuID, userID)

	if err != nil {
		slog.ErrorContext(ctx, err.Error())
		return nil, errors.New("error in confirming your booking")
	}

	return &BookingResponse{
		BookingId: booking.ID.String(),
		Status:    booking.Status,
		Message:   "Your Booking has been confirmed successfully",
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
