window.addEventListener('load', () => {
    const ironhackBCN = {
      lat: 41.38623,
      lng: 2.17498
    };
  
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: ironhackBCN
    });
  });
  


// public/javascripts/main.js

function getRestaurants() {
  axios
    .get('/restaurants/api')
    .then(response => {
      placeRestaurants(response.data.restaurants);
    })
    .catch(error => {
      console.log(error);
    });
}


// render the markers from the main.js file:

// public/javascripts/main.js

function placeRestaurants(restaurants) {
  for (let restaurant of restaurants) {
    const center = {
      lat: restaurant.location.coordinates[1],
      lng: restaurant.location.coordinates[0]
    };
    const pin = new google.maps.Marker({
      position: center,
      map: map,
      title: restaurant.name
    });
    markers.push(pin);
  }
}

getRestaurants();


