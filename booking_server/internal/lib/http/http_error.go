package http

import (
	"booking_server/internal/lib/response"
	"errors"
	"net/http"

	"github.com/go-chi/render"
	"github.com/go-playground/validator/v10"
)

type ErrorListResponse struct {
	Success bool `json:"success"`
	Error   struct {
		Code     int      `json:"code"`
		Messages []string `json:"messages"`
	} `json:"error"`
}

type GeneralErrorResponse struct {
	Success bool `json:"success"`
	Error   struct {
		Code    int    `json:"code"`
		Message string `json:"message"`
	} `json:"error"`
}

func HandleError(w http.ResponseWriter, r *http.Request, err error) {
	// TODO:: Add unit test
	if err == nil {
		return
	}

	var listErr *response.ValidateListError
	if ok := errors.As(err, &listErr); ok {
		resp := ErrorListResponse{}
		resp.Success = false
		resp.Error.Code = http.StatusBadRequest
		resp.Error.Messages = listErr.Messages()

		render.Status(r, http.StatusBadRequest)
		render.JSON(w, r, resp)
		return
	}

	httpCode := http.StatusInternalServerError
	msg := err.Error()
	defer func() {
		var resp GeneralErrorResponse
		resp.Success = false
		resp.Error.Code = httpCode
		resp.Error.Message = msg
		render.Status(r, httpCode)
		render.JSON(w, r, resp)
	}()

	var maxErr *http.MaxBytesError
	if errors.As(err, &maxErr) {
		httpCode = http.StatusBadRequest
	}

	var errVals validator.ValidationErrors
	if ok := errors.As(err, &errVals); ok {
		httpCode = http.StatusBadRequest
		msg = errVals.Error()
		return
	}

	var defaultErr *response.DefaultError
	if ok := errors.As(err, &defaultErr); ok {
		httpCode = defaultErr.HttpCode
		msg = defaultErr.Msg
	}
}
