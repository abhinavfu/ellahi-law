import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { RealEstate } from "./pages/RealEstate";
import { BusinessLaw } from "./pages/BusinessLaw";
import { CivilLitigation } from "./pages/CivilLitigation";
import { WillsEstates } from "./pages/WillsEstates";
import { Contact } from "./pages/Contact";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { DashboardPage } from "./pages/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "real-estate", Component: RealEstate },
      { path: "business-law", Component: BusinessLaw },
      { path: "civil-litigation", Component: CivilLitigation },
      { path: "wills-estates", Component: WillsEstates },
      { path: "contact", Component: Contact },
      { path: "blog", Component: Blog },
      { path: "blog/:slug", Component: BlogPost },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "forgot-password", Component: ForgotPassword },
      { path: "dashboard", Component: DashboardPage },
    ],
  },
]);
