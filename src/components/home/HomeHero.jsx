import React from 'react';

export default function HomeHero({ onNavigate = () => {} }) {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-8 lg:py-16">
      {/* Ambient Organic Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-secondary-fixed/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-48 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-lg items-center">
          
          {/* CỘT NỘI DUNG CHÍNH (Desktop: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-space-md order-1">
            
            {/* Top Micro-badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container border border-secondary-container/50">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                100% Chuối Xanh Gia Lai • Dinh Dưỡng Vi Sinh RS2
              </span>
            </div>

            {/* Headline chính: Fix lỗi gạch chân đứt đoạn bằng gradient highlight đồng khối */}
            <h1 className="font-headline-xl text-headline-lg sm:text-headline-xl text-primary tracking-tight font-extrabold leading-tight">
              Khởi tạo sức khỏe đường ruột &amp; Cân bằng đường huyết với{' '}
              <span className="inline-block text-secondary font-black bg-secondary-container/40 px-2 py-0.5 rounded-lg border border-secondary/20">
                Tinh Bột Kháng Banova
              </span>
            </h1>

            {/* Paragraph ngắn gọn, súc tích */}
            <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
              Giải pháp bổ sung Prebiotic RS2 tự nhiên sấy lạnh, nuôi dưỡng lợi khuẩn đại tràng tạo SCFA Butyrate, giúp no lâu và duy trì chỉ số đường huyết ổn định cả ngày.
            </p>

            {/* Micro-callout: Trả lời ngay "Bán cái gì, bao nhiêu, mua ở đâu" */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-highest/60 max-w-lg">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
              <div className="flex-1 text-body-sm text-[13px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-primary">Hũ 500g chỉ từ 159.000₫</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-secondary font-semibold">Hộp 10 gói 69.000₫</span>
                </div>
                <div className="flex items-center gap-1.5 text-secondary font-medium text-[12px] mt-0.5">
                  <span className="material-symbols-outlined text-[15px]">bolt</span>
                  <span>Giao hỏa tốc 2H tại TP. Quy Nhơn • Freeship toàn quốc</span>
                </div>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('san-pham')}
                className="inline-flex items-center justify-center gap-2 px-space-lg sm:px-space-xl py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Xem sản phẩm &amp; Đặt mua</span>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('quiz-tu-van')}
                className="inline-flex items-center justify-center gap-2 px-space-md py-3 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold shadow-xs hover:bg-surface-container-low transition-all border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
                <span>Quiz tư vấn 1 phút</span>
              </button>
            </div>

            {/* 4 Fast Metrics Strip: 4 ĐẶC TÍNH SẢN PHẨM ĐỒNG NHẤT (Không lẫn lộn vận chuyển) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 max-w-xl">
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">72%</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">RS2 Tự nhiên</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-secondary font-extrabold leading-none">100%</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Chuối xanh Gia Lai</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">&lt; 45</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Chỉ số GI Thấp</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-secondary font-extrabold leading-none">0g</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Đường phụ gia</span>
              </div>
            </div>

            {/* Social Proof ngắn gọn */}
            <div className="flex items-center gap-3 pt-1 text-on-surface-variant text-body-sm text-[12px]">
              <div className="flex items-center text-on-tertiary-container">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                ))}
              </div>
              <span><strong>4.9/5</strong> từ 5,000+ khách hàng tại Quy Nhơn &amp; toàn quốc</span>
            </div>
          </div>

          {/* CỘT HÌNH ẢNH SẢN PHẨM TRỰC DIỆN (Desktop: 5 cols, Mobile: Hiển thị ngay) */}
          <div className="lg:col-span-5 relative order-2 mt-4 lg:mt-0">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest group border border-surface-container">
              <img 
                className="w-full h-[320px] sm:h-[420px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Bột Tinh bột kháng Banova từ chuối xanh Gia Lai cao cấp" 
                src="/images/banova-hero.png"
                onError={(e) => {
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqa_jt624o8HUAT2L3DCgmIH8lj7JDzY9hEyCulc0vpxi-qJi76ezOhoCeTYetbjkV88S64vi8ZOK6J2qvOwHrF_K4_vl5WwDwTNtVJnU8AWwjytW2824ntI1ggSxngDqUFjSxdoLflmtjkAragjyo2GbHl-lfT5RPzBSGKW1AuR_ipWaDDPvgRs9KHe5yOFCYriNFuO0mYGPnX8BiHobBqWjmLifzB0hO60ver-rqpxtd2P1QedEF';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Tag 1: Lên men SCFA Butyrate */}
              <div className="absolute top-4 left-4 p-2 sm:p-2.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md flex items-center gap-2 border border-surface-container">
                <span className="material-symbols-outlined text-secondary text-[20px]">biotech</span>
                <span className="font-label-sm text-[11px] sm:text-label-sm text-primary font-bold">
                  Kháng Thủy Phân Dạ Dày • Tạo Butyrate
                </span>
              </div>

              {/* Floating Tag 2: Giá & Quy chuẩn trực tiếp (Bỏ badge trùng lặp) */}
              <div className="absolute bottom-4 right-4 p-2 sm:p-2.5 px-3 rounded-xl bg-primary/95 backdrop-blur-md text-on-primary shadow-md flex items-center gap-2 border border-primary-container">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px]">sell</span>
                <div className="flex flex-col text-right">
                  <span className="font-label-sm text-[10px] uppercase text-primary-fixed-dim">Giá niêm yết</span>
                  <span className="font-headline-sm text-label-md sm:text-headline-sm font-extrabold text-secondary-fixed font-mono leading-none">
                    159.000 ₫
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
