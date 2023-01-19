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

describe('POST Endpoints', () => {

    describe('Error Testing', () => {
        test(`Expect the response code to return 404 when the requested review_id doesn't exist`, () => {

            return request(app).post("/api/reviews/9001/comments").send({username: 'Rincewind', body: `that doesn't work`})
            .expect(404)
            .then(({body}) => {
                expect(body.message).toBe("review_id not found");
            })
        });

        test(`Expect an error returned when the request body doesn't include the expected data`, () => {

            return request(app).post("/api/reviews/1/comments").send({username: 'bainesface'})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe("Invalid data entry");
            });
        });

        test(`Expect an error returned when the username doesn't exist`, () => {

            return request(app).post("/api/reviews/3/comments").send({username: 'Rincewind', body: `that doesn't work`})
            .expect(400)
            .then(({body})=> {
                expect(body.message).toBe("User not found");
            });
        });

        test(`Expect an error returned when invalid body data is being passed in`, () => {

            return request(app).post("/api/reviews/3/comments").send({username: 'bainesface', body: 388})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe("Invalid data entry");
            });
        });

        test(`Expect an error returned when the body data passed in is too short`, () => {

            return request(app).post("/api/reviews/3/comments").send({username: 'bainesface', body: 'nope'})
            .expect(400)
            .then(({body}) => {
                expect(body.message).toBe("Comment too short");
            });
        });
    });

    describe('Functionality Testing', () => {

        test('Expect POST to respond with 201 when passed in a valid request', () => {

            return request(app).post('/api/reviews/1/comments').send({username: 'bainesface', body: 'Makes me tingly'})
            .expect(201)
            
        });
        
        test('Expect POST to respond with 201 & the updated comments for a valid request', () => {
            
            return request(app).post('/api/reviews/3/comments').send({username: 'dav3rid', body: 'When I get that feeling I need, board game healing'})
            .expect(201)
            .then(({body}) => {
                
                expect(body.comments.length).toBe(4)
                body.comments.forEach( (comment) => {
                    expect(comment).toHaveProperty("comment_id");
                    expect(comment).toHaveProperty("body");
                    expect(comment).toHaveProperty("votes");
                    expect(comment).toHaveProperty("author");
                    expect(comment).toHaveProperty("review_id");
                    expect(comment).toHaveProperty("created_at");
                });
            });
        });
        test(`Expect POST to respond with 201 & the updated comments sorted by date ascending (with added review at the top)`, () => {
            
            return request(app).post('/api/reviews/2/comments').send({username:'dav3rid', body: 'I never get board of this one'})
            .expect(201)
            .then(({body}) => {
                expect(body.comments[0].comment_id).toBe(7);
                expect(body.comments[0].author).toBe('dav3rid');
                expect(body.comments[0].body).toBe('I never get board of this one');
                expect(body.comments).toBeSortedBy("created_at", { descending: true });
            });
        });  
    });
});
