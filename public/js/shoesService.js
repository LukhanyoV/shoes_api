const ShoesFunctions = () => {
    const getAll = async () => {
        const {data} = await axios.get(`/api/shoes`)
        return data.data
    }

    const getByBrand = async (brand) => {
        const {data} = await axios.get(`/api/shoes/brand/${brand}`)
        return data.data
    }

    const getBySize = async (size) => {
        const {data} = await axios.get(`/api/shoes/size/${size}`)
        return data.data
    }

    const getByBrandAndSize = async (brand, size) => {
        const {data} = await axios.get(`/api/shoes/brand/${brand}/size/${size}`)
        return data.data
    }

    const addShoe = async (body) => {
        const {data} = await axios.post(`/api/shoes`, body)
        return data.status
    }

    const buyShoe = async (item) => {
        const {data} = await axios.post(`/api/shoes/sold/${item}`)
        return data.status
    }

    return {
        getAll,
        getByBrand,
        getBySize,
        getByBrandAndSize,
        addShoe,
        buyShoe
    }
}