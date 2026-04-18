import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Calendar, User, Tag, ArrowLeft, Share2, Pencil, Clock } from "lucide-react";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import { BlogCard } from "../components/BlogCard";

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Real Estate Law": { bg: "#EBF5FC", text: "#1A6A9A" },
  "Business Law": { bg: "#EEF7F0", text: "#1A6A3A" },
  "Civil Litigation": { bg: "#FEF3E8", text: "#A05A1A" },
  "Wills & Estates": { bg: "#F3EFFE", text: "#6A3AAA" },
  General: { bg: "#F3F4F6", text: "#4A5568" },
};

function estimateReadTime(content: string): number {
  const words = content.replace(/<[^>]*>/g, " ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, getPostBySlug } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();

  const post = getPostBySlug(slug || "");

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-2xl font-semibold text-gray-700 mb-2" style={{ fontFamily: '"Playfair Display", serif' }}>
          Article Not Found
        </h1>
        <p className="text-gray-500 mb-6 text-sm">The article you're looking for doesn't exist or has been removed.</p>
        <Link
          to="/blog"
          className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-colors hover:opacity-90"
          style={{ backgroundColor: "#0A2540" }}
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  const categoryColor = CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"];
  const readTime = estimateReadTime(post.content);
  const formattedDate = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const canEdit = user && (user.username === post.author || user.role === "admin");

  const related = posts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  const renderContent = (html: string) => {
    const lines = html.split("\n");
    const processed = lines
      .map((line) => {
        const trimmed = line.trim();
        if (!trimmed) return "";
        if (trimmed.startsWith("<")) return trimmed;
        return `<p>${trimmed}</p>`;
      })
      .join("\n");
    return processed;
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: post.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <article style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Hero */}
      <div className="relative h-80 sm:h-96 lg:h-[480px] overflow-hidden">
        <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10">
          <div className="max-w-4xl mx-auto">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full mb-4 inline-block"
              style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
            >
              {post.category}
            </span>
            <h1
              className="text-white mt-2"
              style={{ fontFamily: '"Playfair Display", serif', fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1.2 }}
            >
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-gray-100 bg-white sticky top-[64px] lg:top-[80px] z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 flex-wrap">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back</span>
            </button>
            <div className="flex items-center gap-1.5">
              <User size={13} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={13} />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} />
              <span>{readTime} min read</span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            {canEdit && (
              <Link
                to={`/dashboard?edit=${post.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
              >
                <Pencil size={12} />
                Edit
              </Link>
            )}
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Excerpt */}
          <p className="text-lg text-gray-600 leading-relaxed mb-10 pb-10 border-b border-gray-100 italic">
            {post.excerpt}
          </p>

          {/* Article body */}
          <div
            className="blog-content text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={14} className="text-gray-400" />
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* CTA Box */}
      <div className="py-12 px-4" style={{ backgroundColor: "#EBF5FC" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h3
            className="mb-3"
            style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.5rem" }}
          >
            Have Questions About This Topic?
          </h3>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Our legal team is available to discuss your specific situation. Book a consultation with Ellahi Law — no obligation.
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90 hover:-translate-y-px"
            style={{ backgroundColor: "#0A2540" }}
          >
            Book a Consultation
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2
              className="mb-8 text-center"
              style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540", fontSize: "1.5rem" }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <BlogCard key={p.id} post={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .blog-content h2 {
          font-family: "Playfair Display", serif;
          font-size: 1.5rem;
          color: #0A2540;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .blog-content h3 {
          font-family: "Playfair Display", serif;
          font-size: 1.2rem;
          color: #0A2540;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
          color: #374151;
        }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
          color: #374151;
        }
        .blog-content blockquote {
          border-left: 4px solid #2D9CDB;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: #EBF5FC;
          border-radius: 0 0.5rem 0.5rem 0;
          color: #1A6A9A;
          font-style: italic;
        }
        .blog-content strong {
          color: #0A2540;
          font-weight: 600;
        }
        .blog-content a {
          color: #2D9CDB;
          text-decoration: underline;
        }
      `}</style>
    </article>
  );
}
