import expressJwt from 'express-jwt'
import Restaurant from '../models/restaurant'
//req.user
//Token (JWT) est une norme ouverte (RFC 7519) qui définit un moyen compact
//et autonome de transmettre en toute sécurité des informations entre les parties en tant qu'objet JSON.
// authorisation , echange de l'inof
export const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
});
//permet de donner owner de chaque restaurant
export const restaurantOwner = async (req, res, next) => {
    let restaurant = await Restaurant.findById(req.params.restaurantId).exec();
    let owner = restaurant.postedBy._id.toString() === req.user._id.toString();
    if (!owner) {
      return res.status(403).send("Unauthorized");
    }
    next();
};
  