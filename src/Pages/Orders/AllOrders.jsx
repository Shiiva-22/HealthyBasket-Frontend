import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersOrdersAction } from "../../Redux/Actions/orderActions";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

const AllOrders = () => {
  const dispatch = useDispatch();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { orders, loading: ordersLoading } = useSelector(
    (state) => state.getUserOrders // ✅ Fixed here
  );

  let deliveryOrderCount = 0;
  let shippedOrderCount = 0;

  if (orders) {
    deliveryOrderCount = orders.filter(
      (order) => order.status === "Delivered"
    ).length;
    shippedOrderCount = orders.filter(
      (order) => order.status === "Shipped"
    ).length;
  }

  useEffect(() => {
    if (user && user._id) {
      document.title = `${user.firstName} Orders`;
      dispatch(getUsersOrdersAction(user._id));
    }
  }, [user]);

  return (
    <>
      <Header />
      {ordersLoading || userLoading ? (
        <Loader LoadingName={"Loading Orders"} />
      ) : (
        <div className="orders-container ">
          <h1 className="Heading">
            {user && user.firstName ? user.firstName : "Orders"}{" "}
            <span>All Orders </span>
          </h1>

          <div className="orders-box">
            <div className="orders-cart-item">
              <div className="orders-cart-item-box">
                <div className="orders-total-cart-price">
                  {orders && orders.length === 0 ? (
                    <h2 className="not-place-order">
                      You Have Not Placed Any Orders Yet..!!
                    </h2>
                  ) : (
                    <>
                      <h2>Total Orders : {orders.length} </h2>
                      <h2 className="delivered-order-count">
                        Delivered Orders : {deliveryOrderCount}
                      </h2>
                      <h2 className="shipped-order-count">
                        Shipped Orders : {shippedOrderCount}
                      </h2>
                    </>
                  )}
                </div>
              </div>
              {orders &&
                orders.map((orderInfo) => (
                  <div className="orders-cart-item-box" key={orderInfo._id}>
                    <div>
                      <Link to={`/Order/OrderDetails/${orderInfo._id}`}>
                        <h2 className="get-order-link">Get Order Details</h2>
                      </Link>
                      <h4> Total Items : {orderInfo.orderItems.length} </h4>
                      <h4> Shipping Charge: 0 </h4>
                    </div>
                    <div>
                      <h3>₹ {orderInfo.total}</h3>
                      <h3
                        className={
                          orderInfo.status === "Processing"
                            ? "order-processing-status"
                            : orderInfo.status === "Shipped"
                            ? "order-shipping-status"
                            : "order-delivered-status"
                        }
                      >
                        {orderInfo.status}
                      </h3>
                      <span className="order-date">
                        {orderInfo.orderDate}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllOrders;
