import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure()

  const {data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const currentUser = users.find(
  u => u.email === user?.email
);

  const {
  _id,
  displayName,
  email,
  photoURL,
  role,
  status,
  address,
  chefId
} = currentUser || {};

  const handleRoleRequest = (type) => {
    const requestData = {
      userId: _id,
      userName: displayName,
      userEmail: email,
      requestType: type, // chef | admin
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    fetch("http://localhost:3000/role-requests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.insertedId) {
          Swal.fire(
            "Request Sent!",
            `Your request to become ${type} is pending approval.`,
            "success"
          );
        }
      });
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <p><b>Address:</b> {address || "Not added"}</p>
          <p><b>Role:</b> {role}</p>
          <p>
            <b>Status:</b>
            <span className={`ml-2 badge ${status === "active" ? "badge-success" : "badge-error"}`}>
              {status || 'Active'}
            </span>
          </p>

          {role === "chef" && (
            <p><b>Chef ID:</b> {chefId}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {role === "user" && (
            <>
              <Link
                onClick={() => handleRoleRequest("chef")}
                className="btn btn-primary"
              >
                Be a Chef
              </Link>

              <Link
                onClick={() => handleRoleRequest("admin")}
                className="btn btn-outline"
              >
                Be an Admin
              </Link>
            </>
          )}

          {role === "chef" && (
            <Link
              onClick={() => handleRoleRequest("admin")}
              className="btn btn-outline"
            >
              Be an Admin
            </Link>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
