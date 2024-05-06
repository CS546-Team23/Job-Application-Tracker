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
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Function to create colored icons
    function coloredIcon(color) {
        return new L.Icon({
            iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-' + color + '.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });
    }

    // Add markers for each company location
    Object.keys(data).forEach(function(company) {
        var marker = L.marker([data[company].lat, data[company].lng], { icon: coloredIcon(data[company].color) }).addTo(map);
        marker.bindPopup(company + '<br>Stage: ' + data[company].stage);
    });
});
