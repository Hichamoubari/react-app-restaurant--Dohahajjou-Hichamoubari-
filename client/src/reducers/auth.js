// 2. create user reducer function
// {type: 'Logged-in' , payload:{name: 'Hicham' role: 'Admin' }}

let useState

if(window.localStorage.getItem("auth")) {
  useState = JSON.parse(window.localStorage.getItem("auth"));
}else {
  useState = null;
}
export const authReducer = (state = useState , action) => {
    switch(action.type){
      case "LOGGED_IN_USER":
        return {...state,...action.payload};
      case "LOGOUT":
        return action.payload;
      default:
        return state;
    }
}