package repository

import (
	"booking_server/internal/models"
	"context"
	"fmt"

	"github.com/google/uuid"
)

func (repo *RepositoryImpl) CreateBooking(ctx context.Context, eventID string, userID string, ticketsCount int) (string, error) {
	fmt.Println("CreateBooking()")

	bookingObj := &models.Booking{
		EventID:      eventID,
		UserID:       userID,
		Status:       string(models.BookingStatus.Pending),
		TicketsCount: int64(ticketsCount),
	}
	err := repo.gormDB.Create(bookingObj).Error

	if err != nil {
		return "", err
	}

	return bookingObj.ID.String(), nil
}

//--------------------------------------------------------------------------------------------------

func (repo *RepositoryImpl) ConfirmBooking(ctx context.Context, bookingID uuid.UUID, userID string) (*models.Booking, error) {
	fmt.Println("ConfirmBooking()")
	booking := models.Booking{}

	err := repo.gormDB.Where("id = ? AND user_id = ?", bookingID, userID).Find(&booking).Error
	if err != nil {
		return nil, err
	}

	booking.Status = string(models.BookingStatus.Confirmed)

	repo.gormDB.Save(&booking)

	return &booking, nil
}

//--------------------------------------------------------------------------------------------------

func (repo *RepositoryImpl) GetPendingBookingsByEvent(ctx context.Context, eventID string) int {
	bookings := []models.Booking{}
	result := repo.gormDB.Where("status = ?", string(models.BookingStatus.Pending)).Find(&bookings)

	return int(result.RowsAffected)
}

//--------------------------------------------------------------------------------------------------
