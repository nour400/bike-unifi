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
      <div style={{ display: "block", margin: "5px" }}>
        <span>filter reported bike thefts by partial case titles</span>
        <div>
          <input type="text" value={Title} onChange={handleInputChange} />
          <p>Input Value: {Title}</p>
        </div>
        <button onClick={handleClick}>search</button>{" "}
      </div>
    </>
  );
};

export default Filter;
