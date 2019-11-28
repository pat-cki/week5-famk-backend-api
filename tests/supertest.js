const test = require("tape");
const supertest = require("supertest");
const router = require("../src/router")

test("Initialise", t => {
    let num = 2;
    t.equal(num, 2, "Should return 2")
    t.end();
})

test("Search returns data correctly", t => {
    let expectedExample = {
        "bitcoin": {
          "usd": 7469.8,
          "last_updated_at": 1574940331
        }
      }
    supertest(router)
    .get("/search?ids=bitcoin&vs_currencies=usd")
    .expect(200)
    .end((error, response) => {
       let actualExample = JSON.parse(response.text)
        t.error(error);
        t.deepEqual(typeof actualExample, typeof expectedExample, "Response body should be an object");
        t.deepEqual(Object.keys(actualExample), Object.keys(expectedExample), "Response body should have same key (bitcoin)");
        t.deepEqual(Object.keys(actualExample.bitcoin), Object.keys(expectedExample.bitcoin), "Response object key bitcoin should contain object with keys usd and last_updated_at");
        t.deepEqual(typeof actualExample.bitcoin.usd, typeof expectedExample.bitcoin.usd, "USD property of Bitcoin key in object should be a number")
        t.end();
    })
})

test("Home page exists", t => {
    supertest(router)
    .get("/")
    .expect(200)
    .expect("Content-Type",/html/)
    .end((error, response) => {
        t.error(error);
        t.equal(response.statusCode,200,"Status code should be 200")
        t.end();
    })
})

test("CSS sheet exists", t => {
    supertest(router)
    .get("/public/styles.css")
    .expect(200)
    .expect("Content-Type",/css/)
    .end((error, response) => {
        t.error(error);
        t.equal(response.statusCode,200,"Status code should be 200")
        t.end();
    })
})

test("404 works", t => {
    supertest(router)
    .get("/wallaby")
    .expect(404)
    .expect("Content-Type",/html/)
    .end((error, response) => {
        t.error(error);
        t.equal(response.statusCode,404,"Status code should be 404")
        t.end();
    })
})