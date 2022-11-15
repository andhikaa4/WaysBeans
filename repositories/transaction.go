package repositories

import (
	"final-task/models"

	"gorm.io/gorm"
)

type TransactionRepository interface {
	FindTransaction() ([]models.Cart, error)
	UpdateTransaction(transaction models.Cart, ID int) (models.Cart, error)
	DeleteTransaction(transaction models.Cart, ID int) (models.Cart, error)
	CreateTransaction2(transaction models.Cart) (models.Cart, error)
	FindProductById(ProductID []int) ([]models.Product, error)
	GetTransaction2(ID int) (models.Cart, error)
	GetOneTransaction(ID string) (models.Cart, error)
	UpdateTransaction2(status string, ID string) error
	DeleteTransaction2(transaction models.Transaction, ID int) (models.Transaction, error)
}

func RepositoryTransaction(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) FindTransaction() ([]models.Cart, error) {
	var transaction []models.Cart
	err := r.db.Preload("Buyer").Preload("Product").Find(&transaction).Error

	return transaction, err
}

func (r *repository) UpdateTransaction(transaction models.Cart, ID int) (models.Cart, error) {
	err := r.db.Model(&transaction).Where("id=?", ID).Updates(&transaction).Error

	return transaction, err
}

func (r *repository) DeleteTransaction(transaction models.Cart, ID int) (models.Cart, error) {
	err := r.db.Preload("Buyer").Preload("Product").Delete(&transaction).Error

	return transaction, err
}

func (r *repository) FindProductById(ProductID []int) ([]models.Product, error) {
	var products []models.Product
	err := r.db.Find(&products, ProductID).Error

	return products, err
}

func (r *repository) CreateTransaction2(transaction models.Cart) (models.Cart, error) {
	err := r.db.Preload("Buyer").Preload("Product").Create(&transaction).Error

	return transaction, err
}

func (r *repository) GetTransaction2(ID int) (models.Cart, error) {
	var transaction models.Cart
	err := r.db.Preload("Buyer").Preload("Product").First(&transaction, ID).Error

	return transaction, err
}

func (r *repository) GetOneTransaction(ID string) (models.Cart, error) {
	var transaction models.Cart
	err := r.db.Preload("Product").Preload("Buyer").First(&transaction, "id = ?", ID).Error

	return transaction, err
}

func (r *repository) UpdateTransaction2(status string, ID string) error {
	var transaction models.Cart
	r.db.Preload("Product").First(&transaction, ID)

	// new status : pending
	// status : pending

	// If is different & Status is "success" decrement product quantity
	if status != transaction.Status && status == "success" {
		var product models.Product
		r.db.First(&product, transaction.Product)
		product.Stock = product.Stock - 1
		r.db.Save(&product)
	}

	transaction.Status = status

	err := r.db.Save(&transaction).Error

	return err
}

func (r *repository) DeleteTransaction2(transaction models.Transaction, ID int) (models.Transaction, error) {
	err := r.db.Where("buyer_id LIKE ?", ID).Delete(&transaction).Error

	return transaction, err
}
