import React, { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import BikeInfo from "./BikeInfo";
import PaginationBar from "./PaginationBar";
import LoadingBar from "./LoadingBar";
export interface Bike {
  date_stolen: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string | null;
  location_found: string | null;
  manufacturer_name: string;
  external_id: string | null;
  registry_name: string | null;
  registry_url: string | null;
  serial: string;
  status: string;
  stolen: boolean;
  stolen_coordinates: number[] | null;
  stolen_location: string;
  thumb: string | null;
  title: string;
  url: string;
  year: number | null;
  propulsion_type_slug: string;
  cycle_type_slug: string;
}

const BikeList: React.FC = () => {
  const [apiResponse, setApiResponse] = useState<Bike[] | []>([]);
  const [count, setCount] = React.useState<number>(0);
  const [CurrentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);

  const getCount = async () => {
    try {
      const response = await fetch(
        "https://bikeindex.org:443/api/v3/search/count?location=munich&stolenness=proximity"
      );
      if (response.ok) {
        const apiresponse = await response.json();
        setCount(apiresponse.proximity);
        console.log("apiresponse , count", apiresponse, count);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (page: number = 1) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://bikeindex.org:443/api/v3/search?page=${page}&per_page=10&location=munich&stolenness=proximity`
      );
      if (response.ok) {
        const apiresponse = await response.json();
        const bikes: Bike[] = apiresponse.bikes;
        setApiResponse(bikes);
        setLoading(false);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateCurrentPageState = (newPage: number) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    getCount();
    fetchData(CurrentPage);
  }, []);
  useEffect(() => {
    fetchData(CurrentPage);
  }, [CurrentPage]);

  return (
    <>
      <h1>current page is {CurrentPage}</h1>
      <h1>the total number of bike theft cases is {count}</h1>

      {loading ? <LoadingBar /> : null}

      {apiResponse.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
      <PaginationBar
        count={count}
        perpage={10}
        updateParentState={updateCurrentPageState}
      />
    </>
  );
};

export default BikeList;
