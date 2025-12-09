import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import Swal from "sweetalert2";

const OrderPage = () => {
  const location = useLocation();
  const meal = location.state;
  const navigate = useNavigate()

  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const totalPrice = meal.price * quantity;

  const handleConfirmOrder = () => {
    Swal.fire({
      title: "Confirm Order?",
      text: `Your total price is ৳${totalPrice}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Confirm",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderData = {
          foodId: meal._id,
          mealName: meal.foodName,
          price: meal.price,
          quantity,
          chefId: meal.chefId,
          paymentStatus: "Pending",
          userEmail: "user@example.com",
          userAddress: address,
          orderStatus: "pending",
          orderTime: new Date().toISOString(),
        };

        fetch("http://localhost:3000/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData),
        })
          .then(res => res.json())
          .then(() => {
            Swal.fire("Success!", "Order placed successfully!", "success")
             .then(() => navigate("/my-orders"));
            setQuantity(1);
            setAddress("");
          });
      }
    });
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12">
      <div className="bg-white shadow-lg p-6 rounded-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Confirm Your Order</h2>

        <input value={meal.foodName} readOnly className="input input-bordered w-full" />
        <input value={meal.price} readOnly className="input input-bordered w-full" />
        <input value={meal.chefId} readOnly className="input input-bordered w-full" />
        <input value="user@example.com" readOnly className="input input-bordered w-full" />

        <input type="number" min="1" value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="input input-bordered w-full" />

        <textarea className="textarea textarea-bordered w-full"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} />

        <p className="font-bold text-lg">Total: ৳{totalPrice}</p>

        <button onClick={handleConfirmOrder} className="btn btn-primary w-full">
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
