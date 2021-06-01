import { useState } from "react";
import { currencyFormatter } from '../../actions/stripe'
import { useHistory, Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import OrderModal from "../modals/OrderModal";


// carte permet l'affichage des restaurants disponible 
const BookingCard = ({ restaurant, session, orderedBy }) => { 
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

return (
    <>
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          {restaurant.image && restaurant.image.contentType ? (
              <img
                src={`${process.env.REACT_APP_API}/restaurant/image/${restaurant._id}`}
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
                {restaurant.title}{" "}
                <span className="float-right text-danger">
                  {currencyFormatter({   
                    amount: restaurant.price*100,
                    currency: "usd", 
                  })}
                </span>{" "}
              </h3>
              <p className="alert alert-info bg-dark text-white">{restaurant.location}</p>
              <p className="card-text">{`${restaurant.content.substring(0, 200)}...`}</p>
              <p className="card-text">Number of chairs : {restaurant.chair}</p>
              <p className="card-text">Date of Reservation Available From : {new Date(restaurant.dateofRes).toLocaleDateString()}</p>
              
              {showModal && (
                <OrderModal
                  session={session}
                  orderedBy={orderedBy}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              )}

              <div className="d-flex justify-content-between h4">
                <button
                  onClick={() => setShowModal(!showModal)}
                  className="btn bg-danger text-white"
                >
                  Show Payment info
                </button>
              </div>

            </div>
        </div>
      </div>
    </div>
  </>
)
};
export default BookingCard;
