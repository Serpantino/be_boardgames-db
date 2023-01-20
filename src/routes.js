const {Router} = require('express');

const {getCategories, getReviews, getSingleReview, getReviewComments, postReviewComment, patchReviewVoteCount, getAllUsers} = require('./controllers');
const router = new Router();

router.get('/', (request, response) => {
    response.status(200).send(
        `Welcome to the Board Games API.`
    )
});

router.get('/categories', getCategories);

router.get('/reviews', getReviews);

router.get('/users', getAllUsers);

router.route('/reviews/:review_id').get(getSingleReview)
.patch(patchReviewVoteCount);

router.route('/reviews/:review_id/comments').get(getReviewComments)
.post(postReviewComment);

module.exports = router;

