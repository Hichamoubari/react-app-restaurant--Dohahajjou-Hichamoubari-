//c'est une fonction qui permet a le client de insert a notre app 
const registerForm = ({handleSubmit, name ,setName ,email,setEmail,password,setPassword}) => ( 
                <form onSubmit={handleSubmit} className="mt-3">
                    <div className="form-group mb-3">
                        <label className="form-label">First name</label>
                        <input type="text" className="form-control" placeholder="First name" value={name} onChange={(e) =>setName(e.target.value)} />
                    </div>
                    <div className="form-group mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} />
                    </div>

                    <div className="form-group mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(e) =>setPassword(e.target.value)} />
                    </div>
                    <button disabled={!name || !email || !password} type="submit" className="btn btn-dark btn-lg btn-block">submit</button>{" "}
            </form>

)


export default registerForm