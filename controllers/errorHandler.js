/////////////////////////////////////////////////////////////// error Handler /////////////////////////////////////////////////////////////////
function errorHandler(error, req, res,next) {
    const err = {
        status: 500,
        massage: error
    }
    res.status(500).send(err);
} // under all handlers
module.exports = errorHandler