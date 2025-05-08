import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function ParkMap({ parks }) {
  useEffect(() => {
    const map = L.map("map", {
      center: [51.5074, -0.1278],
      zoom: 11,
      maxZoom: 18,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Polygon) {
        map.removeLayer(layer);
      }
    });

    parks.forEach((park) => {
      const latlngs = park.coordinates.map((coord) => [coord[0], coord[1]]);
      L.polygon(latlngs, { color: "green" }).addTo(map).bindPopup(park.name);
    });

    return () => map.remove();
  }, [parks]);

  return <div id="map" style={{ height: "90vh", width: "100%" }}></div>;
}

export default ParkMap;
