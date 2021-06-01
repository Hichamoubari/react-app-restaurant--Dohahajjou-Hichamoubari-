import { useState , useEffect } from 'react'
import DashboardNav from '../components/DashboardNav'
import ConnectNav from '../components/ConnectNav'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HomeOutlined } from '@ant-design/icons'
import { createConnectAccount } from '../actions/stripe'
import { sellerRestaurants , deleteRestaurant} from '../actions/restaurant'
import { toast } from 'react-toastify'
import SmallCard from '../components/cards/SmallCard';


const DashboardSeller = () => {
    const {auth} = useSelector((state) => ({...state}));
    const [restaurants, setRestaurants] = useState([]);
    const [loading , setLoading] = useState(false);
   
    useEffect(() => {
        loadSellersRestaurants();
      }, []);
    
      const loadSellersRestaurants = async () => {
        let { data } = await sellerRestaurants(auth.token);
        setRestaurants(data);
      };
    const handleClick = async () => {
       setLoading(true);
       try{
        let res = await createConnectAccount(auth.token);
        console.log(res);
        window.location.href = res.data;
       }catch (err){
         console.log(err);
         toast.error("Stripe connect failed, Try again.");
         setLoading(false);
       }
    }
    const handleRestaurantDelete = async (restaurantId) => {
      if (!window.confirm("Are you sure?")) return;
      deleteRestaurant(auth.token, restaurantId).then((res) => {
        toast.success("Restaurant Deleted");
        loadSellersRestaurants();
      });
    };
    const Connected = () => (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-10">
               <h2>Your Restaurants</h2>
            </div>
            <div className="col-md-2">
                <Link to="/restaurants/new" className="btn m-2 mb-2 bg-dark text-white">+ Add New</Link>   
            </div>
        </div>
        <div className="row">
        {restaurants.map((h) => (
          <SmallCard
            key={h._id}
            h={h}
            showViewMoreButton={false}
            owner={true}
            handleRestaurantDelete={handleRestaurantDelete}
          />
        ))}
        </div>
        </div>
    )
    const notConnected = () => (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-6 offset-md-3 text-center">
               <div className="p-5 pointer">
                <HomeOutlined className="h1" />
                <p>Setup payouts to post restaurant</p>
                <p className="lead">
                    partners with stripe to transfer earning to your bank account
                </p>
                <button disabled={loading} onClick={handleClick} className="btn bg-danger text-white mb-3">{loading ? 'Processing...' : 'Setup Payouts'}</button>
                <p className="text-muted">
                      <small>
                         you'll be redirected to stripe to complete the onboarding process.        
                      </small>
                </p>
               </div>
            </div>
        </div>
    </div>
    )


    return (
        <>
          <div className="container-fluid bg-light p-5">
              <ConnectNav />
          </div>
          <div className="container-fluid p-4 bg-light">
              <DashboardNav />
          </div>
        { auth && auth.user && auth.user.stripe_seller ? Connected() : notConnected()}
        </>
    )
    //&& auth.user.stripe_seller.charges_enableds
};

export default DashboardSeller;