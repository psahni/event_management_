package models

import "time"

type User struct {
	Name      string    `gorm:"type:varchar(100);not null"`
	Age       int       `gorm:"type:integer;not null"`
	Email     string    `gorm:"type:varchar(100);not null"`
	CreatedAt time.Time `gorm:"not null;default:now()"`
	UpdatedAt time.Time `gorm:"not null;default:now()"`
}
