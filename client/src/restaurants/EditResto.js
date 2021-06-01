import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { DatePicker, Select } from "antd";
import {read , updateRestaurant } from "../actions/restaurant";
import { useSelector } from "react-redux";
import RestaurantEditForm from '../components/forms/RestaurantEditForm'

const { Option } = Select;
// fonction permet de modifier la carte de restaurants par son admin 
const EditResto = ({ match }) => { 

  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: "",
    content: "",
    location: "",
    price: "",
    chair: "",
    dateofRes: "",
  });
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  // destructuring variables from state
  const { title, content, price, chair, dateofRes, location } = values;

  useEffect(() => {
        //console.log(match.params.restaurantId)
        loadSellerRestaurant();
      }, []);
  const loadSellerRestaurant = async () => {
        let res = await read(match.params.restaurantId);
        //console.log(res);
        setValues({ ...values, ...res.data });
        setPreview(`${process.env.REACT_APP_API}/restaurant/image/${res.data._id}`);
}
  const handleSubmit = async (e) => {
    e.preventDefault();

    let restaurantData = new FormData();
    restaurantData.append("title", title);
    restaurantData.append("content", content);
    restaurantData.append("location", location);
    restaurantData.append("price", price);
    image && restaurantData.append("image", image);
    restaurantData.append("dateofRes", dateofRes);
    restaurantData.append("chair", chair);

    try {
      let res = await updateRestaurant(token, restaurantData, match.params.restaurantId);
      console.log("RESTAURANT UPDATE RES", res);
      toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.err);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div className="container-fluid bg-light p-5 text-center">
    <h2 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}} >Edit Restaurant</h2>
  </div>
   <div className="container-fluid">
   <div className="row">
     <div className="col-md-10">
     <br />
            <RestaurantEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
     </div>
     <div className="col-md-2">
       <img
         src={preview}
         alt="preview_image"
         className="img img-fluid m-2"
       />
       <pre>{JSON.stringify(values, null, 4)}</pre>
     </div>
   </div>
 </div>
 </>
  );
};

export default EditResto;
