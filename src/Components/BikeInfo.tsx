import React from "react";
import { Bike } from "./BikeList";

const BikeInfo: React.FC<{ bike: Bike }> = ({ bike }) => {
  return (
    <div>
      {bike.date_stolen}
      {bike.description}
      {bike.frame_colors}
      {bike.frame_model}
      {bike.id}
      {bike.is_stock_img}
      {bike.large_img}
      {bike.location_found}
      {bike.manufacturer_name}
      {bike.external_id}
      {bike.registry_name}
      {bike.registry_url}
      {bike.serial}
      {bike.status}
    </div>
  );
};

export default BikeInfo;
