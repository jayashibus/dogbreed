import React, { useState } from "react";
import loader from "./../loading.gif";
import noImage from "./../no-image.png";

export default function BreedCard({ breed, history }) {
  const title = breed.name;
  const [imgSrc, setSrc] = useState(loader);

  const showBreedDetails = () => {
    console.log("show breed details");
  };

  const onLoadImage = async (event) => {
    event.preventDefault();

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "x-api-key":
          "live_5v3MiqnkHRhfk5VDdCO7cIq8wy818eEYchniKplOXWeNoFc62s3z3dBLCcGvJNJB",
      },
    };

    const id = event.target.getAttribute("data-id");
    console.log(id);
    if (id) {
      const url = `https://api.thedogapi.com/v1/images/${id}`;
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setSrc(data.url);
      } catch (err) {
        // setError("Failed to fetch breeds");
        // setBreeds([]);
      } finally {
        // setLoading(false);
      }
    } else {
      setSrc(noImage);
    }
  };

  return (
    <div className="card" onClick={showBreedDetails}>
      <img
        className="card--image"
        src={imgSrc}
        alt={breed.name}
        data-id={breed.reference_image_id}
        onLoad={onLoadImage}
      />
      <div className="card--content">
        <h3 className="card--title">{title}</h3>
        <small>Life Span: {breed.life_span}</small> |
        <small>Origin: {breed.origin}</small> |
        <small>Weight: {breed.weight.imperial}</small>
        <p className="card--desc">{breed.temperament}</p>
      </div>
    </div>
  );
}
