import React, { useState, useEffect } from "react";
import BikeCard from "./BikeCard";
import PaginationBar from "./PaginationBar";
import LoadingBar from "./LoadingBar";
import Filter from "./Filter";
export interface Bike {
  date_stolen: number;
  description: string | null;
  frame_colors: string[];
  frame_model: string;
  id: number;
  is_stock_img: boolean;
  large_img: string | undefined;
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
  thumb: string | undefined;
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
  const [TitleFilter, setTitleFilter] = useState<string>("");
  const [OnlyMunich, setOnlyMunich] = useState<boolean>(false);

  const getCount = async () => {
    try {
      let endpoint = OnlyMunich
        ? `https://bikeindex.org:443/api/v3/search/count?location=munich&stolenness=proximity&query=${TitleFilter}`
        : `https://bikeindex.org:443/api/v3/search/count?query=${TitleFilter}`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const apiresponse = await response.json();
        OnlyMunich
          ? setCount(apiresponse.proximity)
          : setCount(apiresponse.stolen);

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

      let endpoint = OnlyMunich
        ? `https://bikeindex.org:443/api/v3/search?page=${page}&query=${TitleFilter}&per_page=10&location=munich&stolenness=proximity`
        : `https://bikeindex.org:443/api/v3/search?page=${page}&query=${TitleFilter}&per_page=10`;

      const response = await fetch(endpoint);
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

  const updateFilterState = (newFilter: string) => {
    setTitleFilter(newFilter);
  };
  const handleClick = () => {
    setOnlyMunich(!OnlyMunich);
  };

  let buttonText = OnlyMunich ? "all cases" : "only munich cases";

  useEffect(() => {
    getCount();
    fetchData(CurrentPage);
  }, [TitleFilter, OnlyMunich]);
  useEffect(() => {
    fetchData(CurrentPage);
  }, [CurrentPage]);

  return (
    <>
      <Filter updateParentState={updateFilterState} />
      <button onClick={handleClick}>{buttonText}</button>{" "}
      <h1>current page is {CurrentPage}</h1>
      <h1>the total number of bike theft cases is {count}</h1>
      {loading ? <LoadingBar /> : null}
      {apiResponse.map((bike) => (
        <BikeCard key={bike.id} bike={bike} />
      ))}
      {loading ? <LoadingBar /> : null}
      <PaginationBar
        count={count}
        perpage={10}
        updateParentState={updateCurrentPageState}
      />
    </>
  );
};

export default BikeList;
