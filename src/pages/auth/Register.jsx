import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (data) => {
    try {
      setLoading(true);

      const profileImg = data.photourl?.[0];
      if (!profileImg) {
        alert("Please upload a photo");
        return;
      }

      await createUser(data.email, data.password);

      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_PHOTO_KEY
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const photoURL = imgRes.data.data.url;

      const userInfo = {
        email: data.email,
        displayName: data.name,
        photoURL,
      };

      const dbRes = await axiosSecure.post("/users", userInfo);

      if (!dbRes.data.acknowledged) {
        throw new Error("Database insert failed");
      }

      await updateUserProfile({
        displayName: data.name,
        photoURL,
      });

      console.log("✅ User registered successfully");
      navigate(location.state || "/");
    } catch (error) {
      console.error("❌ Registration failed:", error);
      alert("Registration failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-20 card flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div>
          <h2 className="text-4xl text-center font-bold">Create an Account</h2>
          <p className="text-center text-xl">Register with LocalChefBazar</p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-5 card-body"
        >
          <fieldset className="fieldset">
            <label className="label text-black font-bold text-lg">Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input outline-none"
              placeholder="Your Name"
            />
            {errors.name && <p className="text-red-500">Name is Required</p>}

            <label className="label text-black font-bold text-lg">Photo</label>
            <input
              type="file"
              {...register("photourl")}
              className="file-input"
            />

            <label className="label text-black font-bold text-lg">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input outline-none"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">Email is Required</p>}

            <label className="label text-black font-bold text-lg">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
                })}
                className="input outline-none"
                placeholder="Password"
              />
              <button
                onClick={handleShowPassword}
                className="absolute top-2 right-6 text-2xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain Uppercase, Lowercase, Number & Symbol
              </p>
            )}

            <button
              disabled={loading}
              className="btn btn-primary text-black font-bold text-lg mt-4"
            >
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="mt-3 text-xl">
              Already have an account?{" "}
              <Link
                to="/login"
                state={location.state}
                className="text-primary font-bold"
              >
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
