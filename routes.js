const express = require('express');
const router = express.Router();
var fakeDb = require('./fakeDb');

router.get("/", function(req, res){
    return res.json(fakeDb);
})
router.post("/", function(req, res){
    fakeDb.push(req.body);
    return res.json(fakeDb);
})
router.get("/:itemname", function(req, res){
    let itemreq =  res.json((fakeDb.find(item=>item.name = req.params.itemname)));
    if(itemreq == undefined){
        throw new Error("item not found", 404);
    } else{
        return res.body(itemreq);
    }
})
router.patch("/:itemname", function(req,res){
    let i = fakeDb.findIndex(x=>x.name==req.params.itemname)
    fakeDb[i] = req.body;
    return res.json(fakeDb[i]);
})
router.delete("/:itemname", function(req,res){
    fakeDb.splice(fakeDb.findIndex(x=>x.name==req.params.itemname),1);
    return res.json(fakeDb)
})

module.exports = router;