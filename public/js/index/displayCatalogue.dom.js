document.addEventListener("DOMContentLoaded", () => {
    // get the references
    const filterForm = document.querySelector(".filter-form")
    const brand = document.querySelector("#brand")
    const size = document.querySelector("#size")

    const shoesFunctions = ShoesFunctions()

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
        if(brand.value === "all" && size.value === "all"){
            let array = await shoesFunctions.getAll()
            shoeTemplate(array)
        } else if(brand.value !== "all" && size.value === "all"){
            let array = await shoesFunctions.getByBrand(brand.value)
            shoeTemplate(array)
        } else if(brand.value === "all" && size.value !== "all"){
            let array = await shoesFunctions.getBySize(size.value)
            shoeTemplate(array)
        } else if(brand.value !== "all" && size.value !== "all"){
            let array = await shoesFunctions.getByBrandAndSize(brand.value, size.value)
            shoeTemplate(array)
        }
    })

    const updateDisplay = async () => {
        const shoes = await shoesFunctions.getAll()
        
        const brands = [...new Set(shoes.map(shoe => shoe.brand))].sort()

        const sizes = [...new Set(shoes.map(shoe => shoe.size))].sort((a,b) => a -b)

        brandTemplate(brands)

        sizeTemplate(sizes)

        shoeTemplate(shoes)

        cartTemplate()

        document.querySelectorAll(".add-button").forEach(element => {
            element.addEventListener("click", () => {
                let shoe = shoes.find(shoe => shoe.id == element.value)
                let count = (JSON.parse(localStorage.getItem("cartShoes") || "[]")).filter(item => item == element.value).length
                if(shoe.in_stock > count){
                    addToCart(element.value)
                }
                cartTemplate()
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