import { useNavigate, Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaAtom } from "react-icons/fa"


export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    function navLinkClass({ isActive }) {
        return isActive ? "px-2 py-1 text-sm font-bold bg-emerald-300 text-black rounded-lg border-2 border-emerald-500 transition-colors" : "px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors"
    }

    return (
        <nav className="flex items-center justify-between bg-blue-950 px-6 py-6">

            <NavLink   
                to="/"
                className="flex items-center gap-3  text-gray-100 font-medium text-sm"
            >
                <FaAtom className="text-3xl text-green-600"/>
                <p className="font-bold">Sneaker Collection App</p>
            </NavLink>

            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <NavLink
                            to="/collection"
                            className={navLinkClass}
                        >
                            Collection
                        </NavLink>
                        <NavLink
                            to="/profile"
                            className={navLinkClass}
                        >
                            Profile
                        </NavLink>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 text-sm text-gray-300 font-bold rounded border border-gray-300 bg-transparent hover:text-white hover:border-white transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/login"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/register"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Register
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}