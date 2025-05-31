import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import {
  adminUpdateUserAction,
  clearError,
} from "../../../Redux/Actions/userAction";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    userName = "",
    userEmail = "",
    userRole = "",
    userId = "",
  } = location.state || {};

  const [selectedRole, setSelectedRole] = useState("");

  const { success, loading, message, error } = useSelector(
    (state) => state.adminUpdateUser
  );

  const handleUpdateUserSubmit = (e) => {
    e.preventDefault();
    if (selectedRole === "") {
      alert("Choose Role");
    } else {
      dispatch(adminUpdateUserAction(userId, selectedRole));
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        <div className="dashboard-sub-heading">
          <h1>Update User</h1>
        </div>

        <div className="add-product-form-box">
          <form onSubmit={handleUpdateUserSubmit}>
            <div className="product-name">
              <input type="text" value={userName} placeholder="User Name" readOnly />
            </div>

            <div className="product-name">
              <input type="text" value={userEmail} placeholder="User Email" readOnly />
            </div>

            <div className="product-name">
              <input type="text" value={userRole} placeholder="User Role" readOnly />
            </div>

            <div className="product-category">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                required
              >
                <option value="">Choose Role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>

            {error && (
              <div className="upload-error">
                <h1>{error}</h1>
              </div>
            )}

            {success && (
              <div className="upload-error">
                <h1>{message}</h1>
              </div>
            )}

            <div className="add-product-form-btn">
              <button disabled={loading}>
                {loading ? "Updating..." : "Update Role"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
