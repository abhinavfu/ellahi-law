import { RouterProvider } from "react-router";
import { Toaster } from "sonner";
import { router } from "./routes";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";

export default function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
            },
          }}
          richColors
        />
      </BlogProvider>
    </AuthProvider>
  );
}
