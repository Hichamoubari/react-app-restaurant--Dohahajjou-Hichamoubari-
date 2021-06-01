import { useState, useEffect } from "react";
import { allRestaurants } from "../actions/restaurant";
import SmallCard from '../components/cards/SmallCard'
import Search from "../components/forms/Search";
import Carousel from 'react-bootstrap/Carousel'
import Image1 from '../image/image-1.jpg'
import Image2 from '../image/image-2.jpg'
import Image3 from '../image/image-3.jpg'
import Image4 from '../image/image-4.jpg'
import Image5 from '../image/image-5.jpg'
import Image6 from '../image/image-6.jpg'



const Home = () => {

  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    loadAllRestaurants();
  }, []);

  const loadAllRestaurants = async () => {
    let res = await allRestaurants();
    setRestaurants(res.data);
  };
  //permet d'affiche tout les restaurants de chaque admin
  return(
    <>
    <div className="container-fluid bg-light" style={{margin: 'auto', width: '60%', height: '25%' ,padding: '10px'}}>
      {/*<h1 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>All Restaurants</h1>*/}
            
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image1}
            style={{ width: '100%', height: '300px'}}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image2}
            style={{ width: '100%', height: '300px'}}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image5}
            style={{ width: '100%', height: '300px'}}
            alt="fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image3}
            style={{ width: '100%', height: '300px'}}
            alt="Third slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image6}
            style={{ width: '100%', height: '300px'}}
            alt="fourth slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block"
            src={Image4}
            style={{ width: '100%', height: '300px'}}
            alt="fourth slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
    <div className="col"> 
        <br />
        <Search />
      </div>
    <div className="container-fluid">
      <br />
     {/* <pre>{JSON.stringify(restaurants, null, 4)}</pre> */} 
      {restaurants.map((h) => (
          <SmallCard key={h._id} h={h}  />
        ))}
    </div>
  </>
  ) 

}

export default Home;