import { Route , Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
// c'est une fonction qui permet de faire la difference entre les pages privee et public
const PrivateRoute = ({...rest }) => {

    const  {auth} = useSelector((state) => ({...state}));
    return auth && auth.token ? <Route {...rest} /> : <Redirect to="/login" />;
}
export default PrivateRoute;