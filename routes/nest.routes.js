const express = require('express');
const router = express.Router();

const Nest = require('../models/Nest.model');



// READ: display all nests

router.get("/", (req, res, next)=>{
    res.send("Hello Nests")
    console.log("Hello")

})

router.get("/hello", (req, res, next)=>{
    res.send("Hello Hellooooo")
    console.log("Hello")

})

module.exports = router;