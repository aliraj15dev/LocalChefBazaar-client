import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get("/orders")
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Daily meals fetch error:", err);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">📦 My Orders {orders.length}</h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {orders.map(order => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-lg p-5 space-y-2 border"
            >
              <h3 className="text-xl font-bold">{order.mealName}</h3>
              <p>🍴 Food ID: {order.foodId}</p>
              <p>👨‍🍳 Chef ID: {order.chefId}</p>
              <p>📧 User: {order.userEmail}</p>
              <p>🏠 Address: {order.userAddress}</p>

              <p>💰 Price: ৳{order.price}</p>
              <p>🔢 Quantity: {order.quantity}</p>
              <p className="font-bold text-green-600">
                Total: ৳{order.price * order.quantity}
              </p>

              <p>
                📌 Status:
                <span className="ml-2 badge badge-warning">
                  {order.orderStatus}
                </span>
              </p>

              <p className="text-sm text-gray-500">
                🕒 {new Date(order.orderTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
