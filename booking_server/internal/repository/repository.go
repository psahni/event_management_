package repository

import "gorm.io/gorm"

type Repository interface {
}

type RepositoryImpl struct {
	dbInstance *gorm.DB
}

func NewRepository(dbInstance *gorm.DB) *RepositoryImpl {
	return &RepositoryImpl{dbInstance}
}
