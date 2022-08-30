// display the number of items in cart template
const cartTemplate = () => {
    const items = JSON.parse(localStorage.getItem("cartShoes")) || []

    const counter = [... new Set(items)].length

    const template = document.querySelector(".cartTemplate").innerHTML

    const cartTemplate = Handlebars.compile(template)

    const cartTemplateHTML = cartTemplate({counter})

    document.querySelector(".cartMe").innerHTML = cartTemplateHTML
}

cartTemplate()