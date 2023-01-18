const { fetchCategories, fetchReviewComments, fetchReviews, insertReviewComment } = require ('./models');


//This requested alteration doesn't run.
const getCategories = (request, response, next) => {
   
    fetchCategories()
    .then((gameCategories) => {

         response.status(200).json(gameCategories);

    })
    .catch(next);
}

const getReviewComments = (request, response, next) => {

    fetchReviewComments(request.params)
    .then((reviewComments) => {

        response.status(200).json(reviewComments);
    })
}


const getReviews = (request, response, next) => {
    
    fetchReviews()
    .then((gameReviews)=> {
        
        response.status(200).json(gameReviews);
    })
    .catch(next);
}



const postReviewComment = (request, response, next) => {
    console.log('controller reached');
   return response.status(201).send({msg: 'Controller says hi'})
    insertReviewComment(request.body, request.params)
    .then(() => {
        response.status(201).send({msg: 'Successfully Added comment'});
    })
}

module.exports = {getCategories, getReviews, getReviewComments, postReviewComment};

