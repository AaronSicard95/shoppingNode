process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let list = require("./fakeDb");

let newItem = {name: "Milk"};

beforeEach(function(){
    list.push(newItem);
})

afterEach(function(){
    list = [];
})

describe("GET /items", function(){
    test("Get list of items", async function(){
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);
        
        expect(resp.body).toEqual([{name: "Milk"}]);
        console.log('success');
    })
})

describe("POST /item", function(){
    test("Add an item", async function(){
        const resp = await request(app).post('/items').send({name: "newItem"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual([{name: "Milk"},{name: "newItem"}]);
        expect(list.length).toEqual(1);
    })
})

describe("GET /item/:itemname", function(){
    test("Get a specific item", async function(){
        const resp = await request(app).get(`/items/${newItem.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({name: "Milk"});
    })
})

describe("Patch /item/:itemname", function(){
    test("Update an Item", async function(){
        const resp = await request(app).patch(`/items/${newItem.name}`).send({name: "Water"});
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({name: "Water"});
    })
})

describe("DELETE /item/:itemname", function(){
    test("Delete an item", async function(){
        expect(list).toEqual([{name: "Milk"}]);
        const resp = await request(app).delete(`/items${newItem.name}`);
        //expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({});
        expect(list.length).toEqual(1);
    })
})