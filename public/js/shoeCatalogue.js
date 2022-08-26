// factory function for my shoe catalogue site
const ShoeCatalogue = () => {
    const myShoes = [
        {
            color : 'blue',
            brand : "Mike",
            price : 350,
            size: 3,
            in_stock : 5
        },
        {
            color : 'orange',
            brand : "Hadidas",
            price : 275,
            size: 4,
            in_stock : 3
        },
        {
            color : 'blue',
            brand : "Hadidas",
            price : 255,
            size: 5,
            in_stock : 1 
        },
        {
            color : 'orange',
            brand : "Mike",
            price : 290,
            size: 4,
            in_stock : 4 
        },
        {
            color : 'red',
            brand : "Huma",
            price : 270,
            size: 3,
            in_stock : 6 
        },
        {
            color: 'orange',
            brand: "Mike",
            price: 250,
            size: 3,
            in_stock: 10
        }
    ]

    const getAllShoes = () => myShoes

    const getShoesByBrand = (shoes, brand) => brand === "all" ? shoes : shoes.filter(obj => obj.brand === brand.toLowerCase().replace(/^[a-z]{1}/, c=>c.toUpperCase()))
    
    const getShoesByColor = (shoes, color) => color === "all" ? shoes : shoes.filter(obj => obj.color === color.toLowerCase())

    const getShoesBySize = (shoes, size) => size === "all" ? shoes : shoes.filter(obj => obj.size === size-"")

    const updateTheShoes = shoes => {
        myShoes.splice(0, myShoes.length)
        myShoes.push(...shoes)
    }

    const addNewShoe = shoe => {
        let condition = false
        let index
        myShoes.forEach((obj, i) => {
            if(obj.brand === shoe.brand && obj.color === shoe.color && obj.price === shoe.price && obj.size === shoe.size){
                condition = true
                index = i
            }
        })
        if(condition === false){
            shoe['in_stock'] = 1
            myShoes.push(shoe)
        } else {
            myShoes[index]['in_stock']++
        }
    }

    const addToCart = shoe => {
        let index
        myShoes.forEach((obj, i) => {
            if(obj.brand === shoe.brand && obj.color === shoe.color && obj.price === shoe.price && obj.size === shoe.size){
                index = i
            }
        })
        myShoes[index]['in_stock'] > 0 && myShoes[index]['in_stock']--
    }

    return {
        getAllShoes,
        getShoesByBrand,
        getShoesByColor,
        getShoesBySize,
        addNewShoe,
        updateTheShoes,
        addToCart
    }
}