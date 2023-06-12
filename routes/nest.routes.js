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


//Update: display form
router.get("/:nestId/edit", (req, res, next) => {
  const { nestId } = req.params;

  Nest.findById(nestId)
    .then((nestId) => {
      res.render("nests/nest-update.hbs", { nest: nestId });
    })

    .catch((error) => next(error));
});


// update: Process form
router.post("/:nestId/edit", (req, res, next) => {
  const { nestId } = req.params;
  const { title, location, price, description } = req.body;
  Nest.findByIdAndUpdate(
    nestId,
    { title, location, price, description },
    { new: true }
  )
    .then((updatedNest) => res.redirect(`/nests/${updatedNest._id}`))
    .catch((error) => next(error));
});


// DELETE: Remove Nest from Database

router.post('/:nestId/delete', (req, res, next) => {
    const { nestId } = req.params;
    Nest.findByIdAndDelete(nestId)
        .then(() => res.redirect('/nests'))
        .catch(error => next(error));
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