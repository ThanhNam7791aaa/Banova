import React from 'react';

export default function HomeHero({ onNavigate = () => {} }) {
  return (
    <section className="relative w-full overflow-hidden bg-surface py-space-xl lg:py-24">
      {/* Ambient Organic Background Glows */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 -right-48 w-96 h-96 bg-primary-fixed/40 rounded-full blur-3xl pointer-events-none -z-10" />
      
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
          {/* Hero Content Left (7 cols) */}
          <div className="lg:col-span-7 flex flex-col space-y-space-lg">
            {/* Science Badge */}
            <div className="inline-flex items-center gap-2 self-start px-space-md py-1.5 rounded-full bg-secondary-container/30 text-on-secondary-container shadow-xs border border-secondary-container/40">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                🌿 NGUỒN DINH DƯỠNG XANH TỪ GIA LAI 100% TỰ NHIÊN
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold leading-tight">
              Khởi tạo sức khỏe đường ruột &amp; Cân bằng đường huyết với{' '}
              <span className="text-secondary underline decoration-secondary-fixed decoration-4 underline-offset-8">
                Tinh Bột Kháng Banova
              </span>
            </h1>

            {/* Body Description */}
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
              Giải pháp dinh dưỡng tự nhiên giàu chất xơ hòa tan &amp; prebiotic RS2 chuẩn y sinh học từ chuối xanh cao nguyên Gia Lai, hỗ trợ tạo acid béo chuỗi ngắn SCFA, duy trì cảm giác no lâu và giữ chỉ số đường huyết ổn định cả ngày.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <button
                type="button"
                onClick={() => onNavigate('san-pham')}
                className="inline-flex items-center justify-center gap-2.5 px-space-xl py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>Khám phá sản phẩm</span>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('quiz-tu-van')}
                className="inline-flex items-center justify-center gap-2 px-space-lg py-3.5 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold shadow-xs hover:bg-surface-container-low transition-all"
              >
                <span className="material-symbols-outlined text-secondary text-[20px]">psychology_alt</span>
                <span>Làm Quiz tư vấn 1 phút</span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-wrap items-center gap-space-md pt-space-xs">
              <div className="flex -space-x-2.5 overflow-hidden">
                <div className="inline-block h-10 w-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">face</span>
                </div>
                <div className="inline-block h-10 w-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">face_2</span>
                </div>
                <div className="inline-block h-10 w-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold shadow-xs">
                  <span className="material-symbols-outlined text-[20px]">face_3</span>
                </div>
                <div className="inline-block h-10 w-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface font-label-md text-label-md shadow-xs">
                  +5k
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-on-tertiary-container">
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold ml-1">4.9/5</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hơn <strong>5,000+</strong> bữa sáng lành mạnh đã được phục vụ tại Quy Nhơn &amp; Gia Lai
                </p>
              </div>
            </div>

            {/* 4 Fast Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-md">
              <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">72%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">RS2 Tự nhiên</span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-secondary font-extrabold leading-none">100%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Chuối xanh Gia Lai</span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-none">0g</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Đường phụ gia</span>
              </div>
              <div className="p-space-sm rounded-xl bg-surface-container-lowest shadow-xs flex flex-col justify-center border border-surface-container">
                <div className="flex items-center gap-1 text-secondary font-extrabold">
                  <span className="material-symbols-outlined text-[20px]">bolt</span>
                  <span className="font-headline-sm text-headline-sm leading-none">2H</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant mt-1">Hỏa tốc TP. Quy Nhơn</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Right (5 cols) */}
          <div className="lg:col-span-5 relative mt-space-lg lg:mt-0">
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest group border border-surface-container">
              {/* Sử dụng ảnh sản phẩm chất lượng cao banova-hero.png */}
              <img 
                className="w-full h-[480px] lg:h-[540px] object-cover transition-transform duration-700 group-hover:scale-105" 
                alt="Tinh bột kháng Banova từ chuối xanh Gia Lai cao cấp" 
                src="/images/banova-hero.png"
                onError={(e) => {
                  // Fallback nếu ảnh local chưa nạp xong
                  e.target.src = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqa_jt624o8HUAT2L3DCgmIH8lj7JDzY9hEyCulc0vpxi-qJi76ezOhoCeTYetbjkV88S64vi8ZOK6J2qvOwHrF_K4_vl5WwDwTNtVJnU8AWwjytW2824ntI1ggSxngDqUFjSxdoLflmtjkAragjyo2GbHl-lfT5RPzBSGKW1AuR_ipWaDDPvgRs9KHe5yOFCYriNFuO0mYGPnX8BiHobBqWjmLifzB0hO60ver-rqpxtd2P1QedEF';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Card 1: Microbiome SCFA */}
              <div className="absolute top-6 left-6 max-w-[240px] p-space-sm rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg flex items-start gap-2.5 border border-surface-container">
                <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-secondary-container text-[18px]">biotech</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-primary font-bold">SCFA Butyrate</span>
                  <span className="font-body-sm text-[11px] leading-tight text-on-surface-variant">
                    Lên men tại đại tràng nuôi dưỡng tế bào biểu mô ruột
                  </span>
                </div>
              </div>

              {/* Floating Card 2: Clinical Badges */}
              <div className="absolute bottom-6 right-6 p-space-sm px-space-md rounded-xl bg-primary/90 backdrop-blur-md text-on-primary shadow-lg flex items-center gap-2 border border-primary-container">
                <span className="material-symbols-outlined text-secondary-fixed text-[20px]">verified</span>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm uppercase font-bold tracking-wide">Tiêu chuẩn quốc tế</span>
                  <span className="font-body-sm text-[11px] text-primary-fixed-dim">HACCP • ISO 22000 • OCOP 4 Sao</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
