import "./Tourpackage.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/BetaNav";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { config } from "../services/config";

function Tourpackage() {
  const [packages, setPackages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTours = async () => {
      try {
        // Fetch categories from the backend
        const categoriesResponse = await fetch(
          `${config.serverUrl}/categories`
        );

        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");
        const categories = await categoriesResponse.json();

        
        const categoryIds = categories.map((category) => category.id).join(",");
        const toursResponse = await fetch(
          `${config.serverUrl}/tours/categories?categoryIds=${categoryIds}`
        );
        if (!toursResponse.ok) throw new Error("Failed to fetch tours");
        const data = await toursResponse.json();
       
        

          
       
        const formattedData = data.reduce((acc, tourPackage) => {
          const category = categories.find(cat => cat.id === tourPackage.category?.id);
          const region = category ? category.name : "Unknown";
          if (!acc[region]) acc[region] = [];
          acc[region].push({
            ...tourPackage,
            photoUrl: tourPackage.photoPath || "/default-image.jpg",
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="tourpackage-container">
      <Navbar />
      <div className="content-wrapper">
        <h1>Tour Packages by Region</h1>
        <div className="categories">
          {Object.entries(packages).map(([region, packageList]) => (
            <Category key={region} name={region} packages={packageList} />
          ))}
        </div>
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

function PackageCard({ package: { id, title, description, photoUrl, price } }) {
  return (
    // Wrap the entire card with Link and apply a custom class
    <Link to={`/tour-details/${id}`} className="package-card-link">
      <div className="package-card">
        <img
          src={photoUrl || "/default-image.jpg"}
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
