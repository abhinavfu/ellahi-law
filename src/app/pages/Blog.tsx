import { useState, useMemo } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search, ChevronLeft, ChevronRight, BookOpen, PenLine } from "lucide-react";
import { useBlog, BLOG_CATEGORIES } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { BlogCard } from "../components/BlogCard";

const POSTS_PER_PAGE = 6;

export function Blog() {
  const { posts } = useBlog();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ["All", ...BLOG_CATEGORIES];

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      const matchSearch =
        !search ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [posts, search, selectedCategory]);

  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);
  const featuredPost = currentPage === 1 && !search && selectedCategory === "All" ? posts[0] : null;
  const gridPosts = featuredPost ? paginated.filter((p) => p.id !== featuredPost.id) : paginated;

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearch = (val: string) => {
    setSearch(val);
    setCurrentPage(1);
  };

  return (
    <div style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Hero */}
      <section style={{ backgroundColor: "#0A2540" }} className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-gradient-to-br from-blue-400 to-transparent" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen size={20} className="text-blue-400" />
              <span className="text-blue-300 text-sm font-medium tracking-wider uppercase">Legal Insights</span>
            </div>
            <h1
              className="text-white mb-4"
              style={{ fontFamily: '"Playfair Display", serif', fontSize: "2.75rem", lineHeight: 1.2 }}
            >
              Ellahi Law Blog
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Practical legal insights for Ontario residents, business owners, and real estate investors — written by our team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[64px] lg:top-[80px] z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-300 focus:bg-white transition-colors"
              />
            </div>

            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 flex-shrink-0"
                  style={{
                    backgroundColor: selectedCategory === cat ? "#0A2540" : "#F3F4F6",
                    color: selectedCategory === cat ? "#FFFFFF" : "#6B7280",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Write post CTA */}
            {user && (
              <Link
                to="/dashboard"
                className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-white flex-shrink-0 transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#2D9CDB" }}
              >
                <PenLine size={14} />
                Write Post
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <BookOpen size={48} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-gray-400 text-lg mb-2">No articles found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your search or category filter.</p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("All"); }}
                className="mt-4 text-sm font-medium transition-colors"
                style={{ color: "#2D9CDB" }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <>
              {/* Featured post */}
              {featuredPost && (
                <div className="mb-10">
                  <BlogCard post={featuredPost} featured index={0} />
                </div>
              )}

              {/* Grid */}
              {gridPosts.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {gridPosts.map((post, i) => (
                    <BlogCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                      style={{
                        backgroundColor: currentPage === page ? "#0A2540" : "transparent",
                        color: currentPage === page ? "#FFFFFF" : "#6B7280",
                        border: currentPage === page ? "none" : "1px solid #E5E7EB",
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:border-blue-300 hover:text-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4" style={{ backgroundColor: "#F8FAFC" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="mb-3"
            style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.75rem" }}
          >
            Need Legal Advice?
          </h2>
          <p className="text-gray-500 mb-6 text-sm leading-relaxed">
            Our team is ready to discuss your legal matter. Book a consultation with Ellahi Law today.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-lg text-sm font-medium text-white transition-all duration-200 hover:opacity-90 hover:-translate-y-px"
            style={{ backgroundColor: "#0A2540" }}
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
