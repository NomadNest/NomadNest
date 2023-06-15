
// window.addEventListener('load', () => {
//     const ironhackBCN = {
//       lat: 41.38623,
//       lng: 2.17498
//     };
  
//     const map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 13,
//       center: ironhackBCN
//     });
//   });
  


// // public/javascripts/main.js

// function getNests() {
//   axios
//     .get('nests/api')
//     .then(response => {
//       placeNests(response.data.nests);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }


// // render the markers from the main.js file:

// // public/javascripts/main.js

// function placeNests(nests) {
//   for (let nest of nests) {
//     const center = {
//       lat: nest.address.coordinates[1],
//       lng: nest.address.coordinates[0]
//     };
//     const pin = new google.maps.Marker({
//       position: center,
//       map: map,
//       title: nest.name
//     });
//     markers.push(pin);
//   }
// }

// getNests();


