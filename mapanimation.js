mapboxgl.accessToken = 'pk.eyJ1IjoicmljaGllYWNlIiwiYSI6ImNsMWY5aGU2czB6NXQzY3A2czh0MHRnb3AifQ.NqQ7hnsPIM6fQNyBZX5tnA'

  let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-71.097589, 42.352653],
        zoom: 13
    });

//the markers global variable
let currentMarkers = [];

async function run(){

    // get bus data    
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
  //An array of array. Show the longitude and latitude of the different bus lines
  busLocalisations = [];

  //go through the data to check each bus longitude and latitude
  for (let element of locations) {
    //This array will host the coordinate for one line and be reseted for each line.
    localisation = [];
    localisation.push(element.attributes.longitude);
    localisation.push(element.attributes.latitude);
    busLocalisations.push(localisation)
  };

  makeMarker(busLocalisations);

  // timer
	setTimeout(run, 15000);
}

// Request bus data from MBTA
async function getBusLocations(){
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json     = await response.json();
	return json.data;
}

//This function create a marker for each item of the busLocalisations array
let makeMarker = (busLocalisations) => {
    //remove previous markers in order to show new ones afterwards :
    if (currentMarkers!==null) {
        for (let i = currentMarkers.length - 1; i >= 0; i--) {
          currentMarkers[i].remove();
        }
    }

console.log(currentMarkers)

    markerNum = []
    for (let i = 0; i < busLocalisations.length; i++) {
      markerNum[i] = new mapboxgl.Marker()
        .setLngLat(busLocalisations[i])
        .addTo(map)
      // by adding each marker to a global variable, you 
      //can then delete then when you refresh the run function.  
      currentMarkers.push(markerNum[i])
    }
  }

if (typeof module !== 'undefined') {
    module.exports = { run };
}