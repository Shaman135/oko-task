import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";

interface SearchBarProps {
  placeholder: string;
  query?: string;
  onQueryUpdate: (q: string) => void;
}

const SearchBar = (props: SearchBarProps) => {
  const [query, setQuery] = useState(props.query || "");
  const { onQueryUpdate } = props;

  const handleInputChange = (value: string) => {
    setQuery(value);
    onQueryUpdate(value);
  }

  return (
    <Paper
      sx={{
        p: "2px 4px",
        my: "16px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={props.placeholder}
        value={query}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </Paper>
  );
};

export default SearchBar;
