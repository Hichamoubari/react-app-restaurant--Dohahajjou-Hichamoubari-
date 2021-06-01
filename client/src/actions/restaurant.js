import axios from 'axios'

//axios permet de faire la liaison entre un backend et un frontend 
export const createRestaurant = async (token , data) => await axios.post(`${process.env.REACT_APP_API}/create-restaurant`, data,{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const allRestaurants = async () =>
  await axios.get(`${process.env.REACT_APP_API}/restaurants`);


export const sellerRestaurants = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-restaurants`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const deleteRestaurant = async (token, restaurantId) =>
  await axios.delete(`${process.env.REACT_APP_API}/delete-restaurant/${restaurantId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
});

export const read = async (restaurantId) =>
  await axios.get(`${process.env.REACT_APP_API}/restaurant/${restaurantId}`);


  export const updateRestaurant = async (token, data, restaurantId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-restaurant/${restaurantId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const userRestaurantBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-restaurant-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });


export const isAlreadyBooked = async (token, restaurantId) =>
await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${restaurantId}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export const searchListings = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);