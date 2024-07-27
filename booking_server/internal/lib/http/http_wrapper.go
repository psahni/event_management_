package http

import (
	"context"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

func MakeRequest(ctx context.Context, client *http.Client, url string, requestMethod string) error {
	var (
		resp *http.Response
		req  *http.Request
		err  error
	)

	switch requestMethod {
	case "GET":
		req, err = http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
		if err != nil {
			return err
		}
		resp, err = client.Do(req)
	case "POST":
		req, err = http.NewRequestWithContext(ctx, http.MethodPost, url, nil)
	default:
		err = errors.New("Invalid request method")
	}

	defer resp.Body.Close()

	resBody, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return err
	}

	slog.InfoContext(ctx, fmt.Sprintf("[makeRequest] Response: %s", string(resBody)))

	return err
}
