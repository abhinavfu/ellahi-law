import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { RealEstate } from "./pages/RealEstate";
import { HomePurchasesSales } from "./pages/realEstate/HomePurchasesSales";
import { CondominiumPurchasesSales } from "./pages/realEstate/CondominiumPurchasesSales";
import { SurvivalshipApplications } from "./pages/realEstate/SurvivalshipApplications";
import { StandardRefinance } from "./pages/realEstate/StandardRefinance";
import { IndependentLegalAdvice } from "./pages/realEstate/IndependentLegalAdvice";
import { MatrimonialDesignations } from "./pages/realEstate/MatrimonialDesignations";
import { LeaseAgreementsDrafting } from "./pages/realEstate/LeaseAgreementsDrafting";
import { PreConstructionReview } from "./pages/realEstate/PreConstructionReview";
import { PrivateMortgageLending } from "./pages/realEstate/PrivateMortgageLending";
import { TitleTransfers } from "./pages/realEstate/TitleTransfers";
import { RegistrationCautions } from "./pages/realEstate/RegistrationCautions";
import { RegistrationLiens } from "./pages/realEstate/RegistrationLiens";
import { BusinessLaw } from "./pages/BusinessLaw";
import { CivilLitigation } from "./pages/CivilLitigation";
import { WillsEstates } from "./pages/WillsEstates";
import { CriminalDefence } from "./pages/CriminalDefence";
import { Notary } from "./pages/Notary";
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
      { path: "real-estate/home-purchases-and-sales", Component: HomePurchasesSales },
      { path: "real-estate/condominium-purchases-and-sales", Component: CondominiumPurchasesSales },
      { path: "real-estate/survivorship-applications", Component: SurvivalshipApplications },
      { path: "real-estate/standard-refinance", Component: StandardRefinance },
      { path: "real-estate/independent-legal-advice", Component: IndependentLegalAdvice },
      { path: "real-estate/matrimonial-designations", Component: MatrimonialDesignations },
      { path: "real-estate/lease-agreements-drafting", Component: LeaseAgreementsDrafting },
      { path: "real-estate/preconstruction-review", Component: PreConstructionReview },
      { path: "real-estate/private-mortgage-lending", Component: PrivateMortgageLending },
      { path: "real-estate/title-transfers", Component: TitleTransfers },
      { path: "real-estate/registration-cautions", Component: RegistrationCautions },
      { path: "real-estate/registration-liens", Component: RegistrationLiens },
      { path: "business-law", Component: BusinessLaw },
      { path: "civil-litigation", Component: CivilLitigation },
      { path: "wills-estates", Component: WillsEstates },
      { path: "criminal-defence", Component: CriminalDefence },
      { path: "notary", Component: Notary },
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
