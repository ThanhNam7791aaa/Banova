import React from 'react';
import HomeHero from '../components/home/HomeHero';
import ScienceOverview from '../components/home/ScienceOverview';
import FeaturedProducts from '../components/home/FeaturedProducts';
import QuizTeaser from '../components/home/QuizTeaser';
import CustomerReviews from '../components/home/CustomerReviews';

export default function HomePage({ 
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Showcase với ảnh chuối xanh Gia Lai thực tế */}
      <HomeHero onNavigate={onNavigate} />

      {/* 2. Khoa học về Tinh bột kháng RS & SCFA */}
      <ScienceOverview onNavigate={onNavigate} />

      {/* 3. Sản phẩm tiêu biểu (4 SKU) */}
      <FeaturedProducts onNavigate={onNavigate} onAddToCart={onAddToCart} />

      {/* 4. Banner trắc nghiệm Quiz tư vấn 1 phút */}
      <QuizTeaser onNavigate={onNavigate} />

      {/* 5. Đánh giá khách hàng & Cam kết chất lượng */}
      <CustomerReviews />
    </div>
  );
}
