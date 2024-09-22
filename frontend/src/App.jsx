import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore";
import useCartStore from "./stores/useCartStore";
import { useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import LoadingSpinner from "./components/LoadingSpinner";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import CartPage from "./pages/CartPage";
import PurchaseSuccess from "./pages/PurchaseSuccess";
import { isMobile } from "react-device-detect";

function App() {
  const { user, authorize, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(isMobile);
  const [isMobileState, setIsMobileState] = useState(isMobile);

  useEffect(() => {
    authorize();
  }, [authorize]);

  useEffect(() => {
    if (!user) return;
    getCartItems();
  }, [getCartItems, user]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && !isMobileState) {
        setIsMobileState(true);
      } else {
        setIsMobileState(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const handleMobileMenuOpen = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_theme(colors.slate.700)_0%,_theme(colors.slate.800)_50%,_theme(colors.slate.900)_100%)]" />
        </div>
      </div>

      <div className="relative z-50">
        <Navbar
          isMobile={isMobileState}
          mobileMenuOpen={mobileMenuOpen}
          handleMobileMenuOpen={handleMobileMenuOpen}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={
              user?.role === "admin" ? <AdminPage /> : <Navigate to="/login" />
            }
          />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route
            path="/cart"
            element={user ? <CartPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/purchase-success"
            element={user ? <PurchaseSuccess /> : <Navigate to="/login" />}
          />
          <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
}

export default App;
