from flask import Flask, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)


@app.route("/get_parks", methods=["GET"])
def get_parks():
    try:
        data_path = os.path.join(
            os.path.dirname(__file__), "..", "data", "london_parks_osm_raw.json"
        )
        with open(data_path, "r") as f:
            data = json.load(f)

        # Extract park names and coordinates
        parks = []
        for element in data.get("elements", []):
            if (
                "tags" in element
                and "name" in element["tags"]
                and "geometry" in element
            ):
                parks.append(
                    {
                        "name": element["tags"]["name"],
                        "coordinates": [
                            (pt["lat"], pt["lon"]) for pt in element["geometry"]
                        ],
                    }
                )

        return jsonify(parks)

    except FileNotFoundError:
        return jsonify({"error": "The park data file was not found."})
    except json.JSONDecodeError:
        return jsonify({"error": "The park data file is not valid JSON."})
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == "__main__":
    app.run(debug=True)
