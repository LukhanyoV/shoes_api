const assert = require("assert")
const ShoesService = require("../services/shoes-service")

const pgp = require("pg-promise")({})
const connectionString = process.env.DATABASE_URL || "postgresql://test:test123@localhost:5432/shoes_api_test"
const config = {
    connectionString
}

const db = pgp(config)

describe("Testing my shoes services API", () => {

    beforeEach(async () => {
        await db.none("TRUNCATE shoes")
    })

    it("should be able to get all the available shoes in stock", async () => {
        const shoesService = ShoesService(db)

        const shoes = await shoesService.getAll()

        assert.equal(0, shoes.length)
    })

    it("should be able to add new shoe to the database", async () => {
        const shoesService = ShoesService(db)

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        const shoes = await shoesService.getAll()

        assert.equal(1, shoes.length)
    })

    it("should be able to get all the available shoes in stock by brand name", async () => {
        const shoesService = ShoesService(db)

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "blue",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Hadidas",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        const shoes = await shoesService.getByBrand("Mike")

        assert.equal(2, shoes.length)
    })

    it("should be able to get all the available shoes in stock by their size", async () => {
        const shoesService = ShoesService(db)

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "blue",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Hadidas",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 7,
            price: 180
        })

        const shoes = await shoesService.getBySize(10)

        assert.equal(3, shoes.length)
    })

    it("should be able to get all the available shoes in stock by brand name, shoe size ans shoe color", async () => {
        const shoesService = ShoesService(db)

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "blue",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Hadidas",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 7,
            price: 180
        })

        const shoes = await shoesService.getByAll("Mike", 10, "red")
        assert.equal(1, shoes.length)
    })

    it("should be able to update the stock levels when a shoe is sold", async () => {
        const shoesService = ShoesService(db)

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "blue",
            size: 7,
            price: 180
        })

        await shoesService.addShoe({
            brand: "Hadidas",
            color: "red",
            size: 10,
            price: 200
        })

        await shoesService.addShoe({
            brand: "Mike",
            color: "red",
            size: 10,
            price: 200
        })

        // there is only one hadidas shoe let me buy it so that it won't exist anymore
        await shoesService.buyShoe({
            brand: "Hadidas",
            color: "red",
            size: 10
        })
        const shoes = await shoesService.getAll()
        
        assert.equal(2, shoes.length)
    })

    after(async () => {
        await db.$pool.end()
    })
})