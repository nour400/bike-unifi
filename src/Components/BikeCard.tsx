import React from "react";
import { Bike } from "./BikeList";

const BikeCard: React.FC<{ bike: Bike }> = ({ bike }) => {
  const unixTimestamp = bike.date_stolen;
  const dateObject = new Date(unixTimestamp * 1000);
  const dateString = dateObject.toLocaleString();

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#f9f9f9",
        padding: "20px",
        margin: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <img
        style={{
          width: "150px",
          height: "150px",
          objectFit: "cover",
          borderRadius: "8px",
          marginRight: "20px",
        }}
        src={bike.thumb}
        alt={bike.thumb}
      />

      <div>
        <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{bike.title}</h3>
        <p style={{ fontSize: "16px", marginBottom: "10px" }}>
          {bike.description}
        </p>
        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
          <b>Date of the theft:</b> {dateString}
        </p>
        <p style={{ fontSize: "14px", marginBottom: "5px" }}>
          <b>Location of the theft:</b> {bike.stolen_location}
        </p>
      </div>
    </div>
  );
};

export default BikeCard;
