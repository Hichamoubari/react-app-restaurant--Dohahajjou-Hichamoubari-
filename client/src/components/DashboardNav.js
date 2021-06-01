import { Link } from 'react-router-dom'

//fonction qui affiche les restaurants ajouter et reserver par l'admin et le client   
const  DashboardNav = () => {
    const  active = window.location.pathname;
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item">
                <Link className={`nav-link p-3 m-2 mb-2  ${active==="/dashboard" && "active" && " bg-danger text-white"}`} to="/dashboard"> Your reservation </Link>
            </li>
            <li className="nav-item">
                <Link className={`nav-link p-3 m-2 mb-2  ${active==="/dashboard/seller" && "active" && "bg-danger text-white"}`} to="/dashboard/seller"> Your resturants </Link>
            </li>
        </ul>
    )
}

export default DashboardNav;