import Restaurant from '../models/restaurant'
import Order from "../models/order";
import fs from 'fs'


export const create = async (req, res) => {
    //   console.log("req.fields", req.fields);
    //   console.log("req.files", req.files);
    try {
      let fields = req.fields;
      let files = req.files;
  
      let restaurant = new Restaurant(fields);
      restaurant.postedBy = req.user._id;

      // handle image
      if (files.image) {
        restaurant.image.data = fs.readFileSync(files.image.path);
        restaurant.image.contentType = files.image.type;
      }
  
      restaurant.save((err, result) => {
        if (err) {
          console.log("saving hotel err => ", err);
          res.status(400).send("Continue saving");
        }
        res.json(result);
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        err: err.message,
      });
    }
  };
  
export const restaurants = async (req, res) => {
  let all = await Restaurant.find({}).limit(24)
  .select("-image.data")
  .populate("postedBy", "_id name")
  .exec();
// console.log(all);
  res.json(all);
}

export const image = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
  if (restaurant && restaurant.image && restaurant.image.data !== null) {
    res.set("Content-Type", restaurant.image.contentType);
    return res.send(restaurant.image.data);
  }
};


export const sellerRestaurants = async (req, res) => {
  let all = await Restaurant.find({ postedBy: req.user._id })
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  console.log(all);
  res.send(all);
};


export const remove = async (req, res) => {
  let removed = await Restaurant.findByIdAndDelete(req.params.restaurantId)
    .select("-image.data")
    .exec();
  res.json(removed);
};


export const read = async (req, res) => {
  let restaurant = await Restaurant.findById(req.params.restaurantId)
    .populate("postedBy", "_id name")
    .select("-image.data")
    .exec();
  console.log("SINGLE HOTEL", restaurant);
  res.json(restaurant);
};




export const update = async (req, res) => {
  try {
    let fields = req.fields;
    let files = req.files;

    let data = { ...fields };

    if (files.image) {
      let image = {};
      image.data = fs.readFileSync(files.image.path);
      image.contentType = files.image.type;

      data.image = image;
    }

    let updated = await Restaurant.findByIdAndUpdate(req.params.restaurantId, data, {
      new: true,
    }).select("-image.data");

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Restaurant update failed. Try again.");
  }
};


export const userRestaurantBookings = async (req, res) => {
  const all = await Order.find({ orderedBy: req.user._id })
    .select("session")
    .populate("restaurant", "-image.data")
    .populate("orderedBy", "_id name")
    .exec();
  res.json(all);
};


export const isAlreadyBooked = async (req, res) => {
  const { restaurantId } = req.params;
  // trouver les commandes de l'utilisateur actuellement connecté
  const userOrders = await Order.find({ orderedBy: req.user._id })
    .select("restaurant")
    .exec();
  // vérifier si l'identifiant du restaurant est trouvé dans le tableau userOrders
  let ids = [];
  for (let i = 0; i < userOrders.length; i++) {
    ids.push(userOrders[i].restaurant.toString());
  }
  res.json({
    ok: ids.includes(restaurantId),
  });
};



export const searchListings = async (req, res) => {
  const { location, date, chair } = req.body;
  // console.log(date);
  let result = await Restaurant.find({location,})
    .select("-image.data")
    .exec();
  // console.log("SEARCH LISTINGS", result);
  res.json(result);
};