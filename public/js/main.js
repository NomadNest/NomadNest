

window.addEventListener('load', () => {

  axios
    .get(`/nests/api/${nestId}`)
    .then(response => {
      console.log("WE FOUND THE LOCATION!!!", response)

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




