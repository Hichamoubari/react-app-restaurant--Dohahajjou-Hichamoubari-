import AlgoliaPlaces from "algolia-places-react";
import { DatePicker, Select } from "antd";
import moment from "moment";

const { Option } = Select;
//algolia
const config= {
    appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
    language: "en",
    countries: ["ma"],
  };
//fct permet d'appeler la fonction de modifier la carte de restaurants par son admin 
const RestaurantEditForm = ({
  values,
  setValues,
  handleChange,
  handleImageChange,
  handleSubmit,
}) => {
  const { title, content, location, price, chair, dateofRes, } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Content"
          className="form-control m-2"
          value={content}
        />

        {location && location.length && (
          <AlgoliaPlaces
            className="form-control m-2"
            placeholder="Location"
            defaultValue={location}
            options={config}
            onChange={({ suggestion }) =>
              setValues({ ...values, location: suggestion.value })
            }
            style={{ height: "50px" }}
          />
        )}

        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <Select
          onChange={(value) => setValues({ ...values, chair: value })}
          className="w-100 m-2 text-black"
          size="large"
          placeholder="Price"
          value={chair}
        >
          <Option key={1}>{1}</Option>
          <Option key={2}>{2}</Option>
          <Option key={3}>{3}</Option>
          <Option key={4}>{4}</Option>
        </Select>
      </div>

      {dateofRes && (
        <DatePicker defaultValue={moment(dateofRes, "YYYY-MM-DD")} placeholder="From date" className="form-control m-2"
         onChange={(date, dateString) => setValues({...values, dateofRes: dateString}) } 
         disabledDate={(current) => current && current.valueOf() < moment().subtract(1, "days")}
         />

      )}

      <button className="btn bg-danger text-white m-2">Save</button>
    </form>
  );
};

export default RestaurantEditForm;
