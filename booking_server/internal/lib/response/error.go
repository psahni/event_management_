package response

import (
	"net/http"
	"strings"
)

type ValidateListError struct {
	msg []string
}

func NewErrorList(msg []string) *ValidateListError {
	return &ValidateListError{
		msg: msg,
	}
}

func (c *ValidateListError) Error() string {
	return strings.Join(c.msg, ";")
}

func (c *ValidateListError) Messages() []string {
	return c.msg
}

type DefaultError struct {
	HttpCode int
	Code     int
	Msg      string
}

func NewDefaultError(httpCode int, msg string) *DefaultError {
	return &DefaultError{
		HttpCode: httpCode,
		Code:     httpCode,
		Msg:      msg,
	}
}

func (b *DefaultError) Error() string {
	return b.Msg
}

var (
	ErrInvalidParseRequest = NewDefaultError(http.StatusUnprocessableEntity, "invalid parse")
	ErrInternalServerError = NewDefaultError(http.StatusInternalServerError, "internal server error")
	ErrInvalidRequest      = NewDefaultError(http.StatusBadRequest, "invalid request")
	ErrAddressNotFound     = NewDefaultError(http.StatusNotFound, "address not found")
	ErrInvalidAPIKey       = NewDefaultError(http.StatusUnauthorized, "service key required")
	ErrCredentialsKey      = NewDefaultError(http.StatusUnauthorized, "invalid service key or service id")
)
