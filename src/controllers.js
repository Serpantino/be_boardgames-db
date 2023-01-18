const { fetchCategories, fetchReviews, fetchReviewComments } = require ('./models');

//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).send({categories: gameCategories});

    })
    .catch(error => next(error));
}


const getReviews = (request, response, next) => {

    fetchReviews()
    .then((gameReviews)=> {
        
        response.status(200).send(gameReviews);
    })
    .catch(error => next(error));
}

const getReviewComments = (request, response, next) => {

    fetchReviewComments(request.params)
    .then((reviewComments) => {
    
        if (reviewComments.length === 0) {
            response.status(200).send({message: 'There are currently no comments for that review'});
        }
        
        response.status(200).send(reviewComments);
    })
    .catch(error => next(error));
}

module.exports = {getCategories, getReviews, getReviewComments};

//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Want all instances of json replaced with get.
*/
