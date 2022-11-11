package routes

import (
	"final-task/handlers"
	"final-task/pkg/middleware"
	"final-task/pkg/mysql"
	"final-task/repositories"

	"github.com/gorilla/mux"
)

func CartRoutes(r *mux.Router) {
	cartRepository := repositories.RepositoryCart(mysql.DB)
	h := handlers.HandlerCart(cartRepository)

	r.HandleFunc("/cart/add/{productID}", middleware.Auth(h.AddToCart)).Methods("POST")
	r.HandleFunc("/carts", middleware.Auth(h.GetChartByUserID)).Methods("GET")
	r.HandleFunc("/cart/update/{productID}", middleware.Auth(h.DeleteChartByQty)).Methods("PATCH")
	r.HandleFunc("/cart/delete/{productID}", middleware.Auth(h.DeleteChartByID)).Methods("DELETE")

}
