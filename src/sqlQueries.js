
const gameCategoriesSQL = `SELECT * FROM categories;`;
const getAllReviewsWithCommentCountSQL = 
`SELECT reviews.*,
CAST (COUNT (comments.review_id) AS INT) AS comment_count
FROM reviews 
LEFT JOIN comments ON comments.review_id = reviews.review_id
GROUP BY reviews.review_id
ORDER BY created_at DESC;`;
const reviewCommentsSQL = `SELECT * FROM comments`
const reviewCommentCountSQL = `
SELECT reviews.review_id, (SELECT COUNT (review_id) FROM comments WHERE comments.review_id = reviews.review_id) AS TOT FROM reviews;`
const checkReviewIdExistsSQL = `SELECT * from reviews WHERE review_id = $1;`;
const fetchReviewCommentsSQL = `SELECT * FROM comments WHERE review_id = $1;`;


module.exports = {gameCategoriesSQL,
     getAllReviewsWithCommentCountSQL, 
     reviewCommentsSQL, 
     reviewCommentCountSQL,
     checkReviewIdExistsSQL,
     fetchReviewCommentsSQL
    };