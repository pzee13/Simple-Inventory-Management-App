import { useState } from "react";
import API from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful");
      navigate("/");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">

      <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-10">

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            Login to manage your inventory
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition pr-12"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Signup
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;