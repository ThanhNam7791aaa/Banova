import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';

export default function Header({ onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const storeCartCount = useCartStore((state) => state.getTotalCount());

  const navLinks = [
    { path: '/', label: 'Trang chủ' },
    { path: '/san-pham', label: 'Sản phẩm' },
    { path: '/khoa-hoc', label: 'Góc khoa học' },
    { path: '/quiz', label: 'Quiz tư vấn' },
    { path: '/faq', label: 'Hỏi đáp' },
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
            <img 
              alt="Banova Logo" 
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105" 
              src="https://lh3.googleusercontent.com/aida/AEtjO1WgP4WsIdxdYEdtPeHM3lCiPENS4A7Uly39qgS-H0AEr3vmJHDcitYxl5LUVCXeM7IcmcvtxNEK3oqtBXE9kvrzXplCmOZz4CngcxiTvLZPUhSFL7S-QRj0OaLJqyY5UTYliWCLrjaycvT_NSjuJwjiWC0Lc-NFcP6BQEJ51iyzRB2ps-BTH48RuTdb7gX23wam6mEydloIZoEGtuiIPgGFCCTEu7qy7Uu41id8kX_a6ydSH8-pUI120YE" 
            />
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
        <nav className="hidden lg:flex items-center gap-space-xs p-1 rounded-xl bg-surface-container-low/70">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`font-label-lg text-label-lg px-space-md py-space-sm rounded-lg transition-all ${
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
          {/* Search Trigger */}
          <Link
            to="/khoa-hoc"
            aria-label="Tìm kiếm thông tin khoa học" 
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </Link>

          {/* Cart Trigger */}
          <button 
            type="button"
            aria-label="Giỏ hàng dinh dưỡng" 
            onClick={handleCartClick}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {storeCartCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary font-label-sm text-[10px] ring-2 ring-surface-container-lowest font-bold shadow-xs">
                {storeCartCount}
              </span>
            )}
          </button>

          {/* CTA Nutrition Quiz */}
          <Link 
            to="/quiz"
            className="hidden sm:inline-flex items-center justify-center px-space-lg py-space-sm rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg shadow-xs hover:bg-primary transition-all duration-200"
          >
            Tư vấn dinh dưỡng
          </Link>

          {/* User Profile */}
          <Link
            to="/lien-he"
            aria-label="Tài khoản khách hàng"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
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
