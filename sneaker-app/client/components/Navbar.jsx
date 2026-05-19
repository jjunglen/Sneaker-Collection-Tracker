import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaAtom } from "react-icons/fa"


export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
    }

    return (
        <nav className="flex items-center justify-between bg-blue-950 px-6 py-6">

            <Link   
                to="/"
                className="flex items-center gap-3  text-gray-100 font-medium text-sm"
            >
                <FaAtom className="text-xl text-green-600"/>
                <p className="font-bold">Sneaker Collection App</p>
            </Link>

            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <Link
                            to="/collection"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Collection
                        </Link>
                        <Link
                            to="/profile"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Profile
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="px-3 py-1 text-sm text-gray-300 font-bold rounded border border-gray-300 bg-transparent hover:text-white hover:border-white transition-colors cursor-pointer"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="px-3 py-1 text-sm font-bold text-gray-300 rounded-xl hover:text-white transition-colors" 
                        >
                            Register
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}