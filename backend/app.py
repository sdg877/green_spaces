from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route("/get_parks", methods=["GET"])
def get_parks():
    try:
        data_path = os.path.join(os.path.dirname(__file__), "..", "data", "london_parks_osm_raw.json")
        
        with open(data_path, "r") as f:
            data = json.load(f)

        parks = []
        for element in data.get("elements", []):
            if "tags" in element and "name" in element["tags"] and "geometry" in element:
                if isinstance(element["geometry"], list):
                    coordinates = [
                        (pt["lat"], pt["lon"]) for pt in element["geometry"] if "lat" in pt and "lon" in pt
                    ]
                    if coordinates:
                        parks.append(
                            {
                                "name": element["tags"]["name"],
                                "coordinates": coordinates,
                            }
                        )

        return jsonify(parks)

    except FileNotFoundError:
        return jsonify({"error": "The park data file was not found."}), 404

    except json.JSONDecodeError:
        return jsonify({"error": "The park data file is not valid JSON."}), 400

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


if __name__ == "__main__":
    app.run(debug=True)
