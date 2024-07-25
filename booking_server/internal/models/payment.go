package models

import (
	"time"

	uuid "github.com/google/uuid"
	"gorm.io/gorm"
)

type Payment struct {
	gorm.Model
	ID        uuid.UUID `gorm:"not null;type:uuid;default:uuid_generate_v4()"`
	BookingID uuid.UUID
	Booking   Booking   `gorm:"foreignKey:BookingID"`
	Status    string    `gorm:"type:varchar(20);not null"`
	CreatedAt time.Time `gorm:"not null;default:now()"`
	UpdatedAt time.Time `gorm:"not null;default:now()"`
}
