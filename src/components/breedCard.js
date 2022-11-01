import React, { useState } from "react";
import loader from "./../loading.gif";
import noImage from "./../no-image.png";

export default function BreedCard({ breed, history }) {
  const title = breed.name;
  const [imgSrc, setSrc] = useState(loader);

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
    if (id) {
      const url = `https://api.thedogapi.com/v1/images/${id}`;
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        setSrc(data.url);
      } catch (err) {
        setSrc(noImage);
      }
    } else {
      setSrc(noImage);
    }
  };

  return (
    <div className="card" data-testid="data-card">
      <img
        className="card--image"
        src={imgSrc}
        alt={breed.name}
        data-id={breed.reference_image_id}
        onLoad={onLoadImage}
      />
      <div className="card--content">
        <h3 className="card--title">{title}</h3>
        <small>Life Span: {breed.life_span}</small> <br></br>
        <small>Height: {breed.height.imperial}</small>
        <p className="card--desc">{breed.temperament}</p>
      </div>
    </div>
  );
}
