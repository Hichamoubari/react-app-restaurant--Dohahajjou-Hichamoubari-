import React, { useState, useEffect } from "react";
import { read, isAlreadyBooked} from "../actions/restaurant";
import { getSessionId } from "../actions/stripe";
import { Link  } from 'react-router-dom'
import { Row , Col , Image , ListGroup ,Card } from 'react-bootstrap'
import moment from 'moment'
import { useSelector } from "react-redux"
import { loadStripe } from "@stripe/stripe-js";


//fonction qui permet d'afficher les details de chaque restaurant
const ViewRestaurant = ({ match , history}) => {
    const [restaurant, setRestaurant] = useState({});
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const [alreadyBooked, setAlreadyBooked] = useState(false);

    const { auth } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadSellerRestaurant();
      }, []);
      useEffect(() => {
        if (auth && auth.token) {
          isAlreadyBooked(auth.token, match.params.restaurantId).then((res) => {
             //console.log(res);
             if (res.data.ok) setAlreadyBooked(true);
          });
        }
      }, []);
    
      const loadSellerRestaurant = async () => {
        let res = await read(match.params.restaurantId);
        // console.log(res);
        setRestaurant(res.data);
        setImage(`${process.env.REACT_APP_API}/restaurant/image/${res.data._id}`);
      };
      const handleClick = async (e) => {
        e.preventDefault();
        if (!auth || !auth.token) {
          history.push("/login");
          return;
        }
        setLoading(true);
        if (!auth) history.push("/login");
        //console.log(auth.token, match.params.restaurantId);
        let res = await getSessionId(auth.token, match.params.restaurantId);
        //console.log("get sessionid resposne", res.data.sessionId);
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
        stripe.redirectToCheckout({
        sessionId: res.data.sessionId,
        }).then((result) => console.log(result));
        
      };
      return ( 
        /*<>
          <div className="container-fluid bg-light p-5 text-center">
            <h1 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>
                {restaurant.title}
            </h1>
          </div>
     <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <br />
            <img src={image} alt={restaurant.title} className="img img-fluid m-2 "  style={{width: '700px'}}/>
          </div>

          <div className="col-md-6">
            <br />
            <b>{restaurant.content}</b>
            <p className="alert alert-info mt-3 bg-dark text-white">${restaurant.price}</p>
            <p>
               <p style={{fontWeight: "bold"}}>Date of Reservation Available From :</p>{" "}
              {moment(new Date(restaurant.dateofRes)).format("MMMM Do YYYY")}
            </p>
            <p style={{fontWeight: "bold"}}>Posted by :</p><i>{restaurant.postedBy && restaurant.postedBy.name}</i>
            <br /> 
            <button onClick={handleClick} className="btn mt-3 bg-danger text-white"  disabled={loading}>
            {loading
                ? "Loading..."
                : auth && auth.token
                ? "Book Now"
                : "Login to Book"}
            </button>
          </div>
        </div>
      </div>
    </>*/
          <div>
                <Link to='/' className='btn btn-dark m-3'>Go Back</Link>
                <Row>
                    <Col md={5}>
                        <Image src={image} alt={restaurant.title} className="img img-fluid m-2 "  style={{width: '700px', marginLeft: '2px'}}  />
                    </Col>
                    <Col md={3}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h3 style={{position: 'relative' , borderBottom: '3px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>{restaurant.title}</h3>
                            </ListGroup.Item>

                            <ListGroup.Item>
                            Date of Reservation Available From : {moment(new Date(restaurant.dateofRes)).format("MMMM Do YYYY")}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Price: ${restaurant.price}
                            </ListGroup.Item>

                            <ListGroup.Item>
                                Description: {restaurant.content}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>
                                        <strong>${restaurant.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Posted By:</Col>
                                        <Col>
                                        {restaurant.postedBy && restaurant.postedBy.name}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <button onClick={handleClick} className='btn bg-danger text-white' disabled={loading || alreadyBooked} type='button'>
                                      {loading
                                                ? "Loading..."
                                                : alreadyBooked
                                                ? "Already Booked"
                                                : auth && auth.token
                                                ? "Book Now"
                                                : "Login to Book"}
                                    </button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
       </div>
      )

}

export default ViewRestaurant;