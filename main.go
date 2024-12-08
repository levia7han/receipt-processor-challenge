package main

import (
	"fmt"
	"math"
	"net/http"
	"regexp"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type receipt struct {
	Retailer     string  `json:"retailer" binding:"required,validretailer"`
	PurchaseDate string  `json:"purchaseDate" binding:"required,datetime=2006-01-02"`
	PurchaseTime string  `json:"purchaseTime" binding:"required,istime"`
	Items        []*item `json:"items" binding:"required,gt=0,dive"`
	Total        string  `json:"total" binding:"required,ismoney"`
}

type item struct {
	ShortDescription string `json:"shortDescription" binding:"required,validdescription"`
	Price            string `json:"price" binding:"required,ismoney"`
}

var receiptScores = make(map[string]int)

func isTime(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`^\d{2}:\d{2}$`)

	if err != nil {
		return false
	}

	//need to check for bad times eg. 48:87

	return regex.MatchString(fl.Field().String())
}

func isMoney(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`^\d+\.\d{2}$`)

	if err != nil {
		return false
	}

	return regex.MatchString(fl.Field().String())
}

func validRetailer(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`^[\w\s\-&]+$`)

	if err != nil {
		return false
	}

	return regex.MatchString(fl.Field().String())
}

func validDescription(fl validator.FieldLevel) bool {
	regex, err := regexp.Compile(`^[\w\s\-]+$`)

	if err != nil {
		return false
	}

	return regex.MatchString(fl.Field().String())
}

func main() {
	router := gin.Default()

	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterValidation("istime", isTime)
		v.RegisterValidation("ismoney", isMoney)
		v.RegisterValidation("validretailer", validRetailer)
		v.RegisterValidation("validdescription", validDescription)
	}

	router.GET("/receipts/:id/points", getPointsForReceiptById)
	router.POST("/receipts/process", scoreReceipt)

	router.Run("localhost:3000")
}

func getPointsForReceiptById(c *gin.Context) {
	id := c.Param("id")

	score, ok := receiptScores[id]

	if ok {
		c.IndentedJSON(http.StatusOK, gin.H{"points": score})
		return
	}

	c.IndentedJSON(http.StatusNotFound, gin.H{"message": "No receipt found for that id"})
}

func scoreReceipt(c *gin.Context) {
	var receipt receipt

	if err := c.ShouldBindJSON(&receipt); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	score := 0

	score += scoreItemCount(receipt.Items)
	score += scoreTotalRoundAmount(receipt.Total)
	score += scoreTotalMultiple((receipt.Total))

	newId := uuid.New().String()
	receiptScores[newId] = score
	fmt.Println(receiptScores[newId])

	c.IndentedJSON(http.StatusOK, gin.H{"id": newId})
}

func scoreItemCount(items []*item) int {
	return int(math.Floor(float64(len(items))/2) * 5)
}

func scoreTotalRoundAmount(total string) int {
	if strings.HasSuffix(total, "00") {
		return 50
	}

	return 0
}

func scoreTotalMultiple(total string) int {
	i, _ := strconv.Atoi(strings.Replace(total, ".", "", 1))

	if i%25 == 0 {
		return 25
	}

	return 0
}
