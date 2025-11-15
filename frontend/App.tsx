import { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import AdminPage from "./components/AdminPage";

export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    const isAdminRoute = window.location.pathname === "/admin";
    setShowAdmin(isAdminRoute);
  }, []);

  if (showAdmin) {
    return <AdminPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Services />
      <Gallery />
      <About />
      <ContactForm />
      <Footer />
    </div>
  );
}
