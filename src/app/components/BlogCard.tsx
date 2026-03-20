import { Link } from "react-router";
import { motion } from "motion/react";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import { BlogPost } from "../context/BlogContext";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
  index?: number;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  "Real Estate Law": { bg: "#EBF5FC", text: "#1A6A9A" },
  "Business Law": { bg: "#EEF7F0", text: "#1A6A3A" },
  "Civil Litigation": { bg: "#FEF3E8", text: "#A05A1A" },
  "Wills & Estates": { bg: "#F3EFFE", text: "#6A3AAA" },
  General: { bg: "#F3F4F6", text: "#4A5568" },
};

export function BlogCard({ post, featured = false, index = 0 }: BlogCardProps) {
  const categoryColor = CATEGORY_COLORS[post.category] || CATEGORY_COLORS["General"];
  const formattedDate = new Date(post.date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (featured) {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
      >
        <div className="overflow-hidden h-64 lg:h-auto">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
            >
              {post.category}
            </span>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Featured</span>
          </div>
          <h2
            className="mb-3 group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540" }}
          >
            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-5 line-clamp-3">{post.excerpt}</p>
          <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
            <span className="flex items-center gap-1.5">
              <User size={12} />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {formattedDate}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors group/btn"
            style={{ color: "#2D9CDB" }}
          >
            Read Article
            <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col"
    >
      <div className="overflow-hidden h-52 flex-shrink-0">
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
          >
            {post.category}
          </span>
        </div>
        <h3
          className="mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
          style={{ fontFamily: '"Playfair Display", serif', color: "#0A2540" }}
        >
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 flex-wrap">
            <Tag size={11} className="text-gray-300" />
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <User size={11} />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={11} />
              {formattedDate}
            </span>
          </div>
          <Link
            to={`/blog/${post.slug}`}
            className="text-xs font-medium flex items-center gap-1 transition-colors group/btn"
            style={{ color: "#2D9CDB" }}
          >
            Read More
            <ArrowRight size={11} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
