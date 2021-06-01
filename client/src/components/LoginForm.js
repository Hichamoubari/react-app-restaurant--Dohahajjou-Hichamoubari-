//fonction qui connecte le client a son compte 
const LoginForm = ({handleSubmit,email,setEmail,password,setPassword}) => ( 
    <form onSubmit={handleSubmit} className="mt-3">
        <div className="form-group mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} />
        </div>

        <div className="form-group mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) =>setPassword(e.target.value)} />
        </div>
        <button disabled={!email || !password} type="submit" className="btn btn-dark btn-lg btn-block">submit</button>{" "}
</form>

)


export default LoginForm