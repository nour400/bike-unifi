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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [titleFilter, setTitleFilter] = useState<string>("");
  const [onlyMunich, setOnlyMunich] = useState<boolean>(false);

  const getCount = async () => {
    try {
      let endpoint = onlyMunich
        ? `https://bikeindex.org:443/api/v3/search/count?location=munich&stolenness=proximity&query=${titleFilter}`
        : `https://bikeindex.org:443/api/v3/search/count?query=${titleFilter}`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const apiresponse = await response.json();
        const totalCount = onlyMunich
          ? apiresponse.proximity
          : apiresponse.stolen;
        setCount(totalCount);
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

      let endpoint = onlyMunich
        ? `https://bikeindex.org:443/api/v3/search?page=${page}&query=${titleFilter}&per_page=10&location=munich&stolenness=proximity`
        : `https://bikeindex.org:443/api/v3/search?page=${page}&query=${titleFilter}&per_page=10`;

      const response = await fetch(endpoint);
      if (response.ok) {
        const apiresponse = await response.json();
        const bikes: Bike[] = apiresponse.bikes;
        setApiResponse(bikes);
        console.log("setApiResponse(bikes)", apiResponse);

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
    setOnlyMunich(!onlyMunich);
    setCurrentPage(1);
  };

  useEffect(() => {
    getCount();
    fetchData(currentPage);
  }, [titleFilter, onlyMunich]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <span style={{ width: "80%" }}>
        <Filter updateParentState={updateFilterState} />
        <button
          onClick={handleClick}
          style={{ margin: "20px 0", background: "black", color: "white" }}
        >
          {onlyMunich ? "View All Cases" : "View Only Munich Cases"}
        </button>
        <h1>Total number of bike theft cases: {count}</h1>
        {loading && <LoadingBar />}
        {apiResponse.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
        {loading && <LoadingBar />}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PaginationBar
            count={count}
            perpage={10}
            updateParentState={updateCurrentPageState}
          />
        </div>
      </span>
    </div>
  );
};

export default BikeList;
