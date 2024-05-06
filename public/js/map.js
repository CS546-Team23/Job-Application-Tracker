document.addEventListener("DOMContentLoaded", function() {
    // Retrieve data passed from the server
    var mapDataElement = document.getElementById('map');
    var data = JSON.parse(mapDataElement.getAttribute('data-map-data'));

    // Initialize map
    var map = L.map('map').setView([37.8, -96], 4);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each company location
    Object.keys(data).forEach(function(company) {
        var marker = L.marker([data[company].lat, data[company].lng]).addTo(map);
        marker.bindPopup(company);
    });
});
