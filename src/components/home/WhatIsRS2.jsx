import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Section giải thích "RS2 là gì" bằng ngôn ngữ đơn giản,
 * đặt ngay dưới Hero trên trang chủ.
 */
export default function WhatIsRS2() {
  const cards = [
    {
      icon: 'nutrition',
      title: 'RS2 là gì?',
      desc: 'RS2 (tinh bột kháng loại 2) là tinh bột tự nhiên trong chuối xanh, không bị tiêu hóa ở dạ dày và ruột non mà đi thẳng xuống đại tràng.'
    },
    {
      icon: 'favorite',
      title: 'Tác dụng chính',
      desc: 'Nuôi dưỡng vi khuẩn có lợi, giúp bạn no lâu hơn sau bữa sáng và hỗ trợ ổn định đường huyết sau ăn.'
    },
    {
      icon: 'eco',
      title: 'Nguồn gốc',
      desc: 'Chế biến từ chuối xanh Gia Lai thu hoạch đúng độ già, sấy lạnh dưới 60°C để giữ nguyên hoạt tính RS2.'
    }
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-low/40 border-y border-surface-container/60">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="max-w-2xl mx-auto text-center space-y-space-xs mb-space-lg">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm uppercase tracking-widest font-bold">
            <span className="material-symbols-outlined text-[15px]">help</span>
            Hiểu đúng về sản phẩm
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Tinh bột kháng RS2 là gì?
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Ba điều cần biết trước khi chọn sản phẩm cho bữa sáng của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {cards.map((card) => (
            <div
              key={card.title}
              className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs hover:shadow-md transition-all space-y-space-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[26px]">{card.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{card.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-space-md pt-space-lg">
          <Link
            to="/khoa-hoc"
            className="inline-flex items-center gap-1.5 text-secondary font-label-lg text-label-lg font-bold hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            Đọc thêm tài liệu khoa học
          </Link>
          <span className="text-outline-variant hidden sm:inline">•</span>
          <Link
            to="/faq"
            className="inline-flex items-center gap-1.5 text-secondary font-label-lg text-label-lg font-bold hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">quiz</span>
            Câu hỏi thường gặp
          </Link>
        </div>
      </div>
    </section>
  );
}
