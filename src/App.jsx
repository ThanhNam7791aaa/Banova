import React, { useState } from 'react';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import CatalogPage from './pages/CatalogPage';
import ProductDetailPage from './pages/ProductDetailPage';
import QuizPage from './pages/QuizPage';
import CheckoutPage from './pages/CheckoutPage';
import SciencePage from './pages/SciencePage';
import ArticleDetailPage from './pages/ArticleDetailPage';

const INITIAL_CART_ITEMS = [
  {
    id: 'prod-01',
    name: 'Bột Tinh Bột Kháng Banova Tự Nhiên 500g',
    price: 159000,
    weight: '500g',
    rsTag: '5.8g RS2/khẩu phần',
    description: 'Hũ thủy tinh trung tính bảo toàn cấu trúc vi sinh RS2',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
  },
  {
    id: 'prod-03',
    name: 'Bột Banova Hộp 10 Gói 15g Tiện Lợi',
    price: 69000,
    weight: '10 Gói',
    rsTag: 'Tiện dụng văn phòng',
    description: 'Gói chia liều lượng chuẩn, hòa tan nhanh với sinh tố hoặc nước ấm',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  }
];

export default function App() {
  const [currentPath, setCurrentPath] = useState('trang-chu');
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [toastMessage, setToastMessage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleNavigate = (path) => {
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (product) => {
    const qty = product.quantity || 1;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id || `prod-${Date.now()}`,
          name: product.name,
          price: product.price || 159000,
          weight: product.weight || product.spec || 'Quy chuẩn',
          rsTag: product.rsTag || product.rsBadge || 'Chuẩn RS2 Gia Lai',
          description: product.description || 'Sản phẩm dinh dưỡng kháng tinh bột RS2',
          quantity: qty,
          image: product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
        }
      ];
    });
    showToast(`Đã thêm ${qty} "${product.name}" vào giỏ hàng!`);
  };

  const handleUpdateCartQty = (id, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const handleRemoveCartItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
  };

  const handleClearCart = () => {
    setCartItems([]);
    showToast('Đã dọn sạch giỏ hàng.');
  };

  const handleResetDemoCart = () => {
    setCartItems(INITIAL_CART_ITEMS);
    showToast('Đã khôi phục giỏ hàng mẫu.');
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setCurrentPath('san-pham-chi-tiet');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenCart = () => {
    handleNavigate('gio-hang');
  };

  return (
    <MainLayout
      currentPath={currentPath}
      onNavigate={handleNavigate}
      cartCount={cartCount}
      onOpenCart={handleOpenCart}
    >
      {/* Toast thông báo nhanh */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-space-md py-3 rounded-xl bg-primary text-on-primary shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 border border-secondary-fixed/30">
          <span className="material-symbols-outlined text-secondary-fixed text-[20px]">check_circle</span>
          <span className="font-label-md text-label-md font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* 1. Trang Chủ */}
      {currentPath === 'trang-chu' && (
        <HomePage 
          onNavigate={handleNavigate} 
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 2. Trang Danh Sách Sản Phẩm (Catalog) */}
      {currentPath === 'san-pham' && (
        <CatalogPage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {/* 3. Trang Chi Tiết Sản Phẩm (Product Detail) */}
      {currentPath === 'san-pham-chi-tiet' && (
        <ProductDetailPage
          product={selectedProduct}
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 4. Trang Quiz Tư Vấn Sức Khỏe (Health Quiz) */}
      {currentPath === 'quiz-tu-van' && (
        <QuizPage
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 5. Trang Giỏ Hàng & Đặt Hàng Thanh Toán (Checkout Flow) */}
      {(currentPath === 'gio-hang' || currentPath === 'dat-hang') && (
        <CheckoutPage
          cartItems={cartItems}
          onUpdateQty={handleUpdateCartQty}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onResetDemoCart={handleResetDemoCart}
          onNavigate={handleNavigate}
          initialStep={currentPath === 'dat-hang' ? 2 : 1}
        />
      )}

      {/* 6. Trang Góc Khoa Học & Blog (Science Hub) */}
      {(currentPath === 'goc-khoa-hoc' || currentPath === 'khoa-hoc') && (
        <SciencePage
          onNavigate={handleNavigate}
          onSelectArticle={(art) => {
            setSelectedArticle(art);
            setCurrentPath('goc-khoa-hoc-chi-tiet');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      )}

      {/* 7. Trang Chi Tiết Bài Báo Khoa Học (Article Detail) */}
      {currentPath === 'goc-khoa-hoc-chi-tiet' && (
        <ArticleDetailPage
          article={selectedArticle}
          onNavigate={handleNavigate}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* 8. Màn hình tạm cho các route đang tiếp tục phát triển */}
      {currentPath !== 'trang-chu' && 
       currentPath !== 'san-pham' && 
       currentPath !== 'san-pham-chi-tiet' && 
       currentPath !== 'quiz-tu-van' && 
       currentPath !== 'gio-hang' && 
       currentPath !== 'dat-hang' && 
       currentPath !== 'goc-khoa-hoc' && 
       currentPath !== 'khoa-hoc' && 
       currentPath !== 'goc-khoa-hoc-chi-tiet' && (
        <div className="max-w-7xl mx-auto px-gutter py-24 text-center">
          <div className="p-space-xl rounded-3xl bg-surface-container-lowest shadow-sm max-w-xl mx-auto space-y-4 border border-surface-container">
            <span className="material-symbols-outlined text-secondary text-[48px]">construction</span>
            <h2 className="font-headline-md text-headline-md text-primary font-bold">
              Phân hệ đang xây dựng
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Bạn đang ở phân hệ: <strong className="text-secondary">{currentPath}</strong>. Sẵn sàng nhận mã HTML từ Stitch để tiếp tục chuyển đổi!
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => handleNavigate('quiz-tu-van')}
                className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-secondary text-on-secondary font-label-lg font-bold shadow-xs hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors"
              >
                Làm Quiz Tư Vấn
              </button>
              <button
                type="button"
                onClick={() => handleNavigate('goc-khoa-hoc')}
                className="inline-flex items-center gap-2 px-space-md py-2.5 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-xs hover:bg-primary-container transition-colors"
              >
                Góc Khoa Học
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
}
