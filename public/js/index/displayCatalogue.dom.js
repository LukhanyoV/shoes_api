document.addEventListener("DOMContentLoaded", () => {
    // get the references
    const filterForm = document.querySelector(".filter-form")
    const brand = document.querySelector("#brand")
    const size = document.querySelector("#size")

    const shoesFunctions = ShoesFunctions()

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
    }

    updateDisplay()
})
