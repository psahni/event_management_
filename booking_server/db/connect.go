package db

import (
	"booking_server/internal/config"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var gormDB *gorm.DB

func Connect() (*gorm.DB, error) {
	var err error

	cfg := config.GetConfig()
	connectionUrl := cfg.Database.ConnectionUrl
	gormDB, err = gorm.Open(postgres.Open(connectionUrl), &gorm.Config{})
	gormDB.Logger.LogMode(logger.Info)

	if err != nil {
		return nil, err
	}

	return gormDB, nil
}

func Get() *gorm.DB {
	return gormDB
}
