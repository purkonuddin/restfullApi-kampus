module.exports = {
    response: (response, status, data) => {
        const result = {}
        result.status = status || 200
        result.result = data
        return response.status(result.status).json(result)
    },
    
    customErrorResponse: (response, status, message) => {
        try {
            const result = {}
            result.status = status || 400
            result.message = message
            return response.status(result.status).json(result)
        } catch (error) {
            console.log(error)
        }
    }
}