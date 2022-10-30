import React, { useState } from "react";
import BreedCard from "./breedCard";

export default function SearchBreed() {
  const [query, setQuery] = useState(null);
  const [breeds, setBreeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key":
          "live_5v3MiqnkHRhfk5VDdCO7cIq8wy818eEYchniKplOXWeNoFc62s3z3dBLCcGvJNJB",
      },
    };

    const url = `https://api.thedogapi.com/v1/breeds/search?q=${query}`;
    try {
      const res = await fetch(url, options);
      const data = await res.json();
      setBreeds(data);
      console.log(data);
    } catch (err) {
      setError("Failed to fetch breeds");
      setBreeds([]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="query" className="label">
          Dog breed name
        </label>
        <input
          type="text"
          name="query"
          value={query}
          className="input"
          onChange={(e) => setQuery(e.target.value)}
          placeholder="i.e. Airedale Terrier"
        />
        <button className="button" type="submit">
          Search!
        </button>
      </form>
      {loading && <p className="flash info">Loading...</p>}
      {error && <p className="flash error">{error}</p>}
      {!loading && !error && (
        <div className="card-list">
          {breeds &&
            breeds.map((breed) => <BreedCard breed={breed} key={breed.id} />)}
        </div>
      )}
    </div>
  );
}
