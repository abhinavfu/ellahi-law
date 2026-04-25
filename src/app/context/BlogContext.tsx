import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import apiService from "../../services/api";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: string;
  tags: string[];
  author: string;
  authorId: string;
  date: string;
  updatedAt: string;
  metaDescription?: string;
  views?: number;
  likes?: number;
}

interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface BlogContextType {
  posts: BlogPost[];
  pagination: PaginationMeta | null;
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
  getPostBySlug: (slug: string) => BlogPost | undefined;
  getPostsByAuthor: (username: string) => BlogPost[];
  createPost: (data: Omit<BlogPost, "id" | "date" | "updatedAt">, imageFile?: File) => Promise<BlogPost | null>;
  updatePost: (id: string, data: Partial<BlogPost>, imageFile?: File) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  fetchAllPosts: (page?: number, limit?: number, category?: string) => Promise<void>;
  fetchPostsByCategory: (category: string, page?: number) => Promise<void>;
  searchPosts: (query: string, page?: number) => Promise<void>;
  clearError: () => void;
}

const BlogContext = createContext<BlogContextType | null>(null);

export const BLOG_CATEGORIES = [
  "Real Estate Law",
  "Business Law",
  "Civil Litigation",
  "Wills & Estates",
  "General",
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function BlogProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from backend on mount
  useEffect(() => {
    fetchAllPosts();
  }, []);

  // Transform backend API response to BlogPost format
  const transformPost = (apiPost: any): BlogPost => ({
    id: apiPost.id?.toString() || "",
    title: apiPost.title || "",
    slug: apiPost.slug || "",
    excerpt: apiPost.excerpt || "",
    content: apiPost.content || "",
    featuredImage: apiPost.image || "",
    category:
      apiPost.category_detail?.name ||
      apiPost.category ||
      "General",
    tags:
      Array.isArray(apiPost.tags_detail)
        ? apiPost.tags_detail.map((tag: any) => tag.name ?? tag)
        : apiPost.tags || [],
    author: apiPost.author || "",
    authorId: apiPost.author_id?.toString() || apiPost.id?.toString() || "",
    date: apiPost.created_at || new Date().toISOString(),
    updatedAt: apiPost.updated_at || new Date().toISOString(),
    metaDescription: apiPost.meta_description || "",
    views: apiPost.views || 0,
    likes: apiPost.likes || 0,
  });

  const sync = (updated: BlogPost[], paginationData?: PaginationMeta) => {
    const sorted = [...updated].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPosts(sorted);
    if (paginationData) setPagination(paginationData);
  };

  const fetchAllPosts = async (page = 1, limit = 10, category?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.getAllPosts(page, limit, category);

      if (response.success && response.data) {
        const data = response.data as any;
        const fetchedPosts = Array.isArray(data) ? data : data.posts || data.data || [];
        const transformedPosts = fetchedPosts.map(transformPost);
        const paginationData = data.pagination || { page, limit, total: transformedPosts.length, pages: 1 };

        sync(transformedPosts, paginationData);
        if (category) setSelectedCategory(category);
      } else {
        setError(response.error || "Failed to fetch posts");
        setPosts([]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch posts");
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostsByCategory = async (category: string, page = 1) => {
    setIsLoading(true);
    setError(null);
    setSelectedCategory(category);

    try {
      const response = await apiService.getPostsByCategory(category, page, 10);

      if (response.success && response.data) {
        const data = response.data as any;
        const fetchedPosts = Array.isArray(data) ? data : data.posts || data.data || [];
        const transformedPosts = fetchedPosts.map(transformPost);
        const paginationData = data.pagination || { page, limit: 10, total: transformedPosts.length, pages: 1 };

        sync(transformedPosts, paginationData);
      } else {
        setError(response.error || "Failed to fetch category posts");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch category posts");
    } finally {
      setIsLoading(false);
    }
  };

  const searchPosts = async (query: string, page = 1) => {
    if (!query.trim()) {
      fetchAllPosts();
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await apiService.searchPosts(query, page, 10);

      if (response.success && response.data) {
        const data = response.data as any;
        const searchResults = Array.isArray(data) ? data : data.posts || data.data || [];
        const transformedPosts = searchResults.map(transformPost);
        const paginationData = data.pagination || { page, limit: 10, total: transformedPosts.length, pages: 1 };

        sync(transformedPosts, paginationData);
      } else {
        setError(response.error || "Search failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Search failed");
    } finally {
      setIsLoading(false);
    }
  };

  const getPostBySlug = (slug: string) => posts.find((p) => p.slug === slug);

  const getPostsByAuthor = (username: string) => posts.filter((p) => p.author === username);

  const createPost = async (
    data: Omit<BlogPost, "id" | "date" | "updatedAt">,
    imageFile?: File
  ): Promise<BlogPost | null> => {
    try {
      const response = await apiService.createPost(data, imageFile);

      if (response.success && response.data) {
        const newPost = transformPost(response.data);
        sync([newPost, ...posts]);
        return newPost;
      } else {
        setError(response.error || "Failed to create post");
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to create post";
      setError(errorMsg);
      return null;
    }
  };

  const updatePost = async (id: string, data: Partial<BlogPost>, imageFile?: File) => {
    try {
      const response = await apiService.updatePost(id, data, imageFile);

      if (response.success && response.data) {
        const transformedPost = transformPost(response.data);
        const updated = posts.map((p) => (p.id === id ? transformedPost : p));
        sync(updated);
      } else {
        setError(response.error || "Failed to update post");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update post");
    }
  };

  const deletePost = async (id: string) => {
    try {
      const response = await apiService.deletePost(id);

      if (response.success) {
        const updated = posts.filter((p) => p.id !== id);
        sync(updated);
      } else {
        setError(response.error || "Failed to delete post");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete post");
    }
  };

  const clearError = () => setError(null);

  return (
    <BlogContext.Provider
      value={{
        posts,
        pagination,
        selectedCategory,
        isLoading,
        error,
        getPostBySlug,
        getPostsByAuthor,
        createPost,
        updatePost,
        deletePost,
        fetchAllPosts,
        fetchPostsByCategory,
        searchPosts,
        clearError,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within BlogProvider");
  return ctx;
}

export { slugify };
