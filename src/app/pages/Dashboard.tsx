import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  User, FileText, PenLine, Settings, LogOut, Trash2, Pencil,
  Plus, CheckCircle, AlertCircle, Eye, Calendar, Tag, X, BookOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useBlog, BlogPost, BLOG_CATEGORIES, slugify } from "../context/BlogContext";
import { RichTextEditor } from "../components/RichTextEditor";
import { toast } from "sonner";

type Tab = "overview" | "posts" | "create" | "profile";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Real Estate Law": { bg: "#EBF5FC", text: "#1A6A9A" },
  "Business Law": { bg: "#EEF7F0", text: "#1A6A3A" },
  "Civil Litigation": { bg: "#FEF3E8", text: "#A05A1A" },
  "Wills & Estates": { bg: "#F3EFFE", text: "#6A3AAA" },
  General: { bg: "#F3F4F6", text: "#4A5568" },
};

interface PostForm {
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  featuredImageFile: File | null;
  category: string;
  tagsInput: string;
  metaDescription: string;
}

const EMPTY_FORM: PostForm = {
  title: "",
  excerpt: "",
  content: "",
  featuredImage: "",
  featuredImageFile: null,
  category: "General",
  tagsInput: "",
  metaDescription: "",
};

function PostEditor({
  initial,
  onSave,
  onCancel,
  loading,
}: {
  initial?: PostForm;
  onSave: (data: PostForm) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [form, setForm] = useState<PostForm>(initial || EMPTY_FORM);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.excerpt.trim()) { setError("Excerpt is required."); return; }
    if (!form.content.trim()) { setError("Content is required."); return; }
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="flex items-start gap-2.5 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600">
          <AlertCircle size={15} className="flex-shrink-0 mt-0.5" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Post Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter a compelling title..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {form.title && (
              <p className="text-xs text-gray-400 mt-1">
                Slug: /blog/{slugify(form.title)}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt / Summary *</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Write a short description that will appear in the blog listing..."
              rows={3}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Content *</label>
            <RichTextEditor
              value={form.content}
              onChange={(v) => setForm({ ...form, content: v })}
              minHeight="280px"
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all bg-white"
            >
              {BLOG_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tags</label>
            <input
              type="text"
              value={form.tagsInput}
              onChange={(e) => setForm({ ...form, tagsInput: e.target.value })}
              placeholder="Comma separated: tag1, tag2"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            {form.tagsInput && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {form.tagsInput.split(",").map((t) => t.trim()).filter(Boolean).map((t) => (
                  <span key={t} className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Tag size={9} /> {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Featured Image</label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setForm({ ...form, featuredImageFile: file, featuredImage: file ? "" : form.featuredImage });
                  }}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                />
              </div>
            </div>
            {(form.featuredImage || form.featuredImageFile) && (
              <div className="mt-2 rounded-lg overflow-hidden h-28 bg-gray-100">
                <img
                  src={form.featuredImageFile ? URL.createObjectURL(form.featuredImageFile) : form.featuredImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Meta Description
              <span className="text-xs text-gray-400 font-normal ml-1">(SEO)</span>
            </label>
            <textarea
              value={form.metaDescription}
              onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
              placeholder="Brief description for search engines..."
              rows={3}
              maxLength={160}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">{form.metaDescription.length}/160 characters</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
          style={{ backgroundColor: "#0A2540" }}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <CheckCircle size={14} />
              Publish Post
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function DeleteConfirmModal({ post, onConfirm, onCancel }: { post: BlogPost; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
      >
        <button onClick={onCancel} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X size={18} />
        </button>
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-500" />
        </div>
        <h3 className="text-center font-semibold text-gray-800 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
          Delete Post?
        </h3>
        <p className="text-center text-sm text-gray-500 mb-6 leading-relaxed">
          Are you sure you want to delete "<strong>{post.title}</strong>"? This action cannot be undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function Dashboard() {
  const { user, logout, updateProfile, changePassword } = useAuth();
  const { posts, getPostsByAuthor, createPost, updatePost, deletePost } = useBlog();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const editId = searchParams.get("edit");
  const [activeTab, setActiveTab] = useState<Tab>(editId ? "posts" : "overview");
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<BlogPost | null>(null);
  const [postLoading, setPostLoading] = useState(false);

  // Profile form
  const [profileForm, setProfileForm] = useState({ fullName: `${user?.username}`.replace("_", " ").toUpperCase() || "", email: user?.email || "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [profileError, setProfileError] = useState("");

  // Password form
  const [passForm, setPassForm] = useState({ current: "", newPass: "", confirm: "" });
  const [passLoading, setPassLoading] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const [passError, setPassError] = useState("");

  const myPosts = user ? (user.role === "admin" ? posts : getPostsByAuthor(user.username)) : [];

  useEffect(() => {
    if (editId) {
      const post = posts.find((p) => p.id === editId);
      if (post) {
        setEditingPost(post);
        setActiveTab("posts");
        setSearchParams({});
      }
    }
  }, [editId, posts]);

  const handleSavePost = async (data: PostForm) => {
    if (!user) return;
    setPostLoading(true);
    const tags = data.tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const slug = slugify(data.title);

    try {
      if (editingPost) {
        updatePost(editingPost.id, {
          title: data.title,
          slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          tags,
          meta_description: data.metaDescription,
        }, data.featuredImageFile || undefined);
        toast.success("Post updated successfully!");
        setEditingPost(null);
      } else {
        createPost({
          title: data.title,
          slug,
          excerpt: data.excerpt,
          content: data.content,
          category: data.category,
          tags,
          author: user.username,
          meta_description: data.metaDescription,
        }, data.featuredImageFile || undefined);
        toast.success("Post published successfully!");
        setActiveTab("posts");
      }
    } finally {
      setPostLoading(false);
    }
  };

  const handleDelete = (post: BlogPost) => setDeleteTarget(post);

  const confirmDelete = () => {
    if (deleteTarget) {
      deletePost(deleteTarget.id);
      toast.success("Post deleted.");
      setDeleteTarget(null);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError(""); setProfileSuccess(false);
    if (!profileForm.fullName.trim()) { setProfileError("Name is required."); return; }
    setProfileLoading(true);
    try {
      await updateProfile({ fullName: profileForm.fullName, email: profileForm.email });
      setProfileSuccess(true);
      toast.success("Profile updated!");
    } catch (err: unknown) {
      setProfileError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError(""); setPassSuccess(false);
    if (!passForm.current) { setPassError("Enter your current password."); return; }
    if (passForm.newPass.length < 8) { setPassError("New password must be at least 8 characters."); return; }
    if (passForm.newPass !== passForm.confirm) { setPassError("Passwords don't match."); return; }
    setPassLoading(true);
    try {
      await changePassword(passForm.current, passForm.newPass);
      setPassSuccess(true);
      setPassForm({ current: "", newPass: "", confirm: "" });
      toast.success("Password changed successfully!");
    } catch (err: unknown) {
      setPassError(err instanceof Error ? err.message : "Failed to change password.");
    } finally {
      setPassLoading(false);
    }
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <BookOpen size={15} /> },
    { id: "posts", label: `My Posts (${myPosts.length})`, icon: <FileText size={15} /> },
    { id: "create", label: "New Post", icon: <PenLine size={15} /> },
    { id: "profile", label: "Profile", icon: <Settings size={15} /> },
  ];

  if (!user) return null;

  return (
    <div style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#F8FAFC", minHeight: "100vh" }}>
      {deleteTarget && (
        <DeleteConfirmModal
          post={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      {/* Dashboard Header */}
      <div style={{ backgroundColor: "#0A2540" }} className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0"
              style={{ backgroundColor: "#2D9CDB" }}
            >
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1
                className="text-white"
                style={{ fontFamily: '"Playfair Display", serif', fontSize: "1.4rem" }}
              >
                {user.username}
              </h1>
              <p className="text-white/60 text-sm">
                {user.role === "admin" ? "Administrator" : "Author"} · {user.email}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/blog"
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-white/20 text-white/80 text-sm hover:bg-white/10 transition-colors"
            >
              <Eye size={14} />
              View Blog
            </Link>
            <button
              onClick={() => { logout(); navigate("/"); }}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
            >
              <LogOut size={14} />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[64px] lg:top-[80px] z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); if (tab.id !== "posts") setEditingPost(null); }}
                className="flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-all"
                style={{
                  borderBottomColor: activeTab === tab.id ? "#2D9CDB" : "transparent",
                  color: activeTab === tab.id ? "#2D9CDB" : "#6B7280",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <AnimatePresence mode="wait">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.5rem" }}>
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                {[
                  { label: "Total Posts", value: myPosts.length, color: "#EBF5FC", text: "#2D9CDB", icon: <FileText size={20} style={{ color: "#2D9CDB" }} /> },
                  { label: "Categories", value: [...new Set(myPosts.map((p) => p.category))].length, color: "#EEF7F0", text: "#10B981", icon: <Tag size={20} style={{ color: "#10B981" }} /> },
                  { label: "Latest Post", value: myPosts[0] ? new Date(myPosts[0].date).toLocaleDateString("en-CA", { month: "short", day: "numeric" }) : "—", color: "#FEF3E8", text: "#F59E0B", icon: <Calendar size={20} style={{ color: "#F59E0B" }} /> },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-6 border border-gray-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: stat.color }}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-2xl font-semibold" style={{ color: "#0A2540" }}>{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                    <FileText size={16} style={{ color: "#2D9CDB" }} /> Recent Posts
                  </h3>
                  {myPosts.slice(0, 5).length === 0 ? (
                    <p className="text-sm text-gray-400">No posts yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {myPosts.slice(0, 5).map((p) => {
                        const cc = CATEGORY_COLORS[p.category] || CATEGORY_COLORS["General"];
                        return (
                          <div key={p.id} className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <Link to={`/blog/${p.slug}`} className="text-sm font-medium text-gray-700 hover:text-blue-600 line-clamp-1 transition-colors">
                                {p.title}
                              </Link>
                              <p className="text-xs text-gray-400 mt-0.5">
                                {new Date(p.date).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" })}
                              </p>
                            </div>
                            <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: cc.bg, color: cc.text }}>
                              {p.category}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="bg-white rounded-xl border border-gray-100 p-6">
                  <h3 className="font-medium text-gray-800 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Write a New Post", icon: <PenLine size={15} />, action: () => setActiveTab("create"), bg: "#0A2540" },
                      { label: "Manage My Posts", icon: <FileText size={15} />, action: () => setActiveTab("posts"), bg: "#2D9CDB" },
                      { label: "Edit Profile", icon: <User size={15} />, action: () => setActiveTab("profile"), bg: "#6B7280" },
                    ].map((a) => (
                      <button
                        key={a.label}
                        onClick={a.action}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: a.bg }}
                      >
                        {a.icon}
                        {a.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* My Posts Tab */}
          {activeTab === "posts" && (
            <motion.div
              key="posts"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                {editingPost ? (
                  <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.4rem" }}>
                        Edit Post
                      </h2>
                      <button onClick={() => setEditingPost(null)} className="text-gray-400 hover:text-gray-600">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 p-6">
                      <PostEditor
                        initial={{
                          title: editingPost.title,
                          excerpt: editingPost.excerpt,
                          content: editingPost.content,
                          featuredImage: editingPost.featuredImage,
                          featuredImageFile: null,
                          category: editingPost.category,
                          tagsInput: editingPost.tags.join(", "),
                          metaDescription: editingPost.metaDescription || "",
                        }}
                        onSave={handleSavePost}
                        onCancel={() => setEditingPost(null)}
                        loading={postLoading}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="flex items-center justify-between mb-6">
                      <h2 style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.4rem" }}>
                        {user.role === "admin" ? "All Posts" : "My Posts"}
                      </h2>
                      <button
                        onClick={() => setActiveTab("create")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: "#2D9CDB" }}
                      >
                        <Plus size={15} />
                        New Post
                      </button>
                    </div>

                    {myPosts.length === 0 ? (
                      <div className="bg-white rounded-xl border border-gray-100 p-16 text-center">
                        <FileText size={40} className="text-gray-200 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">You haven't published any posts yet.</p>
                        <button
                          onClick={() => setActiveTab("create")}
                          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-opacity hover:opacity-90"
                          style={{ backgroundColor: "#0A2540" }}
                        >
                          Write Your First Post
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {myPosts.map((post) => {
                          const cc = CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"];
                          const canEdit = user.username === post.author || user.role === "admin";
                          return (
                            <motion.div
                              key={post.id}
                              layout
                              className="bg-white rounded-xl border border-gray-100 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4"
                            >
                              {post.featuredImage && (
                                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 hidden sm:block">
                                  <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                  <h3 className="text-sm font-medium text-gray-800 line-clamp-1">{post.title}</h3>
                                  <span className="text-xs px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: cc.bg, color: cc.text }}>
                                    {post.category}
                                  </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                  {post.author} · {new Date(post.date).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" })}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <Link
                                  to={`/blog/${post.slug}`}
                                  className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                  title="View Post"
                                >
                                  <Eye size={14} />
                                </Link>
                                {canEdit && (
                                  <>
                                    <button
                                      onClick={() => setEditingPost(post)}
                                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-600 transition-colors"
                                      title="Edit Post"
                                    >
                                      <Pencil size={14} />
                                    </button>
                                    <button
                                      onClick={() => handleDelete(post)}
                                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500 transition-colors"
                                      title="Delete Post"
                                    >
                                      <Trash2 size={14} />
                                    </button>
                                  </>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Create Post Tab */}
          {activeTab === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mb-6" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.5rem" }}>
                Create New Post
              </h2>
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <PostEditor
                  onSave={handleSavePost}
                  onCancel={() => setActiveTab("posts")}
                  loading={postLoading}
                />
              </div>
            </motion.div>
          )}

          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Edit Profile */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="mb-5 flex items-center gap-2" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.2rem" }}>
                  <User size={18} style={{ color: "#2D9CDB" }} /> Profile Information
                </h2>
                {profileSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-600 mb-4">
                    <CheckCircle size={15} /> Profile updated successfully.
                  </div>
                )}
                {profileError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-4">
                    <AlertCircle size={15} /> {profileError}
                  </div>
                )}
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.fullName}
                      onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Role</label>
                    <div className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-500 capitalize">
                      {user.role}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Member Since</label>
                    <div className="px-4 py-2.5 rounded-lg bg-gray-50 border border-gray-200 text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={profileLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#0A2540" }}
                  >
                    {profileLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={14} />}
                    Save Changes
                  </button>
                </form>
              </div>

              {/* Change Password */}
              <div className="bg-white rounded-xl border border-gray-100 p-6">
                <h2 className="mb-5 flex items-center gap-2" style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.2rem" }}>
                  <Settings size={18} style={{ color: "#2D9CDB" }} /> Change Password
                </h2>
                {passSuccess && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-green-50 border border-green-100 text-sm text-green-600 mb-4">
                    <CheckCircle size={15} /> Password changed successfully.
                  </div>
                )}
                {passError && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-100 text-sm text-red-600 mb-4">
                    <AlertCircle size={15} /> {passError}
                  </div>
                )}
                <form onSubmit={handleChangePassword} className="space-y-4">
                  {[
                    { label: "Current Password", key: "current" as const, placeholder: "Your current password" },
                    { label: "New Password", key: "newPass" as const, placeholder: "At least 8 characters" },
                    { label: "Confirm New Password", key: "confirm" as const, placeholder: "Repeat new password" },
                  ].map(({ label, key, placeholder }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
                      <input
                        type="password"
                        value={passForm[key]}
                        onChange={(e) => setPassForm({ ...passForm, [key]: e.target.value })}
                        placeholder={placeholder}
                        className="w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    disabled={passLoading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 disabled:opacity-60"
                    style={{ backgroundColor: "#0A2540" }}
                  >
                    {passLoading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <CheckCircle size={14} />}
                    Update Password
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}