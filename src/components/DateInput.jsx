import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DateInput = ({ value, onChange }) => {
  return (
    <DatePicker
      className="dark:bg-gray-700 dark:border-gray-600  dark:placeholder-gray-400 dark:text-white border-[2px] w-full rounded-md px-3 py-2"
      selected={value}
      onChange={onChange}
      dateFormat="yyyy/MM/dd"
      isClearable
      showYearDropdown
      scrollableYearDropdown
    />
  );
};

export default DateInput;
