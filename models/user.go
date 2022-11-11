package models

// User model struct
type User struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Name     string `json:"name" gorm:"type: varchar(255)"`
	Email    string `json:"email" gorm:"type: varchar(255)"`
	Password string `json:"password" gorm:"type: varchar(255)"`
	Phone    string `json:"phone" form:"phone" gorm:"type: varchar(255)"`
	Gender   string `json:"gender" form:"gender" gorm:"type: varchar(255)"`
	Image    string `json:"image" form:"image" gorm:"type: varchar(255)"`
	Role     string `json:"role" gorm:"type: varchar(255)"`
}

type UsersOrderResponse struct {
	ID       int    `json:"id" gorm:"primaryKey"`
	Name     string `json:"name"`
	Location string `json:"location"`
	Email    string `json:"email"`
}

func (UsersOrderResponse) TableName() string {
	return "users"
}
