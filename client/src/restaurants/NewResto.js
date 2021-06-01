import {useState} from 'react'
import { toast } from 'react-toastify'
import AlgoliaPlaces  from 'algolia-places-react'
import {DatePicker , Select} from 'antd'
import moment from 'moment'
import { createRestaurant } from '../actions/restaurant'
import { useSelector} from 'react-redux'

const { Option } = Select;
//algolia
const config= {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_APP_KEY,
  language: "en",
  countries: ["ma"],
};


   
//fonction qui permet d'ajouter un restaurant par admin
const NewResto = () => {
  const {auth} = useSelector((state) => ({...state}));
  const {token} = auth;

  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    price: "",
    chair: "",
    dateofRes: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state

  //const format = 'HH:mm';
  //destructuring variables from state 
  const { title , content ,image ,price ,chair, dateofRes} = values;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
     //console.log(values);
     //console.log(location);

     let restaurantData = new FormData()
     restaurantData.append("title", title);
     restaurantData.append("content", content);
     restaurantData.append("location", location);
     restaurantData.append("price", price);
     image && restaurantData.append("image", image);
     restaurantData.append("chair", chair);
     restaurantData.append("dateofRes", dateofRes);
     console.log([...restaurantData]);

     try{
        let res = await createRestaurant(token , restaurantData);
        console.log("RESTAURANT CREATE RES", res);
        toast.success("New restaurant is posted");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
    } catch(err){
        console.log(err)
        toast.success(err.response.data);
    }
     
  };
  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const restoForm = () => (
    <form onClick={handleSubmit}>
      <div className="form-group">
        {/*  <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>
       */}
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
        <AlgoliaPlaces className="form-control m-2" placeholder="Location" defaultValue={location} options={config} onChange={({suggestion}) => setLocation(suggestion.value)} style={{ height: "50px" }} />
        {/*<input type="number" name="people" onChange={handleChange} placeholder="Number of People" className="form-control m-2" value={people} />*/}
        <Select onChange={(value) => setValues({...values, chair: value})} className="w-100 m-2" size="large" placeholder="Number of chair">
          <Option key={1}>
            {1}
          </Option>
          <Option key={2}>
            {2}
          </Option>
          <Option key={3}>
            {3}
          </Option>
          <Option key={4}>
            {4}
          </Option>
        </Select>
        <DatePicker placeholder="From date" className="form-control m-2" onChange={(date, dateString) => setValues({...values, dateofRes: dateString}) } disabledDate={(current) => current && current.valueOf() < moment().subtract(1, "days")} />
        <input type="number" name="price" onChange={handleChange} placeholder="Price" className="form-control m-2" value={price} />

       </div>
      
      <button className="btn bg-danger text-white m-2">Save</button>
    </form>
   
  )
    return(
      <>
        <div className="container-fluid bg-light p-5 text-center">
          <h2 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>Add Restaurant</h2>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10">
              <br />
              {restoForm()}
            </div>
            <div className="col-md-2">
            <img id="farme"
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
              <pre>{JSON.stringify(values,null ,4)}</pre>
              {JSON.stringify(location)}
            </div>
          </div>
         
        </div>
      </>
    ) 
  
  }
  
  export default NewResto;