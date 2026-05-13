import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ScrollProgress from "./components/layout/ScrollProgress";
import CustomCursor from "./components/layout/CustomCursor";
import WhatsAppFloat from "./components/layout/WhatsAppFloat";
import Home from "./pages/Home";
import Work from "./pages/Work";
import ProjectDetails from "./pages/ProjectDetails";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Clients from "./pages/Clients";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminProjects from "./admin/AdminProjects";
import AdminMedia from "./admin/AdminMedia";
import AdminClients from "./admin/AdminClients";
import ProtectedRoute from "./admin/ProtectedRoute";
import useLenis from "./hooks/useLenis";

function App() {
  useLenis();

  return (
    <div className="app-shell">
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<ProjectDetails />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminProjects />} />
            <Route path="media" element={<AdminMedia />} />
            <Route path="clients" element={<AdminClients />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <WhatsAppFloat />
      <Footer />
    </div>
  );
}

export default App;
