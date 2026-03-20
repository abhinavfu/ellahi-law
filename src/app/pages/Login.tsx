import { useState } from "react";
import { Link, useNavigate, useLocation, Navigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, LogIn, AlertCircle, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.email) { setError("Please enter your email address."); return; }
    if (!form.password) { setError("Please enter your password."); return; }
    setLoading(true);
    try {
      await login(form.email, form.password, form.remember);
      toast.success("Welcome back! You're now signed in.");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center py-16 px-4"
      style={{ backgroundColor: "#F8FAFC", fontFamily: "Inter, sans-serif" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2.5 mb-8">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ backgroundColor: "#0A2540" }}>
                <span className="text-white text-xs font-bold" style={{ fontFamily: '"Playfair Display", serif' }}>EL</span>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540" }}>
                  Ellahi Law
                </div>
                <div className="text-xs tracking-wider" style={{ color: "#5A6A7A" }}>PROFESSIONAL CORPORATION</div>
              </div>
            </Link>
            <h1 style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.6rem" }}>
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 mt-1">Sign in to your account to continue</p>
          </div>

          {/* Demo hint */}
          <div className="mx-8 mt-5 p-3 rounded-lg flex gap-2.5 text-xs" style={{ backgroundColor: "#EBF5FC" }}>
            <Info size={14} className="flex-shrink-0 mt-0.5" style={{ color: "#2D9CDB" }} />
            <div style={{ color: "#1A6A9A" }}>
              <strong>Demo Admin:</strong> admin@ellahilaw.ca / Demo@2026
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            {error && (
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
                <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <Link to="/forgot-password" className="text-xs transition-colors" style={{ color: "#2D9CDB" }}>
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="current-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={form.remember}
                onChange={(e) => setForm({ ...form, remember: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 accent-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#0A2540" }}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={15} />
                  Sign In
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/register" className="font-medium transition-colors" style={{ color: "#2D9CDB" }}>
                Create one
              </Link>
            </p>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-gray-400">
          By signing in, you agree to our{" "}
          <Link to="/contact" className="underline hover:text-gray-600 transition-colors">Terms of Service</Link>
          {" "}and{" "}
          <Link to="/contact" className="underline hover:text-gray-600 transition-colors">Privacy Policy</Link>.
        </p>
      </motion.div>
    </div>
  );
}