import { useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TripCard from "./components/TripCard";

function App() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortDescending, setSortDescending] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trips");
        return res.json();
      })
      .then((data) => {
        setTrips(data.trips);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading trips...</p>;
  if (error)
    return (
      <p className="text-center mt-5 text-danger">Error loading trips 😢</p>
    );

const filteredTrips = trips
  .filter((t) =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) =>
    sortDescending
      ? Number(b.rating) - Number(a.rating)
      : Number(a.rating) - Number(b.rating)
  );

  return (
    <>
      <Header />
      <div className="container my-4">

        <input
          type="text"
          placeholder="Search trips..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-control mb-3"
        />


        <button
          className="btn btn-outline-secondary mb-3"
          onClick={() => setSortDescending(!sortDescending)}
        >
          Sort by rating {sortDescending ? "⬇️" : "⬆️"}
        </button>

        <div className="container">
        <div className="row justify-content-center">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
        </div>

      </div>
      <Footer />
    </>
  );
}

export default App;
