import { BrowserRouter , Switch , Route} from 'react-router-dom'
import TopNav from './components/TopNav'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute'
//components
import Home from './Reserver/Home'
import Login from './auth/Login'
import Register from './auth/Register'
import Dashboard from './user/Dashboard'
import DashboardSeller from './user/DashboardSeller'
import NewResto from './restaurants/NewResto'
import StripeCallback from './stripe/StripeCallback'
import EditResto from './restaurants/EditResto'
import ViewRestaurant from './restaurants/ViewRestaurant';
import StripeSuccess from "./stripe/StripeSuccess";
import StripeCancel from "./stripe/StripeCancel";
import SearchResult from "./restaurants/SearchResult";



function App() {
  return (
    <BrowserRouter>
    <TopNav />
    <ToastContainer position="top-center" />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <PrivateRoute exact path="/Dashboard/seller" component={DashboardSeller} />
        <PrivateRoute exact path="/restaurants/new" component={NewResto} />
        <PrivateRoute exact path="/stripe/callback" component={StripeCallback} />
        <PrivateRoute exact path="/restaurant/edit/:restaurantId" component={EditResto} />
        <Route exact path="/restaurant/:restaurantId" component={ViewRestaurant} />
        <PrivateRoute exact path="/stripe/success/:restaurantId" component={StripeSuccess} />
        <PrivateRoute exact path="/stripe/cancel" component={StripeCancel} />
        <Route exact path="/search-result" component={SearchResult} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
