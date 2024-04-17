import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface PaginationProps {
  count: number;
  perpage: number;
  updateParentState(page: number): any;
}

const PaginationBar: React.FC<PaginationProps> = ({
  count,
  perpage,
  updateParentState,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    updateParentState(value);
  };
  const totalPages = Math.ceil(count / perpage);

  return (
    <>
      <Stack spacing={20}>
        <Pagination count={5} variant="outlined" onChange={handleChange} />
      </Stack>
    </>
  );
};

export default PaginationBar;
