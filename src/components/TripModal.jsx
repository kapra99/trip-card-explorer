import React from "react";

function TripModal({ trip, show, onClose }) {
  const placeholder = "/elementor-placeholder-image.png";
  let stars = [];
  for (let i = 0; i < 5; i++) {
    if (i < trip.rating) {
      stars.push(<span key={i}>★</span>);
    } else {
      stars.push(<span key={i}>☆</span>);
    }
  }

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{trip.name}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <img
              src={trip.image || placeholder}
              alt={trip.name}
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholder;
              }}
            />
            <p className="mt-3">{trip.long_description}</p>
            Rating:
            <div className="text-warning mb-3" style={{ fontSize: "2rem" }}>
              {stars}
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TripModal;
