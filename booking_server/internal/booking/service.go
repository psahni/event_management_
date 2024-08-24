package booking

import (
	"booking_server/internal/repository"
)

type Service interface{}

type ServiceImpl struct {
	repo repository.Repository
}

func NewService(repo repository.Repository) *ServiceImpl {
	return &ServiceImpl{repo}
}
