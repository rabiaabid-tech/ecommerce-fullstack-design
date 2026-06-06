import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Validate email domain against authorized providers
    const allowedDomain = "@gmail.com";
    if (!email.toLowerCase().endsWith(allowedDomain)) {
      setError(
        `Access restricted: Only ${allowedDomain} accounts are authorized for login.`,
      );
      return;
    }

    // Prepare payload according to OAuth2 specifications
    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
            "Authentication failed. Please verify your credentials.",
        );
      }

      // Persist authentication token and notify application state
      localStorage.setItem("token", data.access_token);
      window.dispatchEvent(new Event("authChange"));

      // Decode JWT payload to determine user role and handle routing
      try {
        const tokenPayload = JSON.parse(atob(data.access_token.split(".")[1]));

        if (tokenPayload.is_admin) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch (decodeError) {
        // Fallback to default route if token parsing fails
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Welcome Back</h2>
        {error && <div className="bg-red-50 text-red-500 p-3 rounded mb-4 text-sm">{error}</div>}
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition">
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-600 text-center mt-6">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}