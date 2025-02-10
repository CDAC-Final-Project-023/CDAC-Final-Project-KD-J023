import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PurchasePackage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar/BetaNav";
import { config } from "../services/config";

const PurchasePackage = () => {
  const { id } = useParams(); // Get the package ID from the URL
  const [numTourists, setNumTourists] = useState(1);
  const [touristDetails, setTouristDetails] = useState([
    { name: "", age: "", gender: "" },
  ]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photoPath, setPhotoPath] = useState("");
  const [price, setPrice] = useState(0); // Add price state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch package details from the API
    fetch(`${config.serverUrl}/tours/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setPhotoPath(data.photoPath);
        setPrice(data.price); // Set the price from the data
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
      });

    // Check if the user is authenticated
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, [id]);

  const handleAddTourist = () => {
    setNumTourists(numTourists + 1);
    setTouristDetails([
      ...touristDetails,
      { name: "", age: "", gender: "" },
    ]);
  };

  const handleRemoveTourist = () => {
    if (numTourists > 1) {
      setNumTourists(numTourists - 1);
      setTouristDetails(touristDetails.slice(0, -1));
    }
  };

  const handleTouristChange = (index, field, value) => {
    const updatedDetails = [...touristDetails];
    updatedDetails[index][field] = value;
    setTouristDetails(updatedDetails);
  };

  const calculateTotal = () => {
    const taxRate = 0.18;
    const totalPrice = price * numTourists;
    const tax = totalPrice * taxRate;
    return { totalPrice, tax, grandTotal: totalPrice + tax };
  };

  const handleProceedToPay = () => {
    const user = JSON.parse(sessionStorage.getItem("user")); // Parse the user object
    if (!user) {
      toast.error("Please log in first!");
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
      return;
    }
    if (
      touristDetails.some(
        (detail) => !detail.name || !detail.age || !detail.gender
      )
    ) {
      toast.error("Please fill in all tourist details!");
      return;
    }

    const bookingDetails = {
      user: user.id, // Use the parsed user ID
      tour: id,
      count: numTourists,
      baseAmount: price, // Use the fetched price
      tourists: touristDetails,
    };
 

    fetch(`${config.serverUrl}/bookings/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingDetails),
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Proceeding to payment!");
          navigate("/payment-success");
        } else {
          toast.error("Failed to create booking. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating booking:", error);
        toast.error("Failed to create booking. Please try again.");
      });
  };

  const { totalPrice, tax, grandTotal } = calculateTotal();
  const imageUrl = `${config.serverUrl}/uploads/${photoPath}`;

  return (
    <div className="purchase-package-container container">
      <ToastContainer />
      <Navbar />
      {/* Section 1: Package Details */}
      <div className="row">
        <div className="col-12 col-md-7 box bg-light p-3 rounded">
          <div className="image-container">
            <img
              src={imageUrl}
              alt="Package"
              className="img-fluid rounded"
              style={{ maxWidth: "100%", height: "auto", maxHeight: "300px" }}
            />
            <h3 className="mt-3">{title}</h3>
            <p>{description}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-secondary me-2"
                onClick={handleRemoveTourist}>
                -
              </button>
              <span>{numTourists}</span>
              <button
                className="btn btn-secondary ms-2"
                onClick={handleAddTourist}>
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 box bg-light p-3 rounded payment-details  mt-3 mt-md-0">
          <h4>Payment Details</h4>
          <p>Base Price: ₹{totalPrice.toFixed(2)}</p>
          <p>Tax (18%): ₹{tax.toFixed(2)}</p>
          <h5>Total: ₹{grandTotal.toFixed(2)}</h5>
          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleProceedToPay}>
            Proceed to Pay
          </button>
        </div>
      </div>

      {/* Section 2: Tourist Details */}
      <div className="row mt-4">
        <div className="col-12 col-md-7 box bg-light p-3 rounded">
          <h4>Tourist Details</h4>
          {touristDetails.map((detail, index) => (
            <div key={index} className="row mb-3 tourist-details">
              <h5>Tourist {index + 1}</h5>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name (As per Govt. ID)"
                  value={detail.name}
                  onChange={(e) =>
                    handleTouristChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="col-12">
                <input
                  type="number"
                  className="form-control mb-2"
                  placeholder="Age"
                  value={detail.age}
                  onChange={(e) =>
                    handleTouristChange(index, "age", e.target.value)
                  }
                />
              </div>
              <div className="col-12">
                <select
                  className="form-control"
                  value={detail.gender}
                  onChange={(e) =>
                    handleTouristChange(index, "gender", e.target.value)
                  }>
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PurchasePackage;
