package repository

import (
	"booking_server/internal/models"
	"context"
	"fmt"
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

func (repo *RepositoryImpl) ConfirmBooking() {}

//--------------------------------------------------------------------------------------------------

func (repo *RepositoryImpl) GetPendingBookingsByEvent(ctx context.Context, eventID string) int {
	bookings := []models.Booking{}
	result := repo.gormDB.Where("status = ?", string(models.BookingStatus.Pending)).Find(&bookings)

	return int(result.RowsAffected)
}

//--------------------------------------------------------------------------------------------------
