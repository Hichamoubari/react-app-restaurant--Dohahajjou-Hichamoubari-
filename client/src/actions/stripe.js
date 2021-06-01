import axios from "axios"
//axios permet de faire la liaison entre un backend et un frontend
export const createConnectAccount = async (token) => await axios.post(`${process.env.REACT_APP_API}/create-connect-account`, {} ,
 {
     headers: {
         Authorization: `Bearer ${token}`,
     },
 }

);

export const getAccountStatus = async (token) => axios.post(`${process.env.REACT_APP_API}/get-account-status`, {},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});


export const getAccountBalance = async (token) => axios.post(`${process.env.REACT_APP_API}/get-account-balance`, {},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const currencyFormatter = (data) => {
    return (data.amount/100).toLocaleString(data.currency ,{
        style: "currency",
        currency: data.currency,
    });
};


export const payoutSetting = async (token) => await axios.post(`${process.env.REACT_APP_API}/payout-setting`, {},{
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

export const getSessionId = async (token, restaurantId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-session-id`,
    {
      restaurantId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const stripeSuccessRequest = async (token, restaurantId) =>
  await axios.post(
    `${process.env.REACT_APP_API}/stripe-success`,
    { restaurantId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
