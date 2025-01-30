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
        // Fetch categories from the backend
        const categoriesResponse = await fetch(
          "http://localhost:8080/categories"
        );

        if (!categoriesResponse.ok)
          throw new Error("Failed to fetch categories");
        const categories = await categoriesResponse.json();

        // Construct the query string with category IDs as a comma-separated string
        const categoryIds = categories.map((category) => category.id).join(",");
        const toursResponse = await fetch(
          `http://localhost:8080/tours/categories?categoryIds=${categoryIds}`
        );
        if (!toursResponse.ok) throw new Error("Failed to fetch tours");
        const data = await toursResponse.json();
       
        

          
        // Ensure the data is structured correctly and add default image URL
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

        setPackages(formattedData); // Store fetched data in state
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

function PackageCard({ package: { id, title, description, photoUrl } }) {
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
        </div>
      </div>
    </Link>
  );
}

export default Tourpackage;
