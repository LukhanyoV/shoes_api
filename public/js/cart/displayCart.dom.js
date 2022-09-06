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

    shoes.forEach(shoe => {
        if(shoeIds.includes(shoe.id)){
            let index = shoeIds.indexOf(shoe.id)
            array.push(shoe)
            shoeIds.splice(index, 1)
        }
    })
    // console.log(array)
    // get the total of the items in array
    let total = array.map(obj => obj['price']).reduce((s,v)=>s+v,0)
    
    const template = document.querySelector(".tableTemplate").innerHTML

    const tableTemplate = Handlebars.compile(template)

    const tableTemplateHTML = tableTemplate({shoes: array, totals: total})

    document.querySelector(".tableData").innerHTML = tableTemplateHTML
    handleRemoveClick()
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

document.addEventListener("DOMContentLoaded", () => handleRemoveClick)

const handleRemoveClick = () => {
    document.querySelectorAll(".remove-item").forEach(element => {
        element.addEventListener("click", () => {
            removeFromCart(element.value)
            cartTemplate()
            cartTable()
        })
    })
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
        localStorage.removeItem("cartShoes")
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