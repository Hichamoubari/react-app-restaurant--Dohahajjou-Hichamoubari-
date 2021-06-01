// importation des bibiotheques utiliser dans le login 
import { useState } from 'react'
import { toast } from 'react-toastify';
import { login } from '../actions/auth';
import LoginForm from '../components/LoginForm'
import { useDispatch } from 'react-redux'
//fonction qui verifie l email et le mdp pour la connexion du client ou du admin 
const Login = ({history}) => {
  const [email , setEmail] = useState('hicham@gmail.com')
  const [password , setPassword] = useState('123456789')
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('SEND LOGIN DATA', {email , password});
     try{
        let res = await login({email, password})

        if (res.data) {
          console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT ===> ");
          //console.log(res.data);
          // save user and token to local storage
          window.localStorage.setItem("auth",JSON.stringify(res.data));
          // save user and token to redux
          dispatch({
            type: "LOGGED_IN_USER",
            payload: res.data,
          });
          history.push("/dashboard");
        }
      } 
     catch (err) {
            console.log(err);
            if(err.response.status === 400) toast.error(err.response.data);
     }
  };
  // retourne le format du enregistrement email et mdp 
    return(
      
      <>
       <div className="container-fluid bg-light p-5 text-center">
       <h1 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>Login</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <LoginForm handleSubmit={handleSubmit} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
          </div>
        </div>
      </div>

      </>
    )
  
  }
  
  export default Login;