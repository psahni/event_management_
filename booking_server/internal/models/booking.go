package models

import (
	"time"

	uuid "github.com/google/uuid"
)

type Booking struct {
	ID           uuid.UUID `gorm:"not null;type:uuid;default:uuid_generate_v4()"`
	EventID      uuid.UUID `gorm:"not null;type:uuid;default:uuid_generate_v4()"`
	UserId       uuid.UUID `gorm:"not null;type:uuid;default:uuid_generate_v4()"`
	TicketsCount int       `gorm:"type:integer;not null"`
	Status       string    `gorm:"type:varchar(20);not null"`
	CreatedAt    time.Time `gorm:"not null;default:now()"`
	UpdatedAt    time.Time `gorm:"not null;default:now()"`
}
