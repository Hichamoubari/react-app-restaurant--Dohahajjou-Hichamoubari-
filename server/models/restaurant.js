import mongoose from 'mongoose'

const  {Schema} = mongoose
const {ObjectId} = mongoose.Schema
//schema du base de donnes (restaurant)
const restaurantSchema = new Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    content: {
        type: String,
        required: 'Content is required',
        maxlength: 10000,
    },
    location: {
        type: String,
    },
    dateofRes: {
        type: Date,
    },
    chair: {
        type: Number,
    },
    price: {
        type: Number,
        required: 'Price is required',
        time: true,
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
    },
    image:  {
        data: Buffer,
        contentType: String,
    },

}, {timestamps: true});

export default mongoose.model("Restaurant", restaurantSchema);