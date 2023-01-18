const seed = require ('../db/seeds/seed');
const testData = require ('../db/data/test-data/index');
const request = require ('supertest');
const app = require ('../server');
const db = require ('../db/connection');

beforeEach(() => {
    return seed(testData);
})

afterAll(() => {
    return db.end();
})

describe('GET Endpoints', () => {


    
    describe('Generic Error Testing', () => {

        test('When passed in an invalid path, return a 404 status with message', () => {
            return request(app).get('/app')
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe('Page not found, please check your syntax. You entered: /app');
            });
        });

    });




    

    describe('getCategories controller', () => {
        
        test('Expect status 200 & a JSON object when /api/categories is called', () => {
            
            return request(app).get('/api/categories')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            
        });
        
        test('Expect the returned JSON object to have both a slug & properties key & has a length of 4', () => {

            return request(app).get('/api/categories')
            .expect(200)
            .then(categoryData => {
                
                expect(categoryData.body.categories).toHaveLength(4);
                categoryData.body.categories.forEach((entry)=> {
                    expect(entry).toHaveProperty('slug');
                    expect(entry).toHaveProperty('description');
                });
           
            });
        });    
    });
    
    describe('getReviews controller', () => {
        
        test('Expect status 200 & a JSON object when /api/reviews is called', () => {
            
            return request(app).get('/api/reviews')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            
        });
        
        test(`Expect the returned JSON object to have the all of the expected properties`, () => {
            
            return request(app).get('/api/reviews')
            .then(reviewData => {
                expect(reviewData.body).toHaveLength(13);
                reviewData.body.forEach(review => {
                    expect(review).toHaveProperty('title', expect.any(String));
                    expect(review).toHaveProperty('designer', expect.any(String));
                    expect(review).toHaveProperty('owner', expect.any(String));
                    expect(review).toHaveProperty('review_img_url', expect.any(String));
                    expect(review).toHaveProperty('review_body', expect.any(String));
                    expect(review).toHaveProperty('category', expect.any(String));
                    expect(review).toHaveProperty('created_at', expect.any(String));
                    expect(review).toHaveProperty('votes', expect.any(Number));
                    expect(review).toHaveProperty('comment_count', expect.any(Number));
                });
            });
            
        });

        test(`Expect the reviews to be sorted by date in descending order`, () => {
            return request(app).get('/api/reviews')
            .then(({body}) => {
                
                expect(body).toBeSortedBy('created_at', {descending: true })
            });
        });
    });  
    
    describe.only('getReviewComments', () => {

        describe('Error Testing', () => {

            test(`Expect server to return 400 when the entry is out of range`, () => {

                return request(app).get('/api/reviews/9001/comments')
                .expect(400)
            });

            test(`Expect server to return a message stating there are no reviews when passed a valid entry with no reviews`, () => {

                return request(app).get('/api/reviews/5/comments')
                .expect(200)
                .then(({body}) => {

                    expect(body).toEqual({message: 'There are currently no comments for that review'});
                })
            });

        });

        describe('Functionality Testing', () => {

            
            test('Expect server to return a 200 status & JSON object when called with a valid parametric id', () => {
                
                return request(app).get('/api/reviews/1/comments')
                .expect(200)
                .expect('Content-Type', 'application/json; charset=utf-8')
            });
            
            test('Expect server to return an object with the correct length & properties', () => {
                
                return request(app).get('/api/reviews/2/comments')
                .expect(200)
                .then(comments => {
                    
                    comments.body.forEach(comment => {
                        expect(comment).toHaveProperty('body');
                        expect(comment).toHaveProperty('votes');
                        expect(comment).toHaveProperty('author');
                        expect(comment).toHaveProperty('review_id');
                        expect(comment).toHaveProperty('created_at');
                    })
                });
            });
            
            test('Expect every returned object to have the same review_id & for it to be the same as the parametric value passed in', () => {
            const id = 3;

                return request(app).get(`/api/reviews/${id}/comments`)
                .then(comments => {
                    expect(comments.body.every(comment => comment.review_id == id))
                    .toBe(true);
                });
            });
        });
    });
 
});


//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_MERGE NOTES_!_!_!_!_!_!_! //
//!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_!_! //
/*
Added npm i jest-sorted as per suggestion.
 Replaced review sorted with jest-sorted.
*/