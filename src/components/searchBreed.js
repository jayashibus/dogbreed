import React, { useState } from "react";
import BreedCard from "./breedCard";

export default function SearchBreed() {
  const [breeds, setBreeds] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldName, setFieldName] = useState("name");
  const [order, setOrder] = useState("asc");

  const onKeyChange = async (e) => {
    setLoading(true);
    e.preventDefault();
    const query = e.target.value;

    if (query) {
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
      } catch (err) {
        setError("Failed to fetch breeds");
        setBreeds([]);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      setError("Please enter keyword to search");
    }
  };

  const debounce = (func, timeout = 1000) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const onChangeValue = (e) => {
    e.preventDefault();
    setFieldName(e.target.value);
    arraySortOrder(order, e.target.value);
  };

  const onChangeSort = (e) => {
    e.preventDefault();
    setOrder(e.target.value);
    arraySortOrder(e.target.value, fieldName);
  };

  const arraySortOrder = (sort, fieldName) => {
    if (sort === "asc") {
      //For Ascending
      breeds.sort((a, b) => (a[fieldName] > b[fieldName] ? 1 : -1));
    } else {
      //For Descending
      breeds.sort((a, b) => (a[fieldName] < b[fieldName] ? 1 : -1));
    }

    setBreeds([...breeds]);
  };

  return (
    <div>
      <form className="form">
        <label htmlFor="query" className="label">
          Dog breed name
        </label>
        <input
          type="text"
          name="query"
          className="input"
          onKeyUp={debounce(onKeyChange)}
          placeholder="i.e. Airedale Terrier"
        />

        <select onChange={onChangeValue}>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="life_span">Lifespan</option>
        </select>

        <select onChange={onChangeSort}>
          <option value="asc">ASC</option>
          <option value="desc">DESC</option>
        </select>
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
