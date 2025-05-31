import React, { useEffect, useState } from "react";
import "./OrderList.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";
import Loader from "../../../Components/Loader/Loader";
import NotFoundCart from "../../../Components/NotFoundCart/NotFoundCart";
import {
  getUsersOrderDetailsAction,
  updateOrdersAdminAction,
} from "../../../Redux/Actions/orderActions";

const AdminOrderDetails = () => {
  const [oStatus, setOrderStatus] = useState("");

  const dispatch = useDispatch();
  const { orderId } = useParams();

  const {
    loading: orderLoading,
    order,
    error: orderError,
  } = useSelector((state) => state.getOrderDetails);

  const {
    loading: updateLoading,
    success,
    error: updateOrderError,
  } = useSelector((state) => state.adminUpdateOrder);

  const updateOrderStatus = () => {
    if (oStatus !== "") {
      dispatch(updateOrdersAdminAction(orderId, oStatus));
    } else {
      alert("Select Order Status..!!");
    }
  };

  useEffect(() => {
    if (orderId) {
      dispatch(getUsersOrderDetailsAction(orderId));
    }
  }, [orderId, success]);

  useEffect(() => {
    if (success) {
      setOrderStatus("");
    }
  }, [success]);

  return (
    <>
      <Header />
      <Sidebar />
      <div className="dashboard-container">
        {orderLoading ? (
          <Loader LoadingName={"Order Loading"} />
        ) : orderError ? (
          <NotFoundCart msg={"Something Went Wrong"} />
        ) : order && order.orderItems ? (
          <>
            <div className="dashboard-sub-heading">
              <h1>Order Details</h1>
            </div>
            <div className="orders-box">
              <div className="orders-cart-item">
                <div className="orders-cart-item-box">
                  <div className="orders-total-cart-price">
                    <h2>Order Items : {order.orderItems.length}</h2>
                    <h2>Total Amount : ₹ {order.total}</h2>

                    {order.status !== "Delivered" && (
                      <>
                        <select
                          className="update-order-status"
                          value={oStatus}
                          onChange={(e) => setOrderStatus(e.target.value)}
                        >
                          <option value="">Update State</option>
                          {order.status === "Processing" && (
                            <option value="Shipped">Shipped</option>
                          )}
                          {order.status === "Shipped" && (
                            <option value="Delivered">Delivered</option>
                          )}
                        </select>
                        <button
                          className="update-order-status-btn"
                          onClick={updateOrderStatus}
                          disabled={updateLoading}
                        >
                          {updateLoading ? "Updating..." : "Update Status"}
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {order.orderItems.map((item) => (
                  <div className="orders-cart-item-box" key={item._id}>
                    <img src={item.image} alt="Product" />
                    <div>
                      <h2>{item.name}</h2>
                      <h4>Quantity: {item.quantity} KG</h4>
                      <h4>Rate: ₹ {item.rate}/Kg</h4>
                    </div>
                    <div>
                      <h3>₹ {item.rate * item.quantity}</h3>
                      <h3
                        className={
                          order.status === "Processing"
                            ? "order-processing-status"
                            : order.status === "Shipped"
                            ? "order-shipping-status"
                            : "order-delivered-status"
                        }
                      >
                        {order.status}
                      </h3>
                      <span className="order-date">{order.orderDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <NotFoundCart msg={"Sorry, Order Does Not Exist"} />
        )}
      </div>
    </>
  );
};

export default AdminOrderDetails;
