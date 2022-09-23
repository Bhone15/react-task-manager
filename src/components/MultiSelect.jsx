import React from "react";
import Select from "react-select";

const MultiSelect = ({ onChange, options, isMulti }) => {
  const colorStyles = {
    control: (styles) => ({ ...styles, backgroundColor: "#424852" }),
    option: (styles) => {
      return { ...styles, color: "white" };
    },
    menu: (styles) => ({ ...styles, backgroundColor: "#424852" }),
    input: (styles) => ({ ...styles, color: "white" }),
    singleValue: (styles) => ({ ...styles, color: "white" }),
  };

  return (
    <Select
      isMulti={isMulti}
      options={options}
      styles={colorStyles}
      onChange={onChange}
    />
  );
};

export default MultiSelect;
