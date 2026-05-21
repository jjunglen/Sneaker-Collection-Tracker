import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const API_URL = import.meta.env.VITE_API_URL;

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    if (user) {
        return <Navigate to="/collection" replace />

    }

    async function handleSubmit(event) {
        event.preventDefault();
        setError(null);

        // Validation
        if (!email || !password) {
            return setError("Email and password are required");
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",

                },
                body: JSON.stringify({ email, password } )
            })

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            login(data.user, data.token);
            navigate("/collection");

        } catch(error) {
            console.log("Login error message:", error);
            setError(error.message);

        } finally {
            setLoading(false);

        }
    }

    return (
        <section className="flex justify-center items-center min-h-screen p-12">
            <div className="bg-white border border-gray-400 shadow-[4px_4px_0px_#4CAF82] rounded-xl w-full max-w-3xl p-10">
                <h1 className="mb-1 text-blue-950 text-2xl">Welcome back</h1>
                <p className="text-slate-400 mb-8 text-sm">Log in to your collection</p>

                {/* Error Messages placement */}
                {error && (
                <div className=" text-sm bg-red-100 text-red-600 p-4 mb-6 border border-red-200 rounded-lg">
                    {error}
                </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    {/* Email from */}
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-blue-950 text0-sm">Email</label>
                        <input 
                            type="email"
                            placeholder="you@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"

                        />
                    </div>

                    {/* Password from */}
                    <div className="flex flex-col gap-1">
                        <label className="font-bold text-blue-950 text0-sm">Password</label>
                        <input 
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="px-4 py-2 border border-stone-400 text-blue-950 text-sm rounded-lg bg-stone-100 focus:ring-blue-900"

                        />
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-blue-950 text-white text-sm font-medium py-3 rounded-lg shadow-[4px_4px_0px_#4CAF82] active:bg-emerald-800 active:shadow-none active:translate-y-1 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"

                    >
                        {loading ? "Logging in..." : "Log in"}
                    </button>
                </form>
                
                <p className="text-center mt-5 text-sm text-slate-500">
                    No account yet?{" "}
                    <Link
                        to="/register"
                        className="text-emerald-600 font-semibold hover:text-emerald-300"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    )
}