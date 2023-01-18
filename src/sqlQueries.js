
const gameCategories = `SELECT * FROM categories;`;
const gameReviews = `SELECT * FROM reviews ORDER BY created_at DESC;`;
const reviewComments = `SELECT * FROM comments`
const reviewCommentCount = `
SELECT reviews.review_id, (SELECT COUNT (review_id) FROM comments WHERE comments.review_id = reviews.review_id) AS TOT FROM reviews;`

const fetchReviewComments = `SELECT * FROM comments WHERE review_id = $1;`
const insertReviewCommentSQL = `INSERT INTO comments (review_id, author, body) VALUES ($1, $2, $3);`
module.exports = {gameCategories, gameReviews, reviewComments, reviewCommentCount, fetchReviewComments, insertReviewCommentSQL};

//N.B once all is merged up to this point, probably worth suffixing each with SQL just to make the variables purpose clearer.