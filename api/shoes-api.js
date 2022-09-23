const ShoesAPI = (shoesService) => {

    const getAll = async (req, res) => {
        try {
            const data = await shoesService.getAll()
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const getByBrand = async (req, res) => {
        try {
            const {brandname} = req.params
            const data = await shoesService.getByBrand(brandname)
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const getBySize = async (req, res) => {
        try {
            const {size} = req.params
            const data = await shoesService.getBySize(size)
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const getByColor = async (req, res) => {
        try {
            const {color} = req.params
            const data = await shoesService.getByColor(color)
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const getByAll = async (req, res) => {
        try {
            const {brandname, size, color} = req.params
            const data = await shoesService.getByAll(brandname, size, color)
            res.json({
                status: "success",
                data
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const buyShoe = async (req, res) => {
        try {
            const {id} = req.params
            const shoe = await shoesService.getById(id)
            await shoesService.buyShoe(shoe)
            res.json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    const addShoe = async (req, res) => {
        try {
            await shoesService.addShoe(req.body)
            res.json({
                status: "success"
            })
        } catch (error) {
            res.json({
                status: "error",
                error: error.stack
            })
        }
    }

    return {
        getAll,
        getByBrand,
        getBySize,
        getByColor,
        getByAll,
        buyShoe,
        addShoe
    }
}

module.exports = ShoesAPI