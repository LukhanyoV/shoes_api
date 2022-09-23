document.addEventListener("DOMContentLoaded", () => {
    // get the references
    const addShoeForm = document.querySelector(".add-shoe-form")
    const msg = document.querySelector(".msg")

    const shoesFunctions = ShoesFunctions()

    const cartTemplate = () => {
        const items = JSON.parse(localStorage.getItem("cartShoes")) || []
    
        const counter = [... new Set(items)].length
    
        const template = document.querySelector(".cartTemplate").innerHTML
    
        const cartTemplate = Handlebars.compile(template)
    
        const cartTemplateHTML = cartTemplate({counter})
    
        document.querySelector(".cartMe").innerHTML = cartTemplateHTML
    }
    
    cartTemplate()

    addShoeForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(addShoeForm)
        const body = {}
        for (const [key, value] of formData) {
            body[key] = value.trim()
        }

        if(body.price <= 0){
            msg.innerHTML = "The price must be greater than 0"
            return
        } else if(body.size <= 0){
            msg.innerHTML = "The shoe size must be greater than 0"
            return
        }

        const status = await shoesFunctions.addShoe(body)
        
        if(status === "success") {
            msg.innerHTML = "Shoe has been added successfully!"
        } else {
            msg.innerHTML = "An error has occured!"
        }

        clearForm()
    })

    const clearForm = () => {
        addShoeForm.reset()
        setTimeout(() => {
            msg.innerHTML = ""
        }, 5000)
    }
})
