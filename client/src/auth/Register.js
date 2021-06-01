import { useState } from 'react'
import RegisterForm  from '../components/registerForm'
import axios from 'axios'
import { toast } from 'react-toastify';
import { register } from '../actions/auth';

const Register = ({history}) => {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{  
    const res = await register({
      name,
      email,
      password,
    });
    console.log("REGISTER USER ==> ", res);
    toast.success("Register success. please login");
    history.push("/login");
  }
    catch (err){
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  }
  //retourne le format du enregistrement name ,email et mdp 
    return (
      <>
      <div className="container-fluid bg-light p-5 text-center">
       <h1 style={{position: 'relative' , borderBottom: '5px solid #dc3545' , display: 'inline' , padding: '0' , margin: '0'}}>Register</h1>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
              <RegisterForm   handleSubmit={handleSubmit} name ={name} setName={setName} email={email} setEmail={setEmail} password={password} setPassword={setPassword} />
          </div>
        </div>
      </div>
      </>
    )
  
  }
  
  export default Register;