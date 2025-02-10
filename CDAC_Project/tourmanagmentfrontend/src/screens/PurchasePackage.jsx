import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PurchasePackage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/navbar/BetaNav";

const PurchasePackage = () => {
  const { tourId } = useParams(); // Get tourId from URL
  const navigate = useNavigate();
 

  console.log("Tour ID:", tourId); // Log the tourId to ensure it's being received

  const [numTourists, setNumTourists] = useState(1);
  const [touristDetails, setTouristDetails] = useState([
    { fullName: "", age: "", gender: "" },
  ]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch package details from the API using the tourId from the URL
    fetch(`http://localhost:8080/bookings/purchase-package/${tourId}`)
      .then((response) => response.json())
      .then((data) => {
        setTitle(data.title);
        setDescription(data.description);
        setImageUrl(data.imageUrl);
      })
      .catch((error) => {
        console.error("Error fetching package details:", error);
      });

    // Check if the user is authenticated
    const user = sessionStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, [tourId]); // Make sure to run this effect whenever tourId changes

  const handleAddTourist = () => {
    setNumTourists(numTourists + 1);
    setTouristDetails([
      ...touristDetails,
      { fullName: "", age: "", gender: "" },
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
    const basePrice = 1000; // Example base price per tourist
    const taxRate = 0.18;
    const totalPrice = basePrice * numTourists;
    const tax = totalPrice * taxRate;
    return { totalPrice, tax, grandTotal: totalPrice + tax };
  };

  const handleConfirmDates = () => {
    if (!startDate || !endDate) {
      toast.error("Please select both 'From' and 'To' dates!");
      return;
    }
    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("The 'To' date must be after the 'From' date!");
      return;
    }
    toast.success("Dates Confirmed!");
  };

  const handleProceedToPay = async () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user || !user.token) {
    toast.error("Please log in first!");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
    return;
  }
  console.log("Token:", user.token); 
  
    if (!startDate || !endDate) {
      toast.error("Please select a start and end date!");
      return;
    }
  
    if (new Date(endDate) <= new Date(startDate)) {
      toast.error("The End date must be after the Start date!");
      return;
    }
  
    if (touristDetails.some((detail) => !detail.fullName || !detail.age || !detail.gender)) {
      toast.error("Please fill in all tourist details!");
      return;
    }
  
    // Calculate grand total here
    const { totalPrice, tax, grandTotal } = calculateTotal();
  
    const bookingData = {
      userId: user, // Assuming user ID is stored in sessionStorage
      tourists: touristDetails,
      startDate,
      endDate,
      totalAmount: grandTotal,
    };
   
    //const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8080/bookings/create/${tourId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`, // Assuming the token is stored in the user object
        },
        body: JSON.stringify(bookingData),
      });
    

      if (response.ok) {
        toast.success("Booking successful! Redirecting to payment...");
        setTimeout(() => {
          navigate("/payment-success");
        }, 2000);
      } else {
        toast.error("Booking failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while booking.");
    }
  };
    const { totalPrice, tax, grandTotal } = calculateTotal();

  return (
    <div className="purchase-package-container">
      <ToastContainer />
      <Navbar />
      {/* Section 1: Package Details */}
      <div className="row">
        <div className="col-12 col-md-9 box">
          <div className="image-container">
            <img
              src={imageUrl}
              alt="Package"
              style={{ width: "40rem", height: "20rem" }}
            />
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="d-flex align-items-center">
              <button
                className="btn btn-secondary me-2"
                onClick={handleRemoveTourist}
              >
                -
              </button>
              <span>{numTourists}</span>
              <button
                className="btn btn-secondary ms-2"
                onClick={handleAddTourist}
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-3 box select-dates">
          <h4>Select Dates</h4>
          <label>From</label>
          <input
            type="date"
            className="form-control mb-2"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <label>To</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <button
            className="btn btn-primary mt-3 w-100"
            onClick={handleConfirmDates}
          >
            Confirm
          </button>
        </div>
      </div>

      {/* Section 2: Tourist Details & Payment */}
      <div className="row mt-4">
        <div className="col-12 col-md-9 box">
          <h4>Tourist Details</h4>
          {touristDetails.map((detail, index) => (
            <div key={index} className="row mb-3 tourist-details">
              <h5>Tourist {index + 1}</h5>
              <div className="col-12">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name (As per Govt. ID)"
                  value={detail.fullName}
                  onChange={(e) =>
                    handleTouristChange(index, "fullName", e.target.value)
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
                  }
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          ))}
        </div>

        <div className="col-12 col-md-3 box payment-details">
          <h4>Payment Details</h4>
          <p>Base Price: ₹{totalPrice.toFixed(2)}</p>
          <p>Tax (18%): ₹{tax.toFixed(2)}</p>
          <h5>Total: ₹{grandTotal.toFixed(2)}</h5>
          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleProceedToPay}
          >
            Proceed to Pay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchasePackage;
