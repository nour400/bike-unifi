import React from "react";
import { Bike } from "./BikeList";

const BikeCard: React.FC<{ bike: Bike }> = ({ bike }) => {
  // Render the data from the API response in your new component
  const dateOfStolen = new Date(bike.date_stolen).toDateString();
  return (
    <>
      <div
        style={{
          gap: "15px",
          margin: "30px",
          padding: "5px",
          display: "flex",
        }}
      >
        <img src={bike.thumb} />
        <span>
          <h3>{bike.title}</h3>
          <p>{bike.description}</p>
          <p>
            <b>Date of the theft:</b> {dateOfStolen}
            {/* <b>Date of the theft:</b> {date} */}
          </p>
          <p>
            <b>Location of the theft :</b> {bike.stolen_location}
          </p>
        </span>
      </div>
    </>
  );
};

export default BikeCard;
