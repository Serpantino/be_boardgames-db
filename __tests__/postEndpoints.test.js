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

    test('Expect POST to respond with 201 when passed in a valid request', () => {
        const testComment = {author: 'Serpy', body: 'test'};

        return request(app).post('/api/reviews/1/comments').send(testComment)
        .expect(201)
    });

    
});