import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8+ characters", ok: password.length >= 8 },
    { label: "Uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "Lowercase letter", ok: /[a-z]/.test(password) },
    { label: "Number or symbol", ok: /[0-9!@#$%^&*]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const strength = score < 2 ? "Weak" : score < 4 ? "Fair" : "Strong";
  const colors = { Weak: "#EF4444", Fair: "#F59E0B", Strong: "#10B981" };

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{ backgroundColor: i <= score ? colors[strength] : "#E5E7EB" }}
          />
        ))}
      </div>
      <div className="flex items-center gap-4 flex-wrap">
        {checks.map((c) => (
          <span key={c.label} className={`text-xs flex items-center gap-1 ${c.ok ? "text-green-600" : "text-gray-400"}`}>
            <CheckCircle size={10} />
            {c.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Register() {
  const { register, user, clearError } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: "", email: "", password: "", confirm: "", terms: false });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const validate = (): string | null => {
    if (!form.fullName.trim()) return "Please enter your full name.";
    if (!form.email.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email address.";
    if (form.password.length < 8) return "Password must be at least 8 characters.";
    if (form.password !== form.confirm) return "Passwords do not match.";
    if (!form.terms) return "Please accept the terms to continue.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError(); // Clear any previous auth errors
    setError("");
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true);
    try {
      const success = await register(form.fullName, form.email, form.password);
      if (success) {
        toast.success("Account created! Welcome to Ellahi Law.");
        navigate("/dashboard", { replace: true });
      }
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed.");
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
              Create an account
            </h1>
            <p className="text-sm text-gray-500 mt-1">Join to access our blog and resources</p>
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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <input
                type="text"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="Jane Smith"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
              />
            </div>

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
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Create a strong password"
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
              <PasswordStrength password={form.password} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  placeholder="Repeat your password"
                  className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
                  style={{
                    borderColor: form.confirm && form.confirm !== form.password ? "#FCA5A5" : undefined,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-red-500 mt-1">Passwords don't match</p>
              )}
              {form.confirm && form.password === form.confirm && form.confirm.length >= 8 && (
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle size={11} /> Passwords match
                </p>
              )}
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={form.terms}
                onChange={(e) => setForm({ ...form, terms: e.target.checked })}
                className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-blue-600 flex-shrink-0"
              />
              <label htmlFor="terms" className="text-sm text-gray-600 leading-relaxed">
                I agree to the{" "}
                <Link to="/contact" className="transition-colors underline" style={{ color: "#2D9CDB" }}>
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/contact" className="transition-colors underline" style={{ color: "#2D9CDB" }}>
                  Privacy Policy
                </Link>
              </label>
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
                  <UserPlus size={15} />
                  Create Account
                </>
              )}
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium transition-colors" style={{ color: "#2D9CDB" }}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}