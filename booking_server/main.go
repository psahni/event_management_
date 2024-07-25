package main

import "booking_server/cmd"

/*
func main() {
	r := chi.NewRouter()
	r.Use(middleware.RequestID)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	gormDB, err := db.Connect()
	if err == nil {
		fmt.Println("Successfully connected to DB", gormDB)
	} else {
		panic("can't connect to DB")
	}

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello world"))
	})

	http.ListenAndServe(":3333", r)
}
*/

func main() {
	cmd.Execute()
}
