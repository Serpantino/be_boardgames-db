const db = require('../db/connection');
const sqlQueries = require ('../src/sqlQueries');
const {buildNewReviewObj} = require ('../util_funcs/utilityFunctions');


function fetchCategories() {
    return db.query(sqlQueries.gameCategories)
    .then(gameCategories => {
        return gameCategories.rows;
    });
}

function fetchReviews() {

    let gameReviews;
    let commentCount;

    return db.query(sqlQueries.gameReviews)
    .then(({rows}) => {
        gameReviews = rows;
    })
    .then(() => {

     return db.query(sqlQueries.reviewCommentCount)})

    .then(({rows}) => {
            commentCount = rows;
            const fixedReviews = buildNewReviewObj(gameReviews, commentCount);

            return fixedReviews;
        })    
}  


function fetchSingleReview(id) {
    
    return db.query(sqlQueries.singleReview,[id.review_id])
    .then(review => {
        
        return review.rows;
    })
}


module.exports = {fetchCategories, fetchReviews, fetchSingleReview};


/*Backup because HUSKY grrrrr 

function fetchReviews() {
    db.query(sqlQueries.gameReviews)
    .then(({rows}) => {
        let gameReviews = rows;
        
        db.query(sqlQueries.reviewCommentCount)
        .then(commentCount => {
            
            commentCount.rows.forEach(comments => {
                for(const review of gameReviews) 
                {
                    if (comments.review_id === review.review_id){
                        
                        review.comment_count = comments.tot;
                    }
                }
            })
            console.log('revs', gameReviews);
            return gameReviews;
        })  
        
    })
    
    // return console.log('revOut', gameReviews);
 
}  
*/