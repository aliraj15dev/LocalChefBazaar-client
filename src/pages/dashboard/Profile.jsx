import { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [showModal, setShowModal] = useState(false);
  const [requestType, setRequestType] = useState("");

  // 🔹 Load all users
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const currentUser = users.find((u) => u.email === user?.email);

  if (!currentUser) {
    return <p className="text-center mt-10">User not found</p>;
  }

  const {
    _id,
    displayName,
    email,
    photoURL,
    role = "user",
    status = "active",
    address,
  } = currentUser;

  // 🔹 Submit role request
  const handleSubmitRequest = async () => {
    const requestData = {
      userName: displayName,
      userEmail: email,
      requestType,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/role-requests", requestData);

      if (res.data?.alreadyRequested) {
        Swal.fire("Oops!", "You already sent this request.", "info");
        return;
      }

      if (res.data?.insertedId) {
        Swal.fire(
          "Request Sent!",
          `Your request to become ${requestType} is pending approval.`,
          "success"
        );
        setShowModal(false);
      }
    } catch (error) {
      Swal.fire("Error!", "Something went wrong!", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">

        {/* 🔹 User Info */}
        <div className="flex items-center gap-4">
          <img
            src={photoURL}
            alt="user"
            className="w-20 h-20 rounded-full border"
          />
          <div>
            <h2 className="text-2xl font-bold">{displayName}</h2>
            <p className="text-gray-500">{email}</p>
          </div>
        </div>

        {/* 🔹 User Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><b>Address:</b> {address || "Not added"}</p>
          <p><b>Role:</b> {role}</p>
          <p>
            <b>Status:</b>
            <span className="ml-2 badge badge-success">
              {status}
            </span>
          </p>

          {role === "chef" && (
            <p><b>Chef ID:</b> {_id}</p>
          )}
        </div>

        {/* 🔹 Action Buttons */}
        <div className="flex gap-3 pt-4">
          {role === "user" && (
            <>
              <button
                onClick={() => {
                  setRequestType("chef");
                  setShowModal(true);
                }}
                className="btn btn-primary"
              >
                Be a Chef
              </button>

              <button
                onClick={() => {
                  setRequestType("admin");
                  setShowModal(true);
                }}
                className="btn btn-outline"
              >
                Be an Admin
              </button>
            </>
          )}

          {role === "chef" && (
            <button
              onClick={() => {
                setRequestType("admin");
                setShowModal(true);
              }}
              className="btn btn-outline"
            >
              Be an Admin
            </button>
          )}
        </div>
      </div>

      {/* 🔹 Modal Form */}
      {showModal && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">
              Request to become {requestType}
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitRequest();
              }}
              className="space-y-3"
            >
              <input
                value={displayName}
                readOnly
                className="input input-bordered w-full"
              />

              <input
                value={email}
                readOnly
                className="input input-bordered w-full"
              />

              <input
                value={requestType}
                readOnly
                className="input input-bordered w-full"
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default Profile;
