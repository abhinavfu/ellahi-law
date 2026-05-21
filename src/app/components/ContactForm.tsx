import { FormEvent, useState } from "react";
import { motion } from "motion/react";
import { CheckCircle, Send, User, Mail, Phone } from "lucide-react";
import apiService from "../../services/api";

const NAVY = "#0A2540";
const BLUE = "#2D9CDB";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  time: string;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    time: "",
  });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await apiService.sendContactMessage(formData);
      
      if (!response.success) {
				console.log("response 2", response);
				const error = response?.error || `Failed to send message.`;
				throw new Error(error);
			}

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again later."
      );
    }
  }

  const isLoading = status === "loading";

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center h-full min-h-64 text-center p-8"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: "#EBF5FC" }}>
          <CheckCircle size={26} style={{ color: BLUE }} />
        </div>
        <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: '"Playfair Display", serif', color: NAVY }}>
          Message Received
        </h3>
        <p className="text-sm mb-4" style={{ color: "#5A6A7A" }}>
          Thank you for reaching out. Your message was sent successfully and we'll respond within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({ name: "", email: "", phone: "", service: "", message: "", time: "" });
            setErrorMessage("");
          }}
          className="text-sm font-medium underline"
          style={{ color: BLUE }}
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Full Name *
          </label>
          <div className="relative">
            <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              required
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Email Address *
          </label>
          <div className="relative">
            <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              required
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Phone Number
          </label>
          <div className="relative">
            <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#9CA3AF" }} />
            <input
              type="tel"
              placeholder="(416) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors"
              style={{ color: "#1A1A1A" }}
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
            Legal Service Needed
          </label>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
            style={{ color: formData.service ? "#1A1A1A" : "#9CA3AF" }}
          >
            <option value="">Select a service</option>
            <option value="Real Estate Law">Real Estate Law</option>
            <option value="Business / Corporate Law">Business / Corporate Law</option>
            <option value="Civil Litigation">Civil Litigation</option>
            <option value="Wills & Estates">Wills & Estates</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
          Brief Description
        </label>
        <textarea
          rows={3}
          placeholder="Tell us about your legal matter..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors resize-none"
          style={{ color: "#1A1A1A" }}
        />
      </div>
      <div>
        <label className="text-xs font-medium mb-1.5 block" style={{ color: "#5A6A7A" }}>
          Preferred Time
        </label>
        <select
          value={formData.time}
          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-400 transition-colors bg-white"
          style={{ color: formData.time ? "#1A1A1A" : "#9CA3AF" }}
        >
          <option value="">Select preferred time</option>
          <option value="Morning (9am – 12pm)">Morning (9am – 12pm)</option>
          <option value="Afternoon (12pm – 5pm)">Afternoon (12pm – 5pm)</option>
          <option value="Evening (5pm – 7pm)">Evening (5pm – 7pm)</option>
        </select>
      </div>
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage || "Unable to send your message. Please try again."}
        </div>
      )}
      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.01 }}
        whileTap={{ scale: isLoading ? 1 : 0.99 }}
        type="submit"
        disabled={isLoading}
        className="w-full py-3 rounded-lg text-sm font-medium text-white flex items-center justify-center gap-2 transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: NAVY }}
      >
        <Send size={14} />
        {isLoading ? "Sending..." : "Request Consultation"}
      </motion.button>
      <div className="flex items-center gap-6 pt-1">
        {["Confidential Consultation", "Response Within 24 Hours", "Serving Toronto & GTA"].map((t) => (
          <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: "#5A6A7A" }}>
            <CheckCircle size={12} style={{ color: BLUE }} />
            {t}
          </div>
        ))}
      </div>
    </form>
  );
}
