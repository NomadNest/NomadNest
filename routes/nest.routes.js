const express = require('express');
const router = express.Router();

const Nest = require('../models/Nest.model');

const fileUploader = require('../config/cloudinary.config');

const isLoggedIn = require('../middleware/isLoggedIn');
// const isLoggedOut = require('../middleware/isLoggedOut');



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

router.get("/create", isLoggedIn, (req, res, next) => {

    console.log('USER FROM /create', req.session.currentUser._id)
    res.render("nests/nest-create")

})

// CREATE: process form

router.post("/create", fileUploader.single('movie-cover-image'), isLoggedIn, (req, res, next) => {

    const newNest = {
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.file.path,
        owner: req.session.currentUser._id,
        // address: {
        //     type: 'Point',
        //     coordinates: [longitude, latitude]
        //   }
    }

    Nest.create(newNest)
        .then((newNest) => {
            res.redirect("/nests")
        })
        .catch(e => {
            console.log("error creating new Nest", e);
            next(e);
        });
})


//UPDATE: display form
router.get("/:nestId/edit", isLoggedIn, (req, res, next) => {
    const { nestId } = req.params;

    Nest.findById(nestId)
        .then((nestFromDB) => {

            res.render("nests/nest-update.hbs", { nest: nestFromDB })

        })

        .catch((error) => next(error));
});



// UPDATE: Process form
router.post("/:nestId/edit", isLoggedIn, fileUploader.single('movie-cover-image'), (req, res, next) => {
    const { nestId } = req.params;
    const { title, location, price, description, existingImage } = req.body;

    let imageUrl;
    if (req.file) {
        console.log("req.file is....." + req.file)

        imageUrl = req.file.path;
    } else {
        imageUrl = existingImage;
        console.log("imgUrl is....." + imageUrl)
    }

    Nest.findByIdAndUpdate(
        nestId,
        { title, location, price, description, imageUrl },
        { new: true }
    )
        .then((updatedNest) => res.redirect(`/nests/${updatedNest._id}`))
        .catch((error) => next(error));
});


// DELETE: Remove Nest from Database

router.post('/:nestId/delete', isLoggedIn, (req, res, next) => {
    const { nestId } = req.params;
    Nest.findByIdAndDelete(nestId)
        .then(() => res.redirect('/nests'))
        .catch(error => next(error));
})



// READ: display details of one Nest
router.get("/:nestId", (req, res, next) => {

    const id = req.params.nestId;

    Nest.findById(id)
    //   .then((nestFromDB) => {
    //     if (req.session.currentUser._id == nestFromDB.owner) {
    //       res.render("nests/nest-details", { nest: nestFromDB, isOwner: true });
    //     } else {
    //       res.render("nests/nest-details", {
    //         nest: nestFromDB,
    //         isOwner: false,
    //       });
    //     }
    //   })
      .then((nestFromDB) => {
        const isOwner =
          req.session.currentUser &&
          req.session.currentUser._id == nestFromDB.owner;
        res.render("nests/nest-details", { nest: nestFromDB, isOwner });
      })
      .catch((e) => {
        console.log("error getting nest details from DB", e);
        next(e);
      });
})


// GOOGLE

// const geocoder = new google.maps.Geocoder();

// document.getElementById('submit').addEventListener('click', () => {
//   geocodeAddress(geocoder, map);
// });

// function geocodeAddress(geocoder, resultsMap) {
//   const address = document.getElementById('address').value;

//   geocoder.geocode({ address: address }, (results, status) => {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       let marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });
//       document.getElementById('latitude').value = results[0].geometry.location.lat();
//       document.getElementById('longitude').value = results[0].geometry.location.lng();
//     } else {
//       console.log(`Geocode was not successful for the following reason: ${status}`);
//     }
//   });
// }







module.exports = router;