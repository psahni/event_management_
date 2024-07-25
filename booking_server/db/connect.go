package db

import (
	"booking_server/internal/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Connect() (*gorm.DB, error) {
	cfg := config.GetConfig()
	connectionUrl := cfg.Database.ConnectionUrl
	gormDB, err := gorm.Open(postgres.Open(connectionUrl), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	return gormDB, nil
}
