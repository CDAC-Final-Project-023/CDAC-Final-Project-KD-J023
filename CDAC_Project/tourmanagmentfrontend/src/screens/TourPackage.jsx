import "./Tourpackage.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tourpackage() {
  const [packages, setPackages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        // REPLACE THIS MOCK DATA WITH API CALL WHEN BACKEND IS READY
        const mockData = {
          "North": [
            {
              id: 1,
              title: "Himalayan Adventure",
              description: "Explore the scenic beauty of the Himalayas.",
              image: "https://www.esikkimtourism.in/wp-content/uploads/2019/05/adventure-tourism-sikkim-tts.jpg"
            },
            {
              id: 2,
              title: "Golden Triangle",
              description: "Visit Delhi, Agra, and Jaipur.",
              image: "/images/golden-triangle.jpg"
            }
          ],
          "South": [
            {
              id: 3,
              title: "Kerala Backwaters",
              description: "Enjoy the peaceful houseboat experience.",
              image: "/images/kerala.jpg"
            }
          ]
        };

        setPackages(mockData); // Using mock data for now

        /*
           UNCOMMENT & USE THIS CODE WHEN BACKEND API IS READY:
          
          const response = await fetch("http://localhost:8080/api/tours"); // Update the API URL
          if (!response.ok) throw new Error("Failed to fetch tours");
          const data = await response.json();
          setPackages(data); // Store fetched data in state
        */

      } catch (err) {
        setError("Failed to load tour packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getTours();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tourpackage-container">
      <Navbar />
      <h1>Tour Packages by Region</h1>
      <div className="categories">
        {Object.entries(packages).map(([region, packageList]) => (
          <Category key={region} name={region} packages={packageList} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

function Category({ name, packages }) {
  return (
    <div className="category">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Region</h2>
      <div className="package-list">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </div>
  );
}
function PackageCard({ package: { id, title, description, image } }) {
  return (
    // Wrap the entire card with Link and apply a custom class
    <Link to={`/tour-details/${id}`} className="package-card-link">
      <div className="package-card">
        <img src={image} alt={title} className="package-image" />
        <div className="package-details">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </Link>
  );
}


export default Tourpackage;
