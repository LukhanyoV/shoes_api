const shoesService = ShoesFunctions()

// display the number of items in cart template
const cartTemplate = () => {
    const items = JSON.parse(localStorage.getItem("cartShoes")) || []

    const counter = [... new Set(items)].length

    const template = document.querySelector(".cartTemplate").innerHTML

    const cartTemplate = Handlebars.compile(template)

    const cartTemplateHTML = cartTemplate({counter})

    document.querySelector(".cartMe").innerHTML = cartTemplateHTML
}


const cartTable = async () => {
    const shoeIds = JSON.parse(localStorage.getItem("cartShoes")) || []
    console.log(shoeIds)
    const shoes = await shoesService.getAll()
    console.log(shoes)
    const array = []

    shoes.forEach(shoe => {
        if(shoeIds.includes(shoe.id+"")){
            let index = shoeIds.indexOf(shoe.id)
            array.push(shoe)
            shoeIds.splice(index, 1)
        }
    })
    console.log(array)
    // get the total of the items in array
    let total = array.map(obj => obj['price']).reduce((s,v)=>s+v,0)
    
    const template = document.querySelector(".tableTemplate").innerHTML

    const tableTemplate = Handlebars.compile(template)

    const tableTemplateHTML = tableTemplate({shoes: array, totals: total})

    document.querySelector(".tableData").innerHTML = tableTemplateHTML
}

cartTable()

cartTemplate()