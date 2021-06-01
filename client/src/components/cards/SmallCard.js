import { currencyFormatter } from '../../actions/stripe'
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

// carte permet l'affichage des restaurants disponible 
const SmallCard = ({ h , handleRestaurantDelete = (f) => f ,
  owner = false,
  showViewMoreButton = true, }) => { 
    const history = useHistory();

return (
    <>
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          {h.image && h.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/restaurant/image/${h._id}`}
                alt="default restaurant image"
                className="card-image img img-fluid"
              />
            ) : (
              <img
                    src="https://via.placeholder.com/900x500.png?text=picture+of+the+restaurant"
                    alt="default hotel image"
                    className="card-image img img-fluid"
             />
            )}
        </div>
        <div className="col-md-8">
            <div className="card-body">
              <h3 className="card-title">
                {h.title}{" "}
                <span className="float-right text-danger">
                  {currencyFormatter({   
                    amount: h.price*100,
                    currency: "usd", 
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info bg-dark text-white">{h.location}</p>
              <p className="card-text">{`${h.content.substring(0, 200)}...`}</p>
              <p className="card-text">Number of chairs : {h.chair}</p>
              <p className="card-text">Date of Reservation Available From : {new Date(h.dateofRes).toLocaleDateString()}</p>
              <div className="d-flex justify-content-between h4">
              {showViewMoreButton && (
              <button
                  onClick={() => history.push(`/restaurant/${h._id}`)}
                  className="btn bg-danger text-white"
                >
                  Show more
              </button>
              )}
              {owner && (
                  <>
                <Link to={`/restaurant/edit/${h._id}`}>
                  <EditOutlined className="text-warning" />
                </Link>
                <DeleteOutlined
                  onClick={() => handleRestaurantDelete(h._id)}
                  className="text-danger"
                />
                </>
                )}
              </div>
            </div>
        </div>
      </div>
    </div>
  </>
)
};
export default SmallCard;
