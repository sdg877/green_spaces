const map = L.map('map').setView([51.5074, -0.1278], 11); // London centre

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('http://127.0.0.1:5000/get_parks')
  .then(response => response.json())
  .then(parks => {
    parks.forEach(park => {
      const latlngs = park.coordinates.map(coord => [coord[0], coord[1]]);
      L.polygon(latlngs, { color: 'green' }).addTo(map).bindPopup(park.name);
    });
  })
  .catch(err => console.error('Error loading park data:', err));
