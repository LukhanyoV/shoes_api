const ShoesService = (db) => {

    const getAll = async () => {
        const results = db.manyOrNone("SELECT * FROM shoes WHERE in_stock > 0")
        return results ? results : []
    }

    const addShoe = async (shoe) => {
        shoe = [
            (shoe.brand).toLowerCase().replace(/./, c => c.toUpperCase()),
            (shoe.color).toLowerCase(),
            shoe.size,
            shoe.price
        ]
        const results = await db.one("SELECT count(*) FROM shoes WHERE brand = $1 AND color = $2 AND size = $3", shoe)
        if(results.count == 0){
            await db.none("INSERT INTO shoes (brand, color, size, price) VALUES ($1, $2, $3, $4)", shoe)
        } else {
            await db.none("UPDATE shoes SET in_stock = in_stock + 1 WHERE brand = $1 AND color = $2 AND size = $3", shoe)
        }
    }

    const getByBrand = async (brand) => {
        const results = db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND in_stock > 0", [brand])
        return results ? results : []
    }

    const getBySize = async (size) => {
        const results = await db.manyOrNone("SELECT * FROM shoes WHERE size = $1 AND in_stock > 0", [size])
        return results ? results : []
    }

    const getByColor = async (color) => {
        const results = await db.manyOrNone("SELECT * FROM shoes WHERE color = $1 AND in_stock > 0", [color])
        return results ? results : []
    }

    const getByAll = async (brand, size, color) => {
        const results = db.manyOrNone("SELECT * FROM shoes WHERE brand = $1 AND size = $2 AND color = $3 AND in_stock > 0", [brand, size, color])
        return results ? results : []
    }

    const getById = async (id) => {
        const results = db.oneOrNone("SELECT * FROM shoes WHERE id = $1", [id])
        return results ? results : {}
    }

    const buyShoe = async (shoe) => {
        shoe = [
            shoe.brand,
            shoe.color,
            shoe.size,
            shoe.price
        ]
        const results = await db.one("SELECT count(*) FROM shoes WHERE brand = $1 AND color = $2 AND size = $3", shoe)
        if(results.count > 0){
            await db.none("UPDATE shoes SET in_stock = in_stock - 1 WHERE brand = $1 AND color = $2 AND size = $3", shoe)
        }
    }

    return {
        getAll,
        addShoe,
        getByBrand,
        getBySize,
        getByColor,
        getByAll,
        buyShoe,
        getById
    }
}

module.exports = ShoesService