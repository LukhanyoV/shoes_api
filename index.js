const express = require("express")
const ShoesAPI = require("./api/shoes-api")
const app = express()

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static("public"))

const shoesAPI = ShoesAPI()

app.get("/api/test", shoesAPI.test)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`App running at ${PORT}`))