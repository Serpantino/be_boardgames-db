

function errorHandler(error, request, response, next) {
    console.error(error);

    getErrorCode(error).then((errorCode) => {

    response.status(errorCode.status).send(`Message: ${errorCode.text}`)
    
    })
    next(error);

}


function getErrorCode(error) {

switch(error) {

    default: 
        return ({status: 500, text: 'Server Errorerererer'});

}
}

module.exports = errorHandler;