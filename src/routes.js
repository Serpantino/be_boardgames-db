const {Router} = require('express');
const {getCategories, getReviews, get500Error, getSingleReview} = require('./controllers');
const router = new Router();

router.get('/', (request, response) => {
    response.status(200).send(
        `Welcome to the Board Games API.`
    )
});

router.get('/categories', getCategories);

router.get('/reviews', getReviews);

router.get('/reviews/:review_id', getSingleReview);

//router.route for reference
module.exports = router;

//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
    Want router fixed like this. Use router.route to chain.
*/
