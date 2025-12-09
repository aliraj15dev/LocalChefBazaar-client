import { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "./../../../context/AuthContext";

const Navbar = () => {
  const { user, loading, setUser, logoutUser } = use(AuthContext);
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>Meals</NavLink>
      </li>
      <li>{user && <NavLink>Dashboard</NavLink>}</li>
    </>


  );

  const handleLogOut = () => {
    logoutUser().then(() => {
      setUser(null);
    });
  };

  return (
    <nav className="bg-base-100 shadow-sm">
      <div className="navbar max-w-9/10 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to='/' className="btn btn-ghost text-xl">LCB</Link>
        </div>
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>
        <div className="navbar-end">
          {loading ? (
            <span className="loading loading-spinner text-primary"></span>
          ) : user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="m-1">
                  {user?.photoURL ? (
                    <img
                      className="rounded-full w-10 cursor-pointer"
                      src={user?.photoURL}
                      alt="User"
                    />
                  ) :'Profile'}
                </div>
                <div
                  tabIndex="-1"
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm space-y-3"
                >
                  <button
                    onClick={handleLogOut}
                    className="btn text-2xl bg-linear-to-b from-green-400 to-green-800 text-white"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="navbar-end">
              <Link
                to="/login"
                className="btn text-2xl bg-linear-to-b from-green-400 to-green-800 text-white"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
