const { ConsoleWriter } = require("istanbul-lib-report");
const {
  fetchCategories,
  fetchReviewComments,
  fetchReviews,
  fetchSingleReview,
  updateReviewVotes,
  fetchUser,
  insertReviewComment,
  fetchAllUsers
} = require("./models");

const getCategories = (request, response, next) => {
  fetchCategories()
    .then((gameCategories) => {
      response.status(200).send({ categories: gameCategories });
    })
    .catch((error) => next(error));
};

const getReviews = (request, response, next) => {
  fetchReviews()
    .then((gameReviews) => {
      response.status(200).send(gameReviews);
    })
    .catch((error) => next(error));
};

const getSingleReview = (request, response, next) => {
  return fetchSingleReview(request.params.review_id)
    .then((singleReview) => {
      response.status(200).send({ review: singleReview });
    })

    .catch((error) => next(error));
};

const getReviewComments = (request, response, next) => {
  const reviewId = request.params.review_id;

  return fetchReviewComments(reviewId)
    .then((reviewComments) => {
      response.status(200).send({ comments: reviewComments });
    })
    .catch((error) => next(error));
};

const patchReviewVoteCount = (request, response, next) => {
  
  return fetchSingleReview(request.params.review_id).then(() => {
    return updateReviewVotes(
      request.params.review_id,
      request.body
    ).then((updatedReview) => {

      response.status(201).send({ updatedReview });
    });
  }).catch((error) => next(error));
};

const postReviewComment = (request, response, next) => {
    return fetchReviewComments(request.params.review_id)
    .then(() => {
      
        return fetchUser(request.body)
    })
    .then(() => {
        return insertReviewComment(request.body, request.params.review_id)
    })
    .then((updatedComment) => {
        
        response.status(201).send({comment: updatedComment});
    }).catch(error => {next(error)});
}

const getAllUsers = (request, response, next) => {
  
  return fetchAllUsers().then(
    (allUsers) => {
      
      response.status(200).send({users: allUsers})
    }
  ).catch(error => next(error))
}

module.exports = {
  getCategories,
  getReviews,
  getReviewComments,
  getSingleReview,
  patchReviewVoteCount,
  postReviewComment,
  getAllUsers
};
