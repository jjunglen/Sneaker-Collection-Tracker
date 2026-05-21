import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
    const { user, login } = useAuth();
    const navigate = useNavigate();


    // useStates
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("");
    const [password,  setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // UI State
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)

    if (user ) {
        return <Navigate to="/collection"  replace />

    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return setError("All fields are required");

        }

        if (password !== confirmPassword) {
            return setError("Passwords did not match");

        }

        if (password.length < 8) {
            return setError("Password needs to be 8 characters or longer")

        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",

                },
                body: JSON.stringify({ email, username, password})

            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed")

            }

            // Save token
            navigate("/login")

        } catch(error) {
            console.error("Registration error:", error);
            setError(error.message);

        } finally {
            setLoading(false);

        }
    } 


    return (
      <section className="flex items-center justify-center p-12 min-h-screen">
        <div className="bg-white border border-gray-400 shadow-[4px_4px_0px_#4CAF82] rounded-xl w-full max-w-3xl p-10">
          <h1 className="mb-1 text-blue-950 text-2xl">Create account</h1>
          <p className="text-slate-400 mb-8 text-sm">
            Start tracking your collection
          </p>

          {/* Error Messages placement */}
          {error && (
            <div className=" text-sm bg-red-100 text-red-600 p-4 mb-6 border border-red-200 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username section */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm text-blue-950">
                Username
              </label>
              <input
                type="text"
                placeholder="sneakerhead214"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"
              />
            </div>

            {/* Email section */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm text-blue-950">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"
              />
            </div>

            {/* Password section */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm text-blue-950">
                Password
              </label>
              <input
                type="password"
                placeholder="Min 8 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"
              />
            </div>

            {/* Confirm passwoprd section */}
            <div className="flex flex-col gap-1">
              <label className="font-bold text-sm text-blue-950">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Repeat password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"
              />
            </div>

            {/* Button submit */}
            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full bg-blue-950 text-white text-sm font-medium py-3 rounded-lg shadow-[4px_4px_0px_#4CAF82] active:bg-emerald-800 active:shadow-none active:translate-y-1 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center mt-5 text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-emerald-600 font-semibold hover:text-emerald-300"
            >
              Log in
            </Link>
          </p>
        </div>
      </section>
    );
}