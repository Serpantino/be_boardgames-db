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

describe("GET Endpoints", () => {
  describe("Generic Error Testing", () => {
    test("When passed in an invalid path, return a 404 status with message", () => {
      return request(app)
        .get("/app")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe(
            "Page not found, please check your syntax. You entered: /app"
          );
        });
    });
  });

  describe("Functionality Testing", () => {
    describe("getCategories controller", () => {
      test("Expect status 200 & a JSON object when /api/categories is called", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8");
      });

      test("Expect the returned JSON object to have both a slug & properties key & has a length of 4", () => {
        return request(app)
          .get("/api/categories")
          .expect(200)
          .then((categoryData) => {
            expect(categoryData.body.categories).toHaveLength(4);
            categoryData.body.categories.forEach((entry) => {
              expect(entry).toHaveProperty("slug");
              expect(entry).toHaveProperty("description");
            });
          });
      });
    }); //
    describe("getReviews controller", () => {
      test("Expect status 200 & a JSON object when /api/reviews is called", () => {
        return request(app)
          .get("/api/reviews")
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8");
      });

      test(`Expect the returned JSON object to have the all of the expected properties`, () => {
        return request(app)
          .get("/api/reviews")
          .then((reviewData) => {
            expect(reviewData.body).toHaveLength(13);
            reviewData.body.forEach((review) => {
              expect(review).toHaveProperty("title", expect.any(String));
              expect(review).toHaveProperty("designer", expect.any(String));
              expect(review).toHaveProperty("owner", expect.any(String));
              expect(review).toHaveProperty(
                "review_img_url",
                expect.any(String)
              );
              expect(review).toHaveProperty("review_body", expect.any(String));
              expect(review).toHaveProperty("category", expect.any(String));
              expect(review).toHaveProperty("created_at", expect.any(String));
              expect(review).toHaveProperty("votes", expect.any(Number));
              expect(review).toHaveProperty("comment_count",expect.any(Number));
            });
          });
      });
      test(`Expect the reviews to be sorted by date in descending order`, () => {
        return request(app)
          .get("/api/reviews")
          .then(({ body }) => {
            expect(body).toBeSortedBy("created_at", { descending: true });
          });
      });
    });
  });

  describe("getSingleReview", () => {
    describe(`Error Testing`, () => {
      test(`Expect the response code to return 404 when the review_id requested doesn't exist`, () => {
        return request(app)
          .get("/api/reviews/9001")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe(
              "review_id not found"
            );
          });
      });

      test(`Expect a 400 response when an invalid value is passed as the parametric `, () => {
        return request(app)
          .get("/api/reviews/bananas")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe(
              "Bad Request, review_id must be a number"
            );
          });
      });
    });

    describe(`Functionality Testing`, () => {
      test(`Expect the response code to return 200 & a JSON object`, () => {
        return request(app)
          .get("/api/reviews/1")
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8");
      });

      test.only(`Expect the response to have all the properties found on a review`, () => {
        return request(app)
          .get("/api/reviews/3")
          .then((singleReview) => {
            singleReview.body.review.forEach((review) => {
              expect(review).toHaveProperty("title", expect.any(String));
              expect(review).toHaveProperty("review_id", expect.any(Number));
              expect(review).toHaveProperty("designer", expect.any(String));
              expect(review).toHaveProperty("owner", expect.any(String));
              expect(review).toHaveProperty(
                "review_img_url",
                expect.any(String)
              );
              expect(review).toHaveProperty("review_body", expect.any(String));
              expect(review).toHaveProperty("category", expect.any(String));
              expect(review).toHaveProperty("created_at", expect.any(String));
              expect(review).toHaveProperty("votes", expect.any(Number));
            });
          });
      });
    });
  });

  describe("getReviewComments", () => {
    describe("Error Testing", () => {
      test(`Expect server to return a 400 when the requested review doesn't exist`, () => {
        return request(app)
          .get("/api/reviews/bananas/comments")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe(
              "Bad Request, review_id must be a number"
            );
          });
      });

      test(`Expect server to return a 404 if the requested review_id doesn't exist`, () => {
        return request(app)
          .get("/api/reviews/9001/comments")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe(
              "review_id not found"
            );
          });
      });
      test(`Expect that if the review_id is valid but it has no comments, a 200 is returned with a message`, () => {

          return request(app).get('/api/reviews/1/comments')
          .expect(200)
          .then(({body}) => {

              expect(body.comments).toEqual([]);
          })
      })
    });

    describe("Functionality Testing", () => {
      test("Expect server to return a 200 status & JSON object when called with a valid parametric id", () => {
        return request(app)
          .get("/api/reviews/3/comments")
          .expect(200)
          .expect("Content-Type", "application/json; charset=utf-8");
      });

      test("Expect server to return an object with the correct length & properties", () => {
        return request(app)
          .get("/api/reviews/2/comments")
          .expect(200)
          .then((comments) => {
            expect(comments.body.comments.length).toBe(3)
            comments.body.comments.forEach((comment) => {
              expect(comment).toHaveProperty("body");
              expect(comment).toHaveProperty("votes");
              expect(comment).toHaveProperty("author");
              expect(comment).toHaveProperty("review_id");
              expect(comment).toHaveProperty("created_at");
            });
          });
      });
      test("Expect comments to be sorted by date (most recent first)", () => {
        return request(app).get("/api/reviews/3/comments")
        .expect(200)
        .then(({body}) => {
            expect(body.comments).toBeSortedBy("created_at", { descending: true });
        });
      });
    
    });
  });
});
