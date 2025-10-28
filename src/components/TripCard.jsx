import { useState } from "react";
import TripModal from "./TripModal";
function TripCard({ trip }) {
  const [showModal, setShowModal] = useState(false);
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < trip.rating) {
      stars.push(<span key={i}>★</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }
  return (
    <div className="mb-3" style={{width: "18rem"}}>
      <div className="card h-100 shadow-sm ">
        <img
          src={trip.image}
          className="card-img-top"
          alt={trip.name}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/elementor-placeholder-image.png";
          }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{trip.name}</h5>
          <p className="card-text flex-grow-1">{trip.description}</p>
          <div className="text-warning mb-3" style={{ fontSize: "2rem" }}>
            {stars}
          </div>

          <button
            className="btn btn-outline-primary mt-auto"
            onClick={() => setShowModal(true)}
          >
            More Info
          </button>
        </div>
      </div>
      <TripModal
        trip={trip}
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}

export default TripCard;
