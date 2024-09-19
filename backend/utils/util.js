// Helper functions for the backend

// Validate required parameters
// obj: the object to be validated
// res: the response object
// code: the response code, integer
// param_name: the name of the parameter, string
const validateParam = (obj, res, code, msg) => {
    if (!obj) {
        res.status(code);
        throw new Error(msg);
    }
}

export {
    validateParam
}