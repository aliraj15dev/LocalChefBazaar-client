import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
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

  const handleRegister = (data) => {
    const profileImg = data.photourl[0];
    console.log(data.photourl)

    createUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
        //* 1. store the image
        const formData = new FormData();
        formData.append("image", profileImg);

        //* 2. sent the image and get the url
        const image_API_URL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_PHOTO_KEY
        }`;

        axios.post(image_API_URL, formData).then((res) => {
          console.log("after image upload", res.data.data.display_url);

          //* update the profile
          const updateProfile = {
            displayName: data.name,
            photoURL: res.data.data.display_url
          };
          updateUserProfile(updateProfile)
            .then(() => {
              console.log("user profile updated", updateProfile);
            })
            .catch((error) => {
              console.log(error);
            });
        });

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
            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is Required</p>
            )}

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
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is Required</p>
            )}

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

            <button className="btn btn-primary  text-black font-bold text-lg mt-4">
              Register
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
