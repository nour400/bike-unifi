import React from "react";
import { Bike } from "./BikeList";
// import Button from "@mui/material/Button";

const BikeCard: React.FC<{ bike: Bike }> = ({ bike }) => {
  // Render the data from the API response in your new component
  return (
    <div>
      <p>
        {bike.id} {bike.frame_model}
      </p>
      {/* <Button variant="contained">Hello world</Button>{" "} */}
    </div>
  );
};

export default BikeCard;
