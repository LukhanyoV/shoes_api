document.addEventListener("DOMContentLoaded", () => {
    // get the references
    const addShoeForm = document.querySelector(".add-shoe-form")
    const msg = document.querySelector(".msg")

    const shoesFunctions = ShoesFunctions()

    addShoeForm.addEventListener("submit", async (e) => {
        e.preventDefault()
        const formData = new FormData(addShoeForm)
        const body = {}
        for (const [key, value] of formData) {
            body[key] = value
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
