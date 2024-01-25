import React from "react";

export const Star = ({ selected = false, onSelect = (f) => f }) => {
  return (
    <p
      style={{ fontSize: "50px", color: selected ? "red" : "gray" }}
      onClick={onSelect}
    >
      &#9733;
    </p>
  );
};
