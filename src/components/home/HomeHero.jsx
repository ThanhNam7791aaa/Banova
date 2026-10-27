import React from 'react';

export default function HomeHero({ onNavigate = () => {} }) {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-6 sm:py-8 lg:py-16">
      {/* Ambient Organic Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-secondary-fixed/25 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-48 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-gutter-lg items-center">
          
          {/* CỘT NỘI DUNG CHÍNH (Desktop: 7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            
            {/* 1. Micro-badge */}
            <div className="inline-flex items-center gap-2 self-start px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container border border-secondary-container/50">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-[11px] sm:text-label-sm uppercase tracking-wider text-secondary font-bold">
                100% Chuối Xanh Gia Lai • Dinh Dưỡng Vi Sinh RS2
              </span>
            </div>

            {/* 2. Headline chính: Giải quyết triệt để lỗi gạch chân đứt quãng bằng khối pill gradient */}
            <div className="space-y-1">
              <h1 className="font-headline-xl text-2xl sm:text-headline-lg lg:text-headline-xl text-primary font-extrabold tracking-tight leading-tight">
                Khởi tạo sức khỏe đường ruột &amp; Cân bằng đường huyết với{' '}
                <span className="inline-block text-secondary font-black bg-secondary-container/40 px-2.5 py-0.5 rounded-lg border border-secondary/20">
                  Tinh Bột Kháng Banova
                </span>
              </h1>
              <p className="font-body-md text-sm sm:text-body-md text-on-surface-variant leading-relaxed">
                Giải pháp bổ sung Prebiotic RS2 tự nhiên sấy lạnh, nuôi dưỡng lợi khuẩn đại tràng tạo SCFA Butyrate, giúp no lâu và duy trì chỉ số đường huyết ổn định.
              </p>
            </div>

            {/* 3. Khối Sản phẩm & Giá trên Mobile (Hiển thị ngay lập tức, không bắt cuộn 3 màn hình) */}
            <div className="block lg:hidden my-1">
              <div className="relative rounded-2xl overflow-hidden shadow-md bg-surface-container-lowest border border-surface-container">
                <div className="relative h-56 sm:h-72 w-full">
                  <img 
                    className="w-full h-full object-cover" 
                    alt="Bột Tinh bột kháng Banova từ chuối xanh Gia Lai cao cấp" 
                    src="/images/banova-hero.png"
                    onError={(e) => {
                      e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqa_jt624o8HUAT2L3DCgmIH8lj7JDzY9hEyCulc0vpxi-qJi76ezOhoCeTYetbjkV88S64vi8ZOK6J2qvOwHrF_K4_vl5WwDwTNtVJnU8AWwjytW2824ntI1ggSxngDqUFjSxdoLflmtjkAragjyo2GbHl-lfT5RPzBSGKW1AuR_ipWaDDPvgRs9KHe5yOFCYriNFuO0mYGPnX8BiHobBqWjmLifzB0hO60ver-rqpxtd2P1QedEF';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating Price Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md border border-surface-container">
                    <div>
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase block">Hũ 500g nguyên chất</span>
                      <span className="font-headline-sm text-base font-extrabold text-primary font-mono leading-none">
                        159.000₫
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onNavigate('san-pham')}
                      className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <span>Mua ngay</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Micro-callout trên Desktop: Trả lời ngay "Bán cái gì, bao nhiêu, mua ở đâu" */}
            <div className="hidden lg:flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-surface-container-highest/60 max-w-lg">
              <div className="w-10 h-10 rounded-lg bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">inventory_2</span>
              </div>
              <div className="flex-1 text-body-sm text-[13px]">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-primary">Hũ 500g: 159.000₫</span>
                  <span className="text-outline-variant">•</span>
                  <span className="text-secondary font-semibold">Hộp 10 gói: 69.000₫</span>
                </div>
                <div className="text-on-surface-variant font-medium text-[12px] mt-0.5">
                  Bột nguyên chất · Không đường · Không chất bảo quản
                </div>
              </div>
            </div>

            {/* 5. Action CTAs: xếp dọc full-width trên mobile để chữ không bị gãy dòng */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('san-pham')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-lg sm:px-space-xl py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Xem sản phẩm &amp; Đặt mua</span>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('quiz-tu-van')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-space-md py-3 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold shadow-xs hover:bg-surface-container-low transition-all border border-surface-container cursor-pointer"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
                <span>Quiz tư vấn 1 phút</span>
              </button>
            </div>

            {/* 6. Hai chỉ số cốt lõi — bớt 4 thẻ để giảm nhiễu */}
            <div className="grid grid-cols-2 gap-2.5 pt-2 max-w-sm">
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">5,8g</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">RS2 mỗi khẩu phần</span>
              </div>
              <div className="p-2.5 rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">&lt; 60°C</span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1">Sấy lạnh giữ RS2</span>
              </div>
            </div>

            {/* 7. Trustline ngắn — bỏ các con số chưa kiểm chứng (rating/khách hàng) */}
            <p className="pt-1 text-on-surface-variant text-[13px]">
              Giao hỏa tốc 2H tại TP. Quy Nhơn · Miễn phí vận chuyển toàn quốc
            </p>
          </div>

          {/* CỘT HÌNH ẢNH SẢN PHẨM TRỰC DIỆN (Desktop: 5 cols) */}
          <div className="hidden lg:block lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest group border border-surface-container">
              <img 
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Bột Tinh bột kháng Banova từ chuối xanh Gia Lai cao cấp" 
                src="/images/banova-hero.png"
                onError={(e) => {
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqa_jt624o8HUAT2L3DCgmIH8lj7JDzY9hEyCulc0vpxi-qJi76ezOhoCeTYetbjkV88S64vi8ZOK6J2qvOwHrF_K4_vl5WwDwTNtVJnU8AWwjytW2824ntI1ggSxngDqUFjSxdoLflmtjkAragjyo2GbHl-lfT5RPzBSGKW1AuR_ipWaDDPvgRs9KHe5yOFCYriNFuO0mYGPnX8BiHobBqWjmLifzB0hO60ver-rqpxtd2P1QedEF';
                }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
