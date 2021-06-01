import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const { Schema } = mongoose;
//schema du base de donnes (user)
const userShema = new Schema({
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    email: {
        type: String,
        trim: true,
        required: "Email is required",
    },
    name: {
        type: String,
        trim: true,
        required: "Name is required",
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
}, {timestamps: true});

//timestamp for example when create one user in a date in other in defferent date
/*
   while saving user , we need to make sure the password is hashed not plain password 
   hashing should be just in 2 situations 
   first if it is the first time a user is being saved/created
   second when user update the existing password

   so for handling , we can use pre middleware in our shema this function will run each time user is saved/created and also password 
   is updating 
*/
 userShema.pre("save", function(next) {
     let user = this
     // hash password it can only use o 2 situation -> register for the first time or changing the password
     //make sure to use this otherwise each time user.save() is  executed password
     //will get auto updated and you  can't login with original password
     if(user.isModified("password")) {
         return bcrypt.hash(user.password, 12, function (err, hash) {
             if(err) {
                 console.log("BCRYPT HASH ERR : ",err);
                 return next(err);
             }
             user.password = hash;
             return next();
         });
     } else {
         return next();
     }
 });

 userShema.methods.comparePassword = function (password, next) {
     bcrypt.compare(password, this.password, function (err, match) {
        if (err) {
            console.log("COMPARE PASSWORD ERR", err);
            return next(err,  false);
        }
        // if no err, we get null
        console.log("MATCH PASSWORD", match);
        return next(null, match); //true
     })
 }



export default mongoose.model("User",userShema);