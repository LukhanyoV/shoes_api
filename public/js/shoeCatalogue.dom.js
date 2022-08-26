// working with local storage
const updateLocalStorage = array => localStorage.setItem("shoes", JSON.stringify(array))
const getLocalStorage = () => JSON.parse(localStorage.getItem("shoes")) || []
const getFromCart = () => JSON.parse(localStorage.getItem("cart")) || []
const addToCart = obj => {
    const cart = getFromCart() || []
    let condition = false
    let index
    cart.forEach((shoe, i) => {
        if(obj.brand === shoe.brand && obj.color === shoe.color && obj.price === shoe.price && obj.size === shoe.size){
            condition = true
            index = i
        }
    })
    if(condition === false){
        obj['in_stock'] = 1
        cart.push(obj)
    } else {
        cart[index]['in_stock']++
    }
    localStorage.setItem("cart", JSON.stringify(cart))
}

// create the instance
const catalogue = ShoeCatalogue()

// START HOME PAGE
// I want this script to to only run on the home page
if(window.location.href.endsWith("index.html") || window.location.href.endsWith("/")){
    getLocalStorage().length === 0 && updateLocalStorage(catalogue.getAllShoes())
    // make references to the filters
    const colorSelect = document.querySelector("#color")
    const brandSelect = document.querySelector("#brand")
    const sizeSelect = document.querySelector("#size")
    
    // the template
    const shoeTemplate = array => {
        Handlebars.registerHelper("string", obj => {
            return JSON.stringify(obj)
        })
        
        const template = document.querySelector(".shoesTemplate").innerHTML

        const tableTemplate = Handlebars.compile(template)

        const tableTemplateHTML = tableTemplate({shoes: array})

        document.querySelector(".shoesData").innerHTML = tableTemplateHTML
    }

    // show the avaliable shoes
    const updateDisplay = () => {
        getLocalStorage().length >= 0 && catalogue.updateTheShoes(getLocalStorage())
        const byColor = catalogue.getShoesByColor(catalogue.getAllShoes(), colorSelect.value)
        const byBrand = catalogue.getShoesByBrand(byColor, brandSelect.value)
        const bySize = catalogue.getShoesBySize(byBrand, sizeSelect.value)
        let results = bySize.filter(obj => obj.in_stock > 0)
        shoeTemplate(results)

        // add an event listener to all the add to cart buttons
        document.querySelectorAll(".add-cart").forEach(element => {
            element.addEventListener("click", () => {
                catalogue.addToCart(JSON.parse(element.value))
                addToCart(JSON.parse(element.value)) // local storage
                updateLocalStorage(catalogue.getAllShoes())
                updateDisplay()
            })
        })
    }

    // add an event listener on the filter button
    document.querySelector(".filter-button").addEventListener("click", e => {
        e.preventDefault()
        // if any from localsorage
        updateDisplay()
    })

    // always show the available shoes by default
    updateDisplay()
}
// END HOME PAGE


// START ADD PAGE
// I want this script to to only run on the new.html page
if(window.location.href.endsWith("new.html")){
    // make references to the input fields
    const addBrand = document.querySelector(".add-brand")
    const addColor = document.querySelector(".add-color")
    const addPrice = document.querySelector(".add-price")
    const addSize = document.querySelector(".add-size")
    const msg = document.querySelector(".msg")

    // add an event listener to the add button
    document.querySelector(".add-button").addEventListener("click", e => {
        e.preventDefault()
        const myShoe = {
            color: addColor.value,
            brand: addBrand.value,
            price: addPrice.value-"",
            size: addSize.value-"",
        }
        console.log()
        if(!Object.values(myShoe).includes("") && myShoe.price > 0 && myShoe.size > 0){
            catalogue.addNewShoe(myShoe)
            updateLocalStorage(catalogue.getAllShoes())
            msg.innerHTML = "<h3 style='color:green'>Shoe added success</h3>"
        } else {
            msg.innerHTML = "<h3 style='color:red'>Please fill in all fields</h3>"
        }
        setTimeout(()=>msg.innerHTML="", 3000)
    })
}
// END ADD PAGE


// START CART PAGE
// I want this script to to only run on the cart page
if(window.location.href.endsWith("cart.html")){
    const cartTemplate = array => {
        // get the total of the items in array
        let total = array.map(obj => obj['price']).reduce((s,v)=>s+v,0)
        
        const template = document.querySelector(".tableTemplate").innerHTML

        const tableTemplate = Handlebars.compile(template)

        const tableTemplateHTML = tableTemplate({shoes: array, totals: total})

        document.querySelector(".tableData").innerHTML = tableTemplateHTML
    }
    let array = getFromCart().map(obj => {
        obj['price'] *= obj['in_stock']
        return obj
    })
    cartTemplate(array)

    // checkout the products
    document.querySelector(".checkout-button").addEventListener("click", () => {
        // clear cart
        localStorage.removeItem('cart')
        // message user upon success
        cartTemplate(getFromCart())
    })

    // cancel the orders
    document.querySelector(".clear-button").addEventListener("click", () => {
        localStorage.clear()
        cartTemplate(getFromCart())
    })

}
// END CART PAGE