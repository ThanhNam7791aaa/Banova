import ErrorBoundary from './components/common/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import QuizPage from './pages/QuizPage';
import CheckoutPage from './pages/CheckoutPage';
import SciencePage from './pages/SciencePage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ContactPage from './pages/ContactPage';
import FaqPage from './pages/FaqPage';
import { useCartStore } from './store/cartStore';

/**
 * Tự động cuộn lên đầu trang khi thay đổi URL
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy state và action từ Zustand Store (lưu bền vững qua localStorage)
  const {
    cartItems,
    toastMessage,
    hideToast,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    resetDemoCart,
    getTotalCount
  } = useCartStore();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  /**
   * Adapter tương thích ngược cho các component cũ vẫn gọi onNavigate(path)
   */
  const handleNavigate = (path) => {
    if (!path) return;
    if (path.startsWith('/')) {
      navigate(path);
      return;
    }
    const routeMap = {
      'trang-chu': '/',
      'san-pham': '/san-pham',
      'san-pham-chi-tiet': selectedProduct ? `/san-pham/${selectedProduct.slug || selectedProduct.id}` : '/san-pham',
      'quiz-tu-van': '/quiz',
      'quiz': '/quiz',
      'gio-hang': '/gio-hang',
      'dat-hang': '/dat-hang',
      'khoa-hoc': '/khoa-hoc',
      'goc-khoa-hoc': '/khoa-hoc',
      'goc-khoa-hoc-chi-tiet': selectedArticle ? `/khoa-hoc/${selectedArticle.slug || selectedArticle.id}` : '/khoa-hoc',
      'lien-he': '/lien-he',
      'faq': '/faq'
    };
    navigate(routeMap[path] || '/');
  };

  const handleOpenCart = () => {
    navigate('/gio-hang');
  };

  return (
    <>
      <ScrollToTop />
      <ErrorBoundary>
      <MainLayout
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        cartCount={getTotalCount()}
        onOpenCart={handleOpenCart}
      >
        {/* Toast thông báo toàn cục */}
        {toastMessage && (
          <div 
            onClick={hideToast}
            className="fixed bottom-6 right-6 z-50 px-space-md py-3 rounded-xl bg-primary text-on-primary shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-secondary-fixed/30 cursor-pointer"
          >
            <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
            <span className="font-label-md text-label-md font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Hệ thống Routing Thật bằng React Router */}
        <Routes>
          {/* 1. Trang Chủ */}
          <Route 
            path="/" 
            element={
              <HomePage 
                onNavigate={handleNavigate} 
                onAddToCart={addItem} 
              />
            } 
          />

          {/* 2. Danh Sách Sản Phẩm (Catalog) */}
          <Route 
            path="/san-pham" 
            element={
              <CatalogPage 
                onNavigate={handleNavigate}
                onAddToCart={addItem}
                onSelectProduct={(product) => {
                  setSelectedProduct(product);
                  navigate(`/san-pham/${product.slug || product.id}`);
                }}
              />
            } 
          />

          {/* 3. Chi Tiết Sản Phẩm */}
          <Route 
            path="/san-pham/:slug" 
            element={
              <ProductDetailPage 
                product={selectedProduct}
                onNavigate={handleNavigate}
                onAddToCart={addItem}
              />
            } 
          />

          {/* 4. Quiz Tư Vấn Sức Khỏe */}
          <Route 
            path="/quiz" 
            element={
              <QuizPage 
                onNavigate={handleNavigate}
                onAddToCart={addItem}
              />
            } 
          />
          <Route path="/quiz-tu-van" element={<Navigate to="/quiz" replace />} />

          {/* 5. Giỏ Hàng */}
          <Route 
            path="/gio-hang" 
            element={
              <CheckoutPage
                cartItems={cartItems}
                onUpdateQty={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onResetDemoCart={resetDemoCart}
                onNavigate={handleNavigate}
                initialStep={1}
              />
            } 
          />

          {/* 6. Đặt Hàng & Thanh Toán (Checkout) */}
          <Route 
            path="/dat-hang" 
            element={
              <CheckoutPage
                cartItems={cartItems}
                onUpdateQty={updateQuantity}
                onRemoveItem={removeItem}
                onClearCart={clearCart}
                onResetDemoCart={resetDemoCart}
                onNavigate={handleNavigate}
                initialStep={2}
              />
            } 
          />

          {/* 7. Góc Khoa Học & Blog */}
          <Route 
            path="/khoa-hoc" 
            element={
              <SciencePage 
                onNavigate={handleNavigate}
                onSelectArticle={(art) => {
                  setSelectedArticle(art);
                  navigate(`/khoa-hoc/${art.slug || art.id}`);
                }}
              />
            } 
          />
          <Route path="/goc-khoa-hoc" element={<Navigate to="/khoa-hoc" replace />} />

          {/* 8. Chi Tiết Bài Báo Khoa Học */}
          <Route 
            path="/khoa-hoc/:slug" 
            element={
              <ArticleDetailPage 
                article={selectedArticle}
                onNavigate={handleNavigate}
                onAddToCart={addItem}
              />
            } 
          />

          {/* 9. Trang Liên Hệ & Showroom Quy Nhơn */}
          <Route 
            path="/lien-he" 
            element={<ContactPage />} 
          />

          {/* 10. Trang Câu Hỏi Thường Gặp (FAQ) */}
          <Route 
            path="/faq" 
            element={<FaqPage />} 
          />

          {/* 11. Fallback Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </MainLayout>
    </ErrorBoundary>
    </>
  );
}
