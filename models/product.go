package models

type Product struct {
	ID    int    `json:"id" gorm:"primary_key:auto_increment"`
	Name  string `json:"name" form:"name" gorm:"type: varchar(255)"`
	Desc  string `json:"desc" gorm:"type:text" form:"desc"`
	Price int    `json:"price" form:"price" gorm:"type: int"`
	Image string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Stock int    `json:"stock" form:"stock"`
}

type ProductResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Desc  string `json:"desc"`
	Price int    `json:"price"`
	Image string `json:"image"`
	Stock int    `json:"stock"`
}

type ProductUserResponse struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Desc   string `json:"desc"`
	Price  int    `json:"price"`
	Image  string `json:"image"`
	Qty    int    `json:"qty"`
	UserID int    `json:"-"`
}

type ProductOrderResponse struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Price int    `json:"price"`
	Image string `json:"image"`
	Qty   int    `json:"qty"`
}

func (ProductResponse) TableName() string {
	return "products"
}

func (ProductUserResponse) TableName() string {
	return "products"
}

func (ProductOrderResponse) TableName() string {
	return "products"
}
