import React, { useState } from "react";

interface FilterProps {
  updateParentState(filter: string): any;
}

const Filter: React.FC<FilterProps> = ({ updateParentState }) => {
  const [Title, setTitle] = useState<string>("");

  const handleClick = () => {
    console.log("click !");
    updateParentState(Title);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setTitle(event.target.value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f1f1f1",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "20px" }}
        >
          Filter reported bike thefts
        </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="text"
            value={Title}
            placeholder="Enter partial title"
            onChange={handleInputChange}
            style={{
              padding: "10px",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          />
          <button
            onClick={handleClick}
            style={{
              padding: "10px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search
          </button>
        </div>
        <p style={{ fontSize: "14px", marginTop: "10px" }}></p>
      </div>
    </>
  );
};

export default Filter;
