

window.addEventListener('load', () => {

  axios
  .get(`/nests/api/${nestId}`)
  .then(response => {
    console.log("WE FOUND THE LOCATION!!!", response)
    // placeNests(response.data);

    console.log(response.data);

    const nestLocation = {
      lat: response.data.nests.address.coordinates[0],
      lng: response.data.nests.address.coordinates[1],
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: nestLocation
    });


    const pin = new google.maps.Marker({
      position: nestLocation,
      map: map,
    });


    markers.push(pin);
    
  })
  .catch(error => {
    console.log(error);
  });







  });
  


// public/javascripts/main.js




// render the markers from the main.js file:

// public/javascripts/main.js

/*
function placeNests(nests) {
  for (let nest of nests) {
    console.log('NEST coord', nest.address.coordinates[1], nest.address.coordinates[0])
    // const center = {
    //   lat: nest.address.coordinates[1],
    //   lng: nest.address.coordinates[0]
    // };

    const point = {
      lat: 41.58623,
      lng: 2.27498
    };

    const pin = new google.maps.Marker({
      position: point,
      map: map,
      title: "just a test"
    });
    markers.push(pin);
  }
}
*/




