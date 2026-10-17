import React from 'react';
import Header from './Header';
import MedicalDisclaimer from './MedicalDisclaimer';
import Footer from './Footer';

export default function MainLayout({ 
  children, 
  currentPath = 'trang-chu', 
  onNavigate = () => {},
  cartCount = 2,
  onOpenCart = () => {}
}) {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-secondary-container selection:text-on-secondary-container min-h-screen flex flex-col">
      {/* 1. Header điều hướng cố định */}
      <Header 
        currentPath={currentPath} 
        onNavigate={onNavigate} 
        cartCount={cartCount}
        onOpenCart={onOpenCart}
      />

      {/* 2. Nội dung chính của trang (chèn qua children) */}
      <main className="w-full pt-20 bg-surface min-h-[calc(100vh-80px)] flex-1">
        {children}
      </main>

      {/* 3. Khuyến cáo khoa học & y tế bắt buộc */}
      <MedicalDisclaimer />

      {/* 4. Chân trang 4 cột */}
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
