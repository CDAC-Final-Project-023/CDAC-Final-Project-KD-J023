import "./Tourpackage.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../services/config";
import Loading from "./Loading";
import DefaultScene from "../images/DefaultScene.png"


function Tourpackage() {
  const [packages, setPackages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        // Fetch regions from the backend
        const regionsResponse = await fetch(`${config.serverUrl}/region`);
    
        if (!regionsResponse.ok) throw new Error("Failed to fetch Regions");
        const regions = await regionsResponse.json();

        const regionIds = regions.map((region) => region.id).join(",");
        const toursResponse = await fetch(
          `${config.serverUrl}/tours/regions?regionIds=${regionIds}`
        );
        if (!toursResponse.ok) throw new Error("Failed to fetch tours");
        const data = await toursResponse.json();

        
        const formattedData = data.reduce((acc, tourPackage) => {
          const region = regions.find(
            (reg) => reg.id === tourPackage.region?.id
          );
          const zone = region ? region.name : "Unknown";
          if (!acc[zone]) acc[zone] = [];
          
          let photoUrl;
          if (tourPackage.photoPath !== "null") {
            photoUrl = `${config.serverUrl}/uploads/${tourPackage.photoPath}`;
          } else {
            photoUrl = DefaultScene;
          }

          acc[zone].push({
            ...tourPackage,
            photoUrl: photoUrl, 
          });

          return acc;
        }, {});

        setPackages(formattedData);
      } catch (err) {
        setError("Failed to load tour packages. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getTours();
  }, []);

  if (loading) return <Loading />; 
  if (error) return <div>{error}</div>;

  return (
    <div className="tourpackage-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>Tour Packages by Region</h1>
        <div className="regions">
          {Object.entries(packages).map(([zone, packageList]) => (
            <Region key={zone} name={zone} packages={packageList} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function Region({ name, packages }) {
  return (
    <div className="region">
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)} Region</h2>
      <div className="package-list">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>
    </div>
  );
}

function PackageCard({ package: { id, title, description, photoUrl, price } }) {
  return (
    // Wrap the entire card with Link and apply a custom class
    <Link to={`/tour-details/${id}`} className="package-card-link">
      <div className="package-card">
        <img
          src={photoUrl || DefaultScene}
          alt={title}
          className="package-image"
        />
        <div className="package-details">
          <h3>{title}</h3>
          <p>{description}</p>
          <h4>Price: ₹{price}</h4> 
        </div>
      </div>
    </Link>
  );
}

export default Tourpackage;
