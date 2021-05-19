exports.success = function(req, res, message, status = 200) {
    res.status(status).send({
        error: '',
        body: message
    })
}

exports.error = function (req, res, message, status, details) {
    console.error(`Response error: ${details}`)
    res.status(status || 500).send({
        error: message,
        body: ''
    })
}