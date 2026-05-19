import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Collection from "../pages/Collection"
import Landing from "../pages/Landing"
import './index.css'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null
  
  if (!user) {
    return <Navigate to="/login" replace />

  }

  return children

}

function App() {
  return (
    <div className="min-h-screen bg-stone-300">
      <Navbar/>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Protected routes */}
        <Route path="/collection" element={
          <ProtectedRoute>
            <Collection />
          </ProtectedRoute>} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
