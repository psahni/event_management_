package repository

import (
	"booking_server/internal/models"
	"context"
	"fmt"
	"time"

	"github.com/google/uuid"
)

// Todo: Create a record in redis with 30 mins expiry
// If user does not pay in 30 mins, then record will be deleted
// When user comes to pay, then if not expired, then book
// When user comes to pay, then if expired, then find available quantity (total_quantity - pending)
// If available then book
// https://www.geeksforgeeks.org/a-complete-guide-to-redis-hashes/
//  HSET 1234 user_1:5
//  HSET 1234 user_2:3
//  HDEL 1234 user_1:5
//  HSET 1234 total_pending: 8
//  HGET 1234 user_2:

// I CANT expire individual field in HSET.
// Use this hack
// SET    order:event_id:user_id "1"
// EXPIRE order:event_id:user_id 3600

const BOOKING_EXPIRE_AFTER = 15 // Minutes

func (repo *RepositoryImpl) CreateBooking(ctx context.Context, eventID string, userID string, ticketsCount int) (string, error) {
	fmt.Println("CreateBooking()")

	bookingObj := &models.Booking{
		EventID:      eventID,
		UserID:       userID,
		Status:       string(models.BookingStatus.Pending),
		TicketsCount: int64(ticketsCount),
		ExpireAt:     time.Now().Add(time.Minute * BOOKING_EXPIRE_AFTER),
	}
	err := repo.gormDB.Create(bookingObj).Error

	if err != nil {
		return "", err
	}

	return bookingObj.ID.String(), nil
}

//--------------------------------------------------------------------------------------------------

// HERE I ALSO HAVE TO UPDATE INVENTORY
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
