document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data passed from the server
    var mapDataElement = document.getElementById('map');
    let mapData = document.getElementById("data-map-data").innerHTML;
    if(mapData){
        var data = JSON.parse(mapData);
    }

    // Initialize map
    var map = L.map('map').setView([37.8, -96], 4);

    // Add tile layer
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Object to store counts of applications by stage
    var stageCounts = {};

    // Add markers for each city location
    Object.keys(data).forEach(function(company) {
        var city = data[company].city;
        var state = data[company].state;
        var stage = data[company].stage;

        // Count applications by stage for each city
        if (!stageCounts[city]) {
            stageCounts[city] = {};
        }
        if (!stageCounts[city][stage]) {
            stageCounts[city][stage] = 1;
        } else {
            stageCounts[city][stage]++;
        }

        // Create marker for each city
        var marker = L.marker([data[company].lat, data[company].lng]).addTo(map);
        marker.bindPopup(getPopupContent(city, stageCounts[city]));
    });

    // Function to get the content for marker popup
    function getPopupContent(city, counts) {
        var content = '<strong>' + city + '</strong><br>';
        Object.keys(counts).forEach(function(stage) {
            content += stage + ': ' + counts[stage] + '<br>';
        });
        return content;
    }
});
