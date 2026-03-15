import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { RealEstate } from "./pages/RealEstate";
import { BusinessLaw } from "./pages/BusinessLaw";
import { CivilLitigation } from "./pages/CivilLitigation";
import { WillsEstates } from "./pages/WillsEstates";
import { Contact } from "./pages/Contact";

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
    ],
  },
]);
