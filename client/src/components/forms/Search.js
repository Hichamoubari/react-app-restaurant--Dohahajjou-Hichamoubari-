import React, { useState } from "react";
import { DatePicker, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import AlgoliaPlaces from "algolia-places-react";
import moment from "moment";
import { useHistory } from "react-router-dom";

// destructure values from ant components
const { Basic } = DatePicker;
const { Option } = Select;

const config= {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
    language: "en",
    //countries: ["ma"],
  };

const Search = () => {
  // state
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [chair, setChair] = useState("");
  // route
  const history = useHistory();

  const handleSubmit = () => {
    history.push(`/search-result?location=${location}&date=${date}&chair=${chair}`);
  };

  return (
    <div className="d-flex pb-4" style={{margin: 'auto', width: '50%', padding: '10px'}}>
      <div className="w-100">
        <AlgoliaPlaces
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion.value)}
          style={{ height: "50px" }}
        />
        </div>
        <DatePicker
        onChange={(value, dateString) => setDate(dateString)}
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
        className="w-90"
       />
       <Select
        onChange={(value) => setChair(value)}
        className="w-90"
        size="large"
        placeholder="Number of people"
      >
        <Option key={1}>{1}</Option>
        <Option key={2}>{2}</Option>
        <Option key={3}>{3}</Option>
        <Option key={4}>{4}</Option>
      </Select>

      <SearchOutlined
        onClick={handleSubmit}
        className="btn bg-dark p-3 btn-square text-white"
      />
      </div>

  );
};

export default Search;
