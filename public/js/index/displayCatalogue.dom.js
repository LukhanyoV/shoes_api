/*
global ShoesFunctions,
Handlebars
*/

document.addEventListener("DOMContentLoaded", async () => {
    
    // get the references
    const filterForm = document.querySelector(".filter-form")
    const brand = document.querySelector("#brand")
    const size = document.querySelector("#size")
    const color = document.querySelector("#color")
    
    const shoesFunctions = ShoesFunctions()
    
    // add shoes to localstorage
    localStorage.setItem("shoes", JSON.stringify(await shoesFunctions.getAll()))
    
    Handlebars.registerHelper('imageFor', function (brand) {
        const brands = {
            "Mike": "nike.jpg",
            "Hadidas": "hadidas.jpg",
            "Abi": "abi.jpg",
            "Huma": "huma.jpg"
        }
        return brands[brand] === undefined ? "default.jpg" : brands[brand]
    })

    // the template
    const shoeTemplate = array => {
        array = array.filter(shoe => shoe.in_stock > 0)

        const template = document.querySelector(".shoesTemplate").innerHTML

        const tableTemplate = Handlebars.compile(template)

        const tableTemplateHTML = tableTemplate({shoes: array})

        document.querySelector(".shoesData").innerHTML = tableTemplateHTML
    }

    // display the sizes available using template
    const sizeTemplate = array => {

        const template = document.querySelector(".sizeTemplate").innerHTML

        const sizeTemplate = Handlebars.compile(template)

        const sizeTemplateHTML = sizeTemplate({sizes: array})

        document.querySelector("#size").innerHTML = sizeTemplateHTML
    }

    // display the brand available using templates
    const brandTemplate = array => {

        const template = document.querySelector(".brandTemplate").innerHTML

        const brandTemplate = Handlebars.compile(template)

        const brandTemplateHTML = brandTemplate({brands: array})

        document.querySelector("#brand").innerHTML = brandTemplateHTML
    }

    // display the colors available using templates
    const colorTemplate = array => {

        const template = document.querySelector(".colorTemplate").innerHTML

        const colorTemplate = Handlebars.compile(template)

        const colorTemplateHTML = colorTemplate({colors: array})

        document.querySelector("#color").innerHTML = colorTemplateHTML
    }

    // display the number of items in cart template
    const cartTemplate = () => {
        const items = JSON.parse(localStorage.getItem("cartShoes")) || []

        const counter = [... new Set(items)].length

        const template = document.querySelector(".cartTemplate").innerHTML

        const cartTemplate = Handlebars.compile(template)

        const cartTemplateHTML = cartTemplate({counter})

        document.querySelector(".cartMe").innerHTML = cartTemplateHTML
    }

    filterForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        if(brand.value === "all" && size.value === "all" && color.value === "all"){
            let array = await shoesFunctions.getAll()
            shoeTemplate(array)
        } else if(brand.value !== "all" && size.value === "all" && color.value === "all"){
            let array = await shoesFunctions.getByBrand(brand.value)
            shoeTemplate(array)
        } else if(brand.value === "all" && size.value !== "all" && color.value === "all"){
            let array = await shoesFunctions.getBySize(size.value)
            shoeTemplate(array)
        } else if(brand.value === "all" && size.value === "all" && color.value !== "all"){
            let array = await shoesFunctions.getByColor(color.value)
            shoeTemplate(array)
        } else if(brand.value !== "all" && size.value !== "all" && color.value !== "all"){
            let array = await shoesFunctions.getByAll(brand.value, size.value, color.value)
            shoeTemplate(array)
        }
    })

    const updateDisplay = async () => {
        removeInCart()

        const shoes = JSON.parse(localStorage.getItem("shoes") || "[]")
        
        const brands = [...new Set(shoes.map(shoe => shoe.brand))].sort()

        const sizes = [...new Set(shoes.map(shoe => shoe.size))].sort((a,b) => a -b)

        const colors = [...new Set(shoes.map(shoe => shoe.color))].sort()

        brandTemplate(brands)

        sizeTemplate(sizes)

        colorTemplate(colors)
        
        shoeTemplate(shoes)

        cartTemplate()


        document.querySelectorAll(".add-button").forEach(element => {
            element.addEventListener("click", () => {
                const shoes = JSON.parse(localStorage.getItem("shoes") || "[]")
                let shoe = shoes.find(shoe => shoe.id == element.value)
                if(shoe.in_stock > 0){
                    addToCart(element.value)
                }
                location.reload()
            })
        })
    }

    updateDisplay()
})

// function will save the id of the items to be added to cart
const addToCart = (item) => {
    const items = JSON.parse(localStorage.getItem("cartShoes")) || []
    items.push(item)
    localStorage.setItem("cartShoes", JSON.stringify(items))
}

const removeInCart = () => {
    const shoes = JSON.parse(localStorage.getItem("shoes") || "[]")
    const items = JSON.parse(localStorage.getItem("cartShoes") || "[]").map(Number)
    items.forEach((item) => {
        shoes.forEach((shoe, index) => {
            if(shoe.id == item){
                shoes[index]['in_stock'] > 0 && shoes[index]['in_stock']--
            }
        })
    })
    localStorage.setItem("shoes", JSON.stringify(shoes))
}