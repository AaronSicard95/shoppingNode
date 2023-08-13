const express = require('express');
const router = new express.Router();
var fakeDb = require('./fakeDb');

router.get("/", function(req, res){
    return res.json(fakeDb);
})
router.post("/", function(req, res){
    fakeDb.push(req.body);
    return res.json(fakeDb);
})
router.get("/:itemname", function(req, res){
    return res.json(fakeDb.find(x=>x.name==itemname));
})
router.patch("/:itemname", function(req,res){
    fakeDb[fakeDb.findIndex(x=>x.name==itemname)] = req.body;
    return res.json(fakeDb.find(x=>x.name==itemname))
})
router.delete("/:itemname", function(req,res){
    newitems = fakeDb.splice(fakeDb.findIndex(x=>x.name==itemname),1);
    return res.json(fakeDb)
})

module.exports = router;