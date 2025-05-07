import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';

function App() {
  useEffect(() => {
    const mapElement = document.getElementById('map');
    
    // Prevent re-initialization of the map
    if (mapElement._leaflet_id) return;
  
    const map = L.map('map').setView([51.5074, -0.1278], 11);
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  
    fetch('http://127.0.0.1:5000/get_parks')
      .then(res => res.json())
      .then(parks => {
        parks.forEach(park => {
          const latlngs = park.coordinates.map(coord => [coord[0], coord[1]]);
          L.polygon(latlngs, { color: 'green' }).addTo(map).bindPopup(park.name);
        });
      })
      .catch(err => console.error(err));
  }, []);
  

  return (
    <div>
      <h1>London Parks</h1>
      <div id="map"></div>
    </div>
  );
}

export default App;
