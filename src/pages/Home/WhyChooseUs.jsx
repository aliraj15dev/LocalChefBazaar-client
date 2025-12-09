import { FaUtensils, FaUserTie, FaShieldAlt, FaTruck } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-7xl mx-auto px-4">


        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary">
            Why Choose LocalChefBazaar?
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We connect you with trusted local chefs to deliver fresh, hygienic,
            and delicious homemade meals right at your doorstep.
          </p>
        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">


          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaUtensils className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fresh Homemade Food</h3>
            <p className="text-sm text-gray-600">
              Every meal is freshly prepared by verified home chefs with quality ingredients.
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaUserTie className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Verified Local Chefs</h3>
            <p className="text-sm text-gray-600">
              All chefs are approved by admin to ensure trust, quality, and safety.
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaShieldAlt className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              Your online payments are fully secured with Stripe payment system.
            </p>
          </div>


          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center">
            <FaTruck className="text-4xl text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
            <p className="text-sm text-gray-600">
              Enjoy quick delivery with real-time order status tracking.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
