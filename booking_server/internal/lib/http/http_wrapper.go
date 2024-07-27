package http

import (
	"context"
	"fmt"
	"io"
	"log/slog"
	"net/http"
)

func GetRequest(ctx context.Context, client *http.Client, url string) ([]byte, error) {
	var (
		resp *http.Response
		req  *http.Request
		err  error
	)

	req, err = http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	resp, err = client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	resBody, _ := io.ReadAll(resp.Body)

	if resp.StatusCode != http.StatusOK {
		return nil, err
	}

	slog.InfoContext(ctx, fmt.Sprintf("[makeRequest] Response: %s", string(resBody)))

	return resBody, nil
}
