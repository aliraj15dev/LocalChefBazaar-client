import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const {signInUser} = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = (data) => {
    console.log("Login", data);
    signInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
        console.log(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="my-20 card flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div>
          <h2 className="text-4xl text-center font-bold">Welcome Back</h2>
          <p className="text-center text-xl">Login with LocalChefBazar</p>
        </div>
        <form onSubmit={handleSubmit(handleLogin)} className="card-body">
          <fieldset className="fieldset">
            {/* Email input */}
            <label className="label text-black font-bold text-lg">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="input outline-none"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}
            {/* Password input */}
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
                className="absolute top-2 right-6 z-11 text-2xl"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is Required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 character
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-500">
                Password must contain a lowerCase, UpperCase & Number
              </p>
            )}
            <Link className="link link-hover">Forgot password?</Link>
            <button className="btn btn-primary  text-black font-bold text-lg mt-4">
              Login
            </button>
            <p className="mt-3 text-xl">
              Don't have any account?{" "}
              <Link
                to="/register"
                state={location.state}
                className="text-primary font-bold"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;
