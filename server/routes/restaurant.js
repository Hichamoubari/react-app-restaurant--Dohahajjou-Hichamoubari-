import express from 'express'
import formidable from 'express-formidable'

const router = express.Router();


//middleware
import { requireSignin , restaurantOwner} from '../middlewares';

import { create , restaurants , image ,sellerRestaurants , remove, read, update, userRestaurantBookings,isAlreadyBooked,searchListings,} from '../controllers/restaurant'
//créez un point de terminaison et assurez-vous que le message n'est pas reçu car nous réenregistrerons les requêtes et les ressources de l'extérieur
router.post("/create-restaurant", requireSignin, formidable(), create);
router.get("/restaurants" , restaurants);
router.get("/restaurant/image/:restaurantId", image);
router.get("/seller-restaurants", requireSignin, sellerRestaurants);
router.delete("/delete-restaurant/:restaurantId", requireSignin, restaurantOwner, remove);
router.get("/restaurant/:restaurantId", read);
router.put(
    "/update-restaurant/:restaurantId",
    requireSignin,
    restaurantOwner,
    formidable(),
    update
  );

// orders
router.get("/user-restaurant-bookings", requireSignin, userRestaurantBookings);
router.get("/is-already-booked/:restaurantId", requireSignin, isAlreadyBooked);
router.post("/search-listings", searchListings);


module.exports = router;