const mongoose = require('mongoose');
const Nest = require('../models/Nest.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/NomadNest';

const nests = [
  {
    title: "Lake cabin in the woods",
    // picture: String,
    location: "Bavaria, Germany",
    price: 35,
    description: "Enjoy the atmosphere at a stunning nature area with kind people."
  },
  {
    title: "Poolside cottage in the highlands",
    // picture: String,
    location: "Arhus, Denmark",
    price: 60,
    description: "Let your soul float through a nice welness retreat with sauna and indoor pool area."
  }
];


mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );

    // return Nest.deleteMany({}); //WARNING: this will delete all nests in DB !!

  })
  .then((response) => {
    console.log(response);

    return Nest.insertMany(nests);
  })
  .then(nestsFromDB => {
    console.log(`Created ${nestsFromDB.length} nests`);

  // Once created, close the DB connection
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to DB: ", err);
  });
