import { useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mail, ArrowLeft, AlertCircle, CheckCircle, Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function ForgotPassword() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setStatus("loading");
    try {
      await forgotPassword(email);
      setStatus("sent");
    } catch {
      setStatus("error");
      setError("Something went wrong. Please try again.");
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
                <div className="text-sm font-semibold" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540" }}>Ellahi Law</div>
                <div className="text-xs tracking-wider" style={{ color: "#5A6A7A" }}>PROFESSIONAL CORPORATION</div>
              </div>
            </Link>
            <h1 style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.6rem" }}>
              Reset your password
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <div className="px-8 py-6">
            <AnimatePresence mode="wait">
              {status === "sent" ? (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ backgroundColor: "#EEF7F0" }}
                  >
                    <CheckCircle size={32} style={{ color: "#10B981" }} />
                  </div>
                  <h2
                    className="mb-2"
                    style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.25rem" }}
                  >
                    Check your inbox
                  </h2>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    If an account exists for <strong>{email}</strong>, we've sent a password reset link. 
                    Please check your email (and spam folder) and follow the instructions.
                  </p>
                  <p className="text-xs text-gray-400 mb-6">
                    The link will expire in 1 hour for security purposes.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => { setStatus("idle"); setEmail(""); }}
                      className="w-full py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                    >
                      Send to a different email
                    </button>
                    <Link
                      to="/login"
                      className="w-full py-2.5 rounded-lg text-sm font-medium text-white text-center transition-opacity hover:opacity-90"
                      style={{ backgroundColor: "#0A2540" }}
                    >
                      Back to Sign In
                    </Link>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {error && (
                    <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
                      <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-gray-50 focus:bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ backgroundColor: "#0A2540" }}
                  >
                    {status === "loading" ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send size={14} />
                        Send Reset Link
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center">
                    <Link
                      to="/login"
                      className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <ArrowLeft size={13} />
                      Back to Sign In
                    </Link>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
