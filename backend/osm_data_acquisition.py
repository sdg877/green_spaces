import overpass
import json
import os

# Bounding box coordinates for Greater London
bbox = (51.28, -0.489, 51.686, 0.236)

api = overpass.API()

# Ensure the output directory exists
os.makedirs('../data', exist_ok=True)

# Full query with [out:json] manually set
query = f"""
[out:json][timeout:60];
(
  way["leisure"="park"]({bbox[0]:.6f},{bbox[1]:.6f},{bbox[2]:.6f},{bbox[3]:.6f});
  relation["leisure"="park"]({bbox[0]:.6f},{bbox[1]:.6f},{bbox[2]:.6f},{bbox[3]:.6f});
);
out geom;
"""

try:
    response = api.get(query, build=False)
    with open('../data/london_parks_osm_raw.json', 'w') as f:
        json.dump(response, f, indent=4)
    print("Successfully fetched raw park data from OpenStreetMap and saved to data/london_parks_osm_raw.json")
except overpass.errors.OverpassError as e:
    print(f"Overpass API error: {e}")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
