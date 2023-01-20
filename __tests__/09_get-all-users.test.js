const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index");
const request = require("supertest");
const app = require("../server");
const db = require("../db/connection");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});


describe('Get All Users', () => {

    describe('Functionality Testing', () => {

        test('Expect a 200 to be returned', () => {
            return request(app).get('/api/users')
            .expect(200)
        });

        test('Expect the returned body length to be 4', () => {
            return request(app).get('/api/users')
            .expect(200)
            .then(({body}) => {
            
                expect(body.users.length).toBe(4);
            });
        });
        test('Expect every entry in the returned body to have username, name & avatar_url properties', () => {
            return request(app).get('/api/users')
            .expect(200)
            .then(({body}) => {
        
                body.users.forEach(user => {
                    expect(user).toHaveProperty("username", expect.any(String));
                    expect(user).toHaveProperty("name", expect.any(String));
                    expect(user).toHaveProperty("avatar_url", expect.any(String));
                })
                expect(body.users.length).toBe(4);
            });
        });
    });

        
});