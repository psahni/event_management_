package repository

import (
	"booking_server/internal/models"
	"context"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Repository interface {
	CreateBooking(context.Context, string, string, int) (string, error)
	ConfirmBooking(context.Context, uuid.UUID, string) (*models.Booking, error)
	GetPendingBookingsByEvent(context.Context, string) int
}

type RepositoryImpl struct {
	gormDB *gorm.DB
}

func NewRepository(gormDB *gorm.DB) *RepositoryImpl {
	return &RepositoryImpl{gormDB}
}
