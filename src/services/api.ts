// const API_BASE_URL = "http://127.0.0.1:8000/api";
const API_BASE_URL = "http://api.mainapp.tech/api"; // hostinger VPS

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

class ApiService {
  // ===== TOKEN HANDLING =====
  private getAuthToken(): string | null {
    return localStorage.getItem("authToken");
  }

  private clearAuth() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  // ===== HEADERS =====
  private getHeaders(requireAuth = true, isFormData = false): HeadersInit {
    const headers: HeadersInit = {};

    if (!isFormData) {
      headers["Content-Type"] = "application/json";
    }

    if (requireAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return headers;
  }

  // ===== CORE REQUEST =====
  async request<T>(
    endpoint: string,
    options: RequestInit = {},
    requireAuth: boolean = true,
    isFormData: boolean = false
  ): Promise<ApiResponse<T>> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(requireAuth, isFormData),
          ...(options.headers || {}),
        },
      });

      const json = await response.json();
      
      // Auto logout on unauthorized
      if (response.status === 401) {
        this.clearAuth();
        window.location.href = "/login";
      }

      if (!response.ok) {
        // Handle Django REST framework error format
        const errorMessage = json.detail ||
                           json.error ||
                           (json.non_field_errors && json.non_field_errors[0]) ||
                           (json.username && json.username[0]) ||
                           (json.password && json.password[0]) ||
                           `HTTP ${response.status}`;
                           
        throw new Error(errorMessage);
      }

      return {
        success: true,
        data: json.data || json,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  }

  // ===== AUTH ENDPOINTS =====

  async login(username: string, password: string) {
		const response = await this.request<{
			user: any;
			access: string;
			refresh: string;
		}>("/auth/login/", {
			method: "POST",
			body: JSON.stringify({ username, password }),
		}, false); // No auth needed

		if (response.success && response.data) {
			const accessToken = response.data.access;

			if (accessToken && typeof window !== "undefined") {
				localStorage.setItem("authToken", accessToken); // ✅ safe
				localStorage.setItem("user", JSON.stringify(response.data.user));
				console.log("Token stored in localStorage:", localStorage.getItem("authToken"));
			}
		}

		return response;
	}

  async register(name: string, email: string, password: string) {
    return this.request(
      "/auth/register/",
      {
        method: "POST",
        body: JSON.stringify({ username: name.replace(" ", "_"), email: email, password: password }),
      },
      false
    );
  }

  async forgotPassword(email: string) {
    return this.request(
      "/auth/forgot-password/",
      {
        method: "POST",
        body: JSON.stringify({ email }),
      },
      false
    );
  }

  async resetPassword(token: string, password: string) {
    return this.request(
      "/auth/reset-password/",
      {
        method: "POST",
        body: JSON.stringify({ token, password }),
      },
      false
    );
  }

  async logout() {
    this.clearAuth();
  }

  // ===== BLOG ENDPOINTS =====

  async getAllPosts(page = 1, limit = 10, category?: string) {
    let endpoint = `/blog/posts/?page=${page}&limit=${limit}`;
    if (category) endpoint += `&category=${encodeURIComponent(category)}`;
    return this.request(endpoint, {}, false); // 👈 public
  }

  async getPostBySlug(slug: string) {
    return this.request(`/blog/posts/${slug}/`, {}, false);
  }

  async getPostById(id: string) {
    return this.request(`/blog/posts/id/${id}/`, {}, false);
  }

  async getPostsByAuthor(authorId: string, page = 1, limit = 10) {
    return this.request(
      `/blog/posts/author/${authorId}/?page=${page}&limit=${limit}`,
      {},
      false
    );
  }

  async createPost(postData: any, imageFile?: File) {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(postData).forEach(key => {
        if (postData[key] !== null && postData[key] !== undefined && key !== 'featuredImage') {
          formData.append(key, postData[key]);
        }
      });
      formData.append('image', imageFile);
      return this.request("/blog/posts/", {
        method: "POST",
        body: formData,
      }, true, true); // isFormData = true
    } else {
      return this.request("/blog/posts/", {
        method: "POST",
        body: JSON.stringify(postData),
      });
    }
  }

  async updatePost(id: string, postData: any, imageFile?: File) {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(postData).forEach(key => {
        if (postData[key] !== null && postData[key] !== undefined && key !== 'featuredImage') {
          formData.append(key, postData[key]);
        }
      });
      formData.append('image', imageFile);
      return this.request(`/blog/posts/${id}/`, {
        method: "PUT",
        body: formData,
      }, true, true); // isFormData = true
    } else {
      return this.request(`/blog/posts/${id}/`, {
        method: "PUT",
        body: JSON.stringify(postData),
      });
    }
  }

  async deletePost(id: string) {
    return this.request(`/blog/posts/${id}/`, {
      method: "DELETE",
    });
  }

  async searchPosts(query: string, page = 1, limit = 10) {
    return this.request(
      `/blog/posts/search/?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      {},
      false
    );
  }

  async getPostsByCategory(category: string, page = 1, limit = 10) {
    return this.request(
      `/blog/category/${encodeURIComponent(category)}/?page=${page}&limit=${limit}`,
      {},
      false
    );
  }

  // ===== USER ENDPOINTS =====

  async getUserProfile(userId: string) {
    return this.request(`/users/${userId}/`);
  }

  async updateUserProfile(userId: string, data: any) {
    return this.request(`/users/${userId}/`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async changePassword(oldPassword: string, newPassword: string) {
    return this.request("/auth/change-password/", {
      method: "POST",
      body: JSON.stringify({ old_password: oldPassword, new_password: newPassword }),
    });
  }
}

export default new ApiService();