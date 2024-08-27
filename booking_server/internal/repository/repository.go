package repository

import (
	"context"

	"gorm.io/gorm"
)

type Repository interface {
	CreateBooking(context.Context, string, string, int) (string, error)
	GetPendingBookingsByEvent(context.Context, string) int
}

type RepositoryImpl struct {
	gormDB *gorm.DB
}

func NewRepository(gormDB *gorm.DB) *RepositoryImpl {
	return &RepositoryImpl{gormDB}
}
