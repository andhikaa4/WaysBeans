package routes

import (
	"github.com/gorilla/mux"
)

func RouteInit(r *mux.Router) {
	AuthRoutes(r)
	UserRoutes(r)
	ProductRoutes(r)
	CartRoutes(r)
	// Call UserRoutes function here ...
}
