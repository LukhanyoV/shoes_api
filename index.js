const express = require("express")
const ShoesService = require("./services/shoes-service")
const ShoesAPI = require("./api/shoes-api")
const db = require("./db/connection")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static("./public"))

const shoesService = ShoesService(db)
const shoesAPI = ShoesAPI(shoesService)

app.get("/api/shoes", shoesAPI.getAll)
app.get("/api/shoes/brand/:brandname", shoesAPI.getByBrand)
app.get("/api/shoes/size/:size", shoesAPI.getBySize)
app.get("/api/shoes/color/:color", shoesAPI.getByColor)
app.get("/api/shoes/brand/:brandname/size/:size/color/:color", shoesAPI.getByAll)

app.post("/api/shoes/sold/:id", shoesAPI.buyShoe)
app.post("/api/shoes", shoesAPI.addShoe)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App running at ${PORT}`))