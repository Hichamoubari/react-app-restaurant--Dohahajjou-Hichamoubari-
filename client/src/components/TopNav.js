//import { Link } from 'react-router-dom'
import React  from 'react'
import { Navbar,Nav , Container ,Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector , useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

const TopNav = () => {
   const { auth } = useSelector((state) => ({...state}));
   const dispatch = useDispatch();
   const history = useHistory();


   const logout = () => {
      dispatch({
         type: "LOGOUT",
         payload: null,
      });
      window.localStorage.removeItem("auth");
      history.push("/login");
   };
   
   return( 

     // le navbar de l'application 
      <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
               <Container>
                  <LinkContainer to='#'>
                     <Navbar.Brand>BookRest
                     </Navbar.Brand>
                  </LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                           <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="mr-auto">
                                    <LinkContainer to="/">
                                       <Nav.Link><i className="fas fa-home"></i> Home</Nav.Link>
                                    </LinkContainer>
                                    {auth !==null && (
                                           <LinkContainer to="/dashboard">
                                             <Nav.Link><i className="fas fa-dashboard"></i> Dashboard</Nav.Link>
                                          </LinkContainer>
                                    )}
                                    {auth !==null &&  <LinkContainer to="#"><Nav.Link onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</Nav.Link></LinkContainer>}
                                    {auth ===null && (
                                       <>
                                           <LinkContainer to="/Login">
                                             <Nav.Link><i className="fas fa-user"></i> Login</Nav.Link>
                                          </LinkContainer>
                                          <LinkContainer to="/Register">
                                             <Nav.Link><i className="fas fa-user-plus"></i> Register</Nav.Link>
                                          </LinkContainer>
                                       </>
                                    )}
                                   { auth !==null && (<LinkContainer to="#">
                                      <Nav.Link><i className="far fa-user"></i> {auth.user.email}</Nav.Link>
                                    </LinkContainer>)
                                    }
                                   
                              </Nav>
                        </Navbar.Collapse>
               </Container>
            </Navbar>
      </header>



          /*  <div className="nav bg-dark d-flex justify-content-between">
                <Link className="nav-link" to="/">
                Home
                </Link>
                <Link className="nav-link" to="/Login">
                Login
                </Link>
                <Link className="nav-link" to="/Register">
                Register
                </Link>
        </div>*/
   )
}

export default TopNav;