const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');



function fetchCategories() {
    return db.query(sqlQueries.gameCategoriesSQL)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviews() {

    return db.query(sqlQueries.getAllReviewsWithCommentCountSQL)
    .then(({rows}) => {
        return rows;
    })
}

function fetchReviewComments(id) {
    // console.log('fetch id', id)
    return db.query(sqlQueries.checkReviewIdExistsSQL, [id.review_id]).then(
        ({rows}) => {
        
            if (rows.length === 0) {
            throw(error);
         } 
         else {
            
            return db.query(sqlQueries.fetchReviewCommentsSQL, [id.review_id])
            .then(reviewComments => {
            
            return reviewComments.rows;
            });
        }
    })
}



module.exports = {fetchCategories, fetchReviews, fetchReviewComments};

