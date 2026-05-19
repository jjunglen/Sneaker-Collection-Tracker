import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaLayerGroup, FaChartBar, FaShieldAlt } from "react-icons/fa";

export default function Landing() {
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/collection" replace /> 
    }

    return (
      <section className="p-6 sm:p-16 flex flex-col justify-center mx-auto">
        <div className="sm:p-20 py-16 px-3 mb-6 rounded-xl text-center bg-blue-950 shadow-[6px_6px_0px_#4CAF82]">
          <div className="bg-emerald-500 w-12 h-1 mx-auto rounded-full mb-4"></div>

          <h1 className="text-stone-100 text-2xl font-semibold mb-2">
            Your sneaker collection, all in one place!
          </h1>
          <p className="mb-6 text-slate-300 text-sm">
            Your home for sneaker tracking - own it, want it, flip it.
          </p>
          <div className="flex justify-center items-center gap-4">
            <Link
              to="/register"
              className="border-emerald-400 px-5 py-2 rounded-lg bg-emerald-500 text-blue-950 text-sm font-medium hover:text-gray-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="border text-sm border-slate-300 rounded-lg px-5 py-2 text-slate-300 hover:text-gray-100 hover:border-slate-100 hover:-translate-y-1 hover:shadow-2xl transition-all duration-200"
            >
              Log In
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <section className="w-full border border-stone-400 p-7 bg-white rounded-xl shadow-[6px_6px_0px_#4CAF82]">
                <FaLayerGroup className="text-xl mb-2 text-green-600" />
                <p className="text-blue-950 font-medium mb-1 text-medium">Track collection</p>
                <p className="text-slate-600 text-sm">Owned, want, sold</p>
            </section>
            <section className="w-full border border-stone-400 p-7 bg-white rounded-xl shadow-[6px_6px_0px_#4CAF82]">
                <FaChartBar className="text-xl mb-2 text-green-600" />
                <p className="text-blue-950 font-medium mb-1 text-medium">Portfolio value</p>
                <p className="text-slate-600 text-sm">Track purchase price vs current market value.</p>
            </section>
            <section className="w-full border border-stone-400 p-7 bg-white rounded-xl shadow-[6px_6px_0px_#4CAF82]">
                <FaShieldAlt className="text-xl mb-2 text-green-600" />
                <p className="text-blue-950 font-medium mb-1 text-medium">Secure account</p>
                <p className="text-slate-600 text-sm">JWT auth and bcrypt keep your data safe.</p>
            </section>
            
        </div>
      </section>
    );
}