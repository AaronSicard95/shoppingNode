process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let list = require("./fakeDb");

let newItem = "Milk";

requestbeforeEach(function(){
    list.push(newItem);
})

afterEach(function(){
    list = [];
})

describe("GET /items", function(){
    test("Get list of items", async function(){
        const resp = await request(app.get('/items'));
        expect(resp.statusCode.toBe(200));
        
        expect(resp.body).toEqual(["Milk"]);
        console.log('success');
    })
})