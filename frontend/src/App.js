import React, { useState, useEffect } from "react";
import ParkMap from "./ParkMap";
import "./App.css";

function App() {
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/get_parks")
      .then((res) => res.json())
      .then((data) => {
        setParks(data);
        setFilteredParks(data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let filtered = parks;

    if (searchTerm) {
      filtered = filtered.filter((park) =>
        park.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory) {
      filtered = filtered.filter((park) =>
        park.name.toLowerCase().includes(filterCategory.toLowerCase())
      );
    }

    setFilteredParks(filtered);
  }, [searchTerm, parks, filterCategory]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterCategory(e.target.value);
  };

  return (
    <div>
      <h1>London Parks</h1>
      <input
        type="text"
        placeholder="Search for parks"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      <select onChange={handleFilterChange} value={filterCategory}>
        <option value="">Filter by Category</option>
        <option value="common">Common</option>
        <option value="park">Park</option>
        <option value="garden">Garden</option>
      </select>

      <ParkMap parks={filteredParks} />

      <ul>
        {filteredParks.length === 0 ? (
          <li>No parks found</li>
        ) : (
          filteredParks.map((park) => <li key={park.id}>{park.name}</li>)
        )}
      </ul>
    </div>
  );
}

export default App;
