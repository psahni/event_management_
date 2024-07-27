package events

import (
	"time"
)

type Event struct {
	ID               string    `json:"_id"`
	Name             string    `json:"name"`
	Description      string    `json:"description"`
	StartDateTime    time.Time `json:"startDateTime"`
	EndDateTime      time.Time `json:"endDateTime"`
	Venue            string    `json:"venue"`
	TicketsAvailable int64     `json:"ticketsAvailable"`
	Publish          bool      `json:"publish"`
}
