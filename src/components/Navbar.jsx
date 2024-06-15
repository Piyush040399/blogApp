/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleClick = () => {
    !user ? alert("Please Login") : null;
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div>
        <Link to="/" className="mr-4" onClick={handleClick}>
          Home
        </Link>
        {user && (
          <Link to="/new-blog" className="mr-4">
            New Blog
          </Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <button onClick={handleLogout} className="mr-4">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">
              Login
            </Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
