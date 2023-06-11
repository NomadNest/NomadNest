const express = require('express');
const router = express.Router();

const Nest = require('../models/Nest.model');


// READ: display all nests

router.get("/nests", (req, res, next) => {

    Nest.find()
        .then(nestsFromDB => {

            const data = {
                nests: nestsFromDB
            }
            res.render("nests/nests-list", data);
        })
        .catch(e => {
            console.log("error getting all Nests from DB", e);
            next(e);
        })
});






module.exports = router;