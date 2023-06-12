const express = require('express');
const router = express.Router();

const Nest = require('../models/Nest.model');


// READ: display all nests

router.get("/", (req, res, next) => {

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




// CREATE: display form

router.get("/create", (req,res,next) => {
    res.render("nests/nest-create")
})

// CREATE: process form

router.post("/create", (req,res,next) => {

    const newNest = {
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        description: req.body.description
    }

    Nest.create(newNest)
    .then( (newNest) => {
        res.redirect("/nests")
    })
    .catch( e => {
        console.log("error creating new Nest", e);
        next(e);
    });
})


// READ: display details of one Nest
router.get("/:nestId", (req,res,next) => {

    const id = req.params.nestId;
    
    Nest.findById(id)
    .then(nestFromDB => {
        res.render("nests/nest-details", nestFromDB);
    })
    .catch( e => {
        console.log("error getting book details from DB", e);
        next(e);
    });
    })




module.exports = router;