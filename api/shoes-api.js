const ShoesAPI = () => {
    const test = (req, res) => {
        res.json({
            result: "success"
        })
    }

    return {
        test
    }
}

module.exports = ShoesAPI