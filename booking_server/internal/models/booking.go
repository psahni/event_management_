package models

import (
	"time"

	uuid "github.com/google/uuid"
	"gorm.io/gorm"
)

type Booking struct {
	gorm.Model
	ID           uuid.UUID `gorm:"not null;type:uuid;default:uuid_generate_v4()"`
	EventID      string    `gorm:"not null;type:varchar(20);"`
	UserId       string    `gorm:"not null;type:varchar(20);"`
	TicketsCount int64     `gorm:"type:integer;not null;default:1"`
	Status       string    `gorm:"type:varchar(20);not null"`
	CreatedAt    time.Time `gorm:"not null;default:now()"`
	UpdatedAt    time.Time `gorm:"not null;default:now()"`
}
