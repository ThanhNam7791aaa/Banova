import React from 'react';

export default function ScienceOverview({ onNavigate = () => {} }) {
  const steps = [
    {
      step: '01',
      organ: 'Dạ Dày',
      badge: 'Không phân hủy',
      badgeColor: 'bg-surface-container-high text-primary',
      icon: 'shield_with_heart',
      summary: 'Kháng 100% acid dịch vị, giữ nguyên cấu trúc tinh thể B-type.'
    },
    {
      step: '02',
      organ: 'Ruột Non',
      badge: 'Bỏ qua enzyme',
      badgeColor: 'bg-secondary-container text-secondary',
      icon: 'fast_forward',
      summary: 'Không bị amylase phân giải, không gây tăng đường huyết đột ngột.'
    },
    {
      step: '03',
      organ: 'Đại Tràng',
      badge: 'Lên men kỵ khí',
      badgeColor: 'bg-primary-container text-secondary-fixed',
      icon: 'biotech',
      summary: 'Lợi khuẩn Bifidobacterium lên men chậm rãi trong 24 giờ.'
    },
    {
      step: '04',
      organ: 'Sinh Butyrate',
      badge: 'Phục hồi niêm mạc',
      badgeColor: 'bg-secondary text-on-secondary',
      icon: 'vital_signs',
      summary: 'Tạo acid béo SCFA, kích hoạt GLP-1 no lâu và nuôi tế bào ruột.'
    }
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-surface-container-low/60 border-y border-surface-container/60">
      <div className="max-w-7xl mx-auto px-gutter">
        
        {/* Layout Header 2 cột phá vỡ sự rập khuôn */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
          <div className="space-y-1.5 max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              Cơ chế chuyển hóa sinh học
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-extrabold tracking-tight">
              Hành Trình RS2 Đi Qua Hệ Tiêu Hóa
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md hidden sm:block">
              Khác với tinh bột thường biến thành đường ở ruột non, Tinh bột kháng Banova đi thẳng xuống đại tràng để nuôi dưỡng vi sinh.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('goc-khoa-hoc')}
              className="inline-flex items-center gap-1 text-secondary font-label-md font-bold hover:underline shrink-0 cursor-pointer"
            >
              <span>Xem tài liệu y khoa</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* SƠ ĐỒ 1 DÒNG TRỰC QUAN (Nhìn 3 giây là hiểu) */}
        <div className="relative">
          {/* Đường line kết nối chạy ngầm trên desktop */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 -translate-y-1/2 h-0.5 bg-surface-container-highest z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {steps.map((item, index) => (
              <div 
                key={item.step}
                className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all border border-surface-container flex flex-col justify-between space-y-4 group"
              >
                {/* Top: Số bước & Icon */}
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-outline-variant font-mono font-bold group-hover:text-secondary transition-colors">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-all shadow-xs">
                    <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                  </div>
                </div>

                {/* Giữa: Tên vị trí & Badge trạng thái */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <h3 className="font-label-lg text-label-lg font-bold text-primary">
                      {item.organ}
                    </h3>
                    <span className={`font-label-sm text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  </div>
                  {/* Dưới: Mô tả 1 dòng ngắn */}
                  <p className="font-body-sm text-[13px] text-on-surface-variant leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {/* Bottom connector indicator for mobile/tablet */}
                {index < steps.length - 1 && (
                  <div className="flex lg:hidden justify-center pt-1 text-outline-variant">
                    <span className="material-symbols-outlined text-[18px]">south</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
