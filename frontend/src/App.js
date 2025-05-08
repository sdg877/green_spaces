import React, { useState, useEffect } from "react";
import ParkMap from "./ParkMap";
import "./App.css";

function App() {
  const [parks, setParks] = useState([]);
  const [filteredParks, setFilteredParks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
    const filtered = parks.filter((park) =>
      park.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredParks(filtered);
  }, [searchTerm, parks]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
      <ParkMap parks={filteredParks} />
      <ul>
        {filteredParks.map((park) => (
          <li key={park.id}>{park.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
