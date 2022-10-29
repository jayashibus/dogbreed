import React from "react";

export default function breedCard({ breed, history }) {
  console.log("Shibu", breed.name);

  const title = breed.name;
  //   breed.name.substring(0, 30) + (breed.name.length > 30 ? "..." : "");
  // const description =
  //   breed.temperament.substring(0, 100) +
  //   (breed.temperament.length > 100 ? "..." : "");

  const showBreedDetails = () => {
    console.log("show breed details");
  };
  return (
    <div className="card" onClick={showBreedDetails}>
      <img
        className="card--image"
        src="https://cdn2.thedogapi.com/images/Sk7Qbg9E7_1280.jpg"
        alt={breed.name}
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
