package http

import "net/http"

func GetHttpClient() *http.Client {
	return &http.Client{}
}
