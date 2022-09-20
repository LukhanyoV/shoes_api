const shoesService = ShoesFunctions()

// display the number of items in cart template
const cartTemplate = async () => {
    const items = await JSON.parse(localStorage.getItem("cartShoes") || "[]")

    const counter = [... new Set(items)].length

    const template = document.querySelector(".cartTemplate").innerHTML

    const cartTemplate = Handlebars.compile(template)

    const cartTemplateHTML = cartTemplate({counter})

    document.querySelector(".cartMe").innerHTML = cartTemplateHTML
}


const cartTable = async () => {
    const shoeIds = await JSON.parse(localStorage.getItem("cartShoes") || "[]").map(Number)
    // console.log(shoeIds)
    const shoes = await shoesService.getAll()
    // console.log(shoes)
    const array = []

    shoeIds.forEach(id => {
        if(array.find(shoe => shoe.id === id)) return
        let shoe = shoes.find(shoe => shoe.id === id)
        let count = shoeIds.filter(s => s == id).length
        let price = shoe.price*count
        shoe = {...shoe, in_cart: count, price: price}
        array.push(shoe)
    })
    console.log(array)
    // shoes.forEach(shoe => {
    //     if(shoeIds.includes(shoe.id)){
    //         let index = shoeIds.indexOf(shoe.id)
    //         array.push(shoe)
    //         shoeIds.splice(index, 1)
    //     }
    // })
    // get the total of the items in array
    let total = array.map(obj => obj['price']).reduce((s,v)=>s+v,0)
    
    const template = document.querySelector(".tableTemplate").innerHTML

    const tableTemplate = Handlebars.compile(template)

    const tableTemplateHTML = tableTemplate({shoes: array, totals: total})

    document.querySelector(".tableData").innerHTML = tableTemplateHTML
    handleButtons()
}

document.querySelector(".clear-button").addEventListener("click", () => {
    const shoesID = (JSON.parse(localStorage.getItem("cartShoes") || "[]")).map(Number)
    // clear iitems on localstorage
    localStorage.removeItem("cartShoes")
    // update cart table
    cartTable()
    // update items on cart
    cartTemplate()
    // clear cart message
    let msg = shoesID.length === 0 ? "No items on cart!" : "Items have been cleared!"
    document.querySelector(".msg").innerHTML = msg
    clearMsg()
})

cartTable()

cartTemplate()

document.addEventListener("DOMContentLoaded", () => handleButtons)

const handleButtons = async () => {
    const shoes = await shoesService.getAll()

    document.querySelectorAll(".remove-item").forEach(element => {
        element.addEventListener("click", () => {
            removeFromCart(element.value)
            cartTemplate()
            cartTable()
        })
    })

    document.querySelectorAll(".inc-item").forEach(element => {
        element.addEventListener("click", () => {
            let shoe = shoes.find(shoe => shoe.id == element.value)
            let count = (JSON.parse(localStorage.getItem("cartShoes") || "[]")).filter(item => item == element.value).length
            if(shoe.in_stock > count){
                addToCart(element.value)
            }
            cartTemplate()
            cartTable()
        })
    })

    document.querySelectorAll(".dec-item").forEach(element => {
        element.addEventListener("click", () => {
            decItem(element.value)
            cartTemplate()
            cartTable()
        })
    })
}

const addToCart = (item) => {
    const items = JSON.parse(localStorage.getItem("cartShoes") || "[]")
    items.push(item)
    localStorage.setItem("cartShoes", JSON.stringify(items))
}

const decItem = (item) => {
    let items = JSON.parse(localStorage.getItem("cartShoes") || "[]")
    let count = items.filter(i => i == item).length
    count--
    items = items.filter(i => item != i)
    while(count > 0) {
        items.push(item)
        count--
    }
    localStorage.setItem("cartShoes", JSON.stringify(items))
}

const removeFromCart = (item) => {
    let items = JSON.parse(localStorage.getItem("cartShoes")) || []
    items = items.filter(el => el!=item)
    localStorage.setItem("cartShoes", JSON.stringify(items))
}

document.querySelector(".checkout-button").addEventListener("click", async () => {
    try {
        const shoesID = (JSON.parse(localStorage.getItem("cartShoes") || "[]")).map(Number)
        for(let item of shoesID){
            await shoesService.buyShoe(item)
        }
        // clear iitems on localstorage
        localStorage.clear()
        // update cart table
        cartTable()
        // update items on cart
        cartTemplate()
        // cart checkout success message
        let msg = shoesID.length === 0 ? "No items on cart!" : "Items have been checked out!"
        document.querySelector(".msg").innerHTML = msg
        clearMsg()
    } catch (error) {
        console.log(error.stack)
    }
})

const clearMsg = () => {
    setTimeout(() => document.querySelector(".msg").innerHTML = "", 3000)
}