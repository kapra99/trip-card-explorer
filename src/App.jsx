import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import TripCard from './components/TripCard';

function App() {
const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch trips');
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
  if (error) return <p className="text-center mt-5 text-danger">Error loading trips 😢</p>;

  return (
    <>
      <Header />
      <main className="container">
        <div className="row g-4">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App
