import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./AdminDashboard.css"; // For additional custom styles

const AdminDashboard = () => {
  return (
    <div className="d-flex">
      <aside className="bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
        <div className="text-center mb-4">
          <h4 className="text-uppercase">LOGO</h4>
        </div>
        <nav>
          <ul className="list-unstyled">
            <li className="mb-3">
              <a href="#" className="text-decoration-none text-white">
                <i className="bi bi-house-door me-2"></i>Home
              </a>
            </li>
            <li className="mb-3">
              <span className="d-block fw-bold mb-2">Manage Tours</span>
              <ul className="list-unstyled ps-3">
                <li className="mb-2">
                  <a href="#" className="text-decoration-none text-white">
                    Add Tour Packages
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none text-white">
                    Delete Tour Packages
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    Update Packages
                  </a>
                </li>
              </ul>
            </li>
            <li className="mb-3">
              <span className="d-block fw-bold mb-2">Manage Users</span>
              <ul className="list-unstyled ps-3">
                <li className="mb-2">
                  <a href="#" className="text-decoration-none text-white">
                    View Users
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    Block / Unblock Users
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <span className="d-block fw-bold mb-2">View Reports</span>
              <ul className="list-unstyled ps-3">
                <li className="mb-2">
                  <a href="#" className="text-decoration-none text-white">
                    View Rating
                  </a>
                </li>
                <li className="mb-2">
                  <a href="#" className="text-decoration-none text-white">
                    Total Collection
                  </a>
                </li>
                <li>
                  <a href="#" className="text-decoration-none text-white">
                    View Bookings
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-grow-1 p-4 bg-light">
        <header className="d-flex justify-content-between align-items-center mb-4">
          <input
            type="search"
            className="form-control w-50 shadow-sm"
            placeholder="Search..."
          />
          <div className="d-flex align-items-center">
            <button className="btn btn-outline-secondary rounded-circle me-3">
              <i className="bi bi-bell"></i>
            </button>
            <button className="btn btn-outline-secondary rounded-circle">
              <i className="bi bi-person"></i>
            </button>
          </div>
        </header>

        <section className="row mb-4">
          <div className="col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h5 className="fw-bold">New Booking</h5>
              <p className="text-primary fs-3">8,461</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h5 className="fw-bold">New Booking</h5>
              <p className="text-primary fs-3">8,461</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h5 className="fw-bold">Check-in</h5>
              <p className="text-success fs-3">753</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center p-3 shadow-sm">
              <h5 className="fw-bold">Check-out</h5>
              <p className="text-danger fs-3">516</p>
            </div>
          </div>
        </section>

        <section className="mb-4">
          <div className="card p-4 shadow-sm">
            <h5 className="fw-bold">Total Revenue</h5>
            <p className="fs-4 text-success">₹235,455</p>
            <p className="text-muted">
              Target: ₹600,000 | Last Week: ₹200,000 | Last Month: ₹850,000
            </p>
          </div>
        </section>

        <section>
          <h4 className="fw-bold mb-3">Latest Orders</h4>
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Order Status</th>
                  <th>Payment</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#49551</td>
                  <td>15 May 2021</td>
                  <td>Anthony Jensen</td>
                  <td>123 Main Street</td>
                  <td>
                    <span className="badge bg-success">Completed</span>
                  </td>
                  <td>Paid</td>
                  <td>$150</td>
                </tr>
                {/* Add more rows here */}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
