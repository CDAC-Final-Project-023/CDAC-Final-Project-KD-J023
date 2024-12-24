import React,{ useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Spinner from "../components/spinner/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [country, setCountry] = useState("");
  const [type, setType] = useState("traveler");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!email || !password || !name || !mobile) {
      toast.error("Missing required fields!");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address!");
      return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
      toast.error("Invalid mobile number!");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const existingUser = await axios.get(`auth/check-email?email=${email}`);
      if (existingUser.data.message === "Email already exists") {
        toast.error("User with this email already exists!");
        setLoading(false);
        return;
      }

      let imageUrl = "";
      if (file) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "upload");

        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dpgelkpd4/image/upload",
          data
        );
        imageUrl = uploadRes.data.url;
      }

      const response = await axios.post("auth/register", {
        name,
        email,
        mobile,
        country,
        type,
        password,
        img: imageUrl,
      });

      toast.success("Successfully registered!");
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <ToastContainer />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: "120px", height: "120px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="file" className="form-label">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file && !file.type.startsWith("image/")) {
                        toast.error("Please select an image file");
                        return;
                      }
                      setFile(file);
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="country" className="form-label">Country</label>
                  <input
                    type="text"
                    className="form-control"
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setconfirmPassword(e.target.value)}
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? <Spinner /> : "Sign Up"}
                  </button>
                </div>
              </form>
              <div className="mt-3 text-center">
                <p>
                  Already a member? <Link to="/login">Sign In</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
