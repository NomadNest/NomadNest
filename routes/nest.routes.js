const express = require('express');
const router = express.Router();

const Nest = require('../models/Nest.model');


// READ: display all nests

router.get("/", (req, res, next)=>{
    res.send("Hi Emilio, lets see if it is working :)")
    console.log("Hello")
})



module.exports = router;