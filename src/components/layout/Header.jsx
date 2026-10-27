import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Header({ onOpenCart, cartCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const storeCartCount = useCartStore((state) => state.getTotalCount());
  const displayCartCount = cartCount || storeCartCount;

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/san-pham', label: 'Sản phẩm' },
    { path: '/khoa-hoc', label: 'Góc khoa học' },
    { path: '/quiz', label: 'Quiz tư vấn' },
    { path: '/faq', label: 'Hỏi đáp' },
    { path: '/gioi-thieu', label: 'Giới thiệu' },
    { path: '/lien-he', label: 'Liên hệ' }
  ];

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      navigate('/gio-hang');
    }
  };

  const isLinkActive = (itemPath) => {
    if (itemPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(itemPath);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
        {/* Brand Logo */}
        <div className="flex items-center gap-space-md">
          <Link 
            to="/" 
            className="flex items-center gap-space-sm group"
          >
            {/* Logo dạng SVG nội tuyến: không phụ thuộc URL ngoài, không bao giờ vỡ ảnh */}
            <svg
              aria-hidden="true"
              className="h-9 w-9 shrink-0 transition-transform group-hover:scale-105"
              viewBox="0 0 40 40"
              fill="none"
            >
              <rect width="40" height="40" rx="12" fill="#012d1d" />
              <path
                d="M20 8.5c5.6 3.4 8.8 8.3 8.8 13.9 0 5.6-3.9 9.8-8.8 9.8s-8.8-4.2-8.8-9.8c0-5.6 3.2-10.5 8.8-13.9Z"
                fill="#92f7c3"
              />
              <path d="M20 12.5v17.5" stroke="#012d1d" strokeWidth="1.6" strokeLinecap="round" />
              <path
                d="M20 20.5c2.6-1.6 5-2.3 7.2-2.3M20 25.5c-2.4-1.4-4.7-2-6.8-2"
                stroke="#012d1d"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold leading-none">
                BANOVA
              </span>
              <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest">
                Gia Lai Natural RS2
              </span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-0.5 p-1 rounded-xl bg-surface-container-low/70">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-label-md text-[13px] px-2.5 py-2 rounded-lg transition-all whitespace-nowrap ${
                  active
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-space-sm">
          {/* Cart Trigger */}
          <button 
            type="button"
            aria-label="Giỏ hàng dinh dưỡng" 
            onClick={handleCartClick}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {displayCartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] ring-2 ring-surface-container-lowest font-bold shadow-xs">
                {displayCartCount}
              </span>
            )}
          </button>

          {/* CTA Nutrition Quiz */}
          <Link 
            to="/quiz"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl bg-primary-container text-on-primary font-label-md text-[13px] shadow-xs hover:bg-primary transition-all duration-200 whitespace-nowrap"
          >
            Tư vấn dinh dưỡng
          </Link>

          {/* Mobile Menu Hamburger */}
          <button 
            type="button"
            aria-label="Menu điều hướng di động" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-surface-container-lowest border-b border-surface-container px-gutter py-space-md space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-space-md py-space-sm rounded-lg font-label-lg text-label-lg transition-colors ${
                isLinkActive(link.path)
                  ? 'bg-primary-container text-on-primary font-bold'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 sm:hidden">
            <Link
              to="/quiz"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold"
            >
              Tư vấn dinh dưỡng
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
