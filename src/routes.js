const {Router} = require('express');
const {getCategories, getReviewComments, getReviews, postReviewComment} = require('./controllers');
const router = new Router();

router.get('/', (request, response) => {
    response.status(200).send(
        `Welcome to the Board Games API.`
    )
});

router.get('/categories', getCategories);

router.get('/reviews', getReviews);

router.route('/reviews/:review_id/comments').get(getReviewComments)
.post(postReviewComment);


// router.post('/reviews/:review_id/comments', postReviewComment);



module.exports = router;