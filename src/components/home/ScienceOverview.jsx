import React from 'react';

export default function ScienceOverview({ onNavigate = () => {} }) {
  const scienceFeatures = [
    {
      id: 1,
      badge: 'Prebiotic Thế Hệ Mới',
      title: 'Nuôi dưỡng vi khuẩn có lợi',
      description: 'Tinh bột kháng RS2 không bị phân hủy tại dạ dày, tiến thẳng xuống đại tràng để lên men thành Axit Béo Chuỗi Ngắn (SCFA) nuôi dưỡng hệ vi sinh microbiome khỏe mạnh.',
      statLabel: 'Hiệu suất lên men',
      statValue: '94% tại đại tràng',
      icon: 'coronavirus',
      iconBg: 'bg-secondary-container/40',
      iconColor: 'text-secondary'
    },
    {
      id: 2,
      badge: 'Chỉ số GI Thấp < 45',
      title: 'Không gây vọt đường huyết',
      description: 'Chỉ số đường huyết cực thấp, giải phóng năng lượng chậm rãi và ổn định, lý tưởng cho người cần kiểm soát đường huyết sau bữa ăn và hỗ trợ độ nhạy insulin.',
      statLabel: 'Chỉ số đường huyết',
      statValue: 'GI < 45 (An toàn)',
      icon: 'show_chart',
      iconBg: 'bg-primary-fixed/40',
      iconColor: 'text-primary-container'
    },
    {
      id: 3,
      badge: 'Kích thích Peptide YY',
      title: 'No lâu & Hỗ trợ vóc dáng',
      description: 'Kích thích hormone peptide YY và GLP-1 tạo cảm giác no tự nhiên kéo dài 4-6 tiếng, giảm sự thèm ăn vặt mà không gây mệt mỏi hay thiếu hụt dưỡng chất thiết yếu.',
      statLabel: 'Thời gian no tự nhiên',
      statValue: '4 - 6 Giờ',
      icon: 'speed',
      iconBg: 'bg-tertiary-fixed/50',
      iconColor: 'text-on-tertiary-container'
    }
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-space-xs mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
            CƠ CHẾ Y SINH HỌC TỰ NHIÊN
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Khoa học về Tinh Bột Kháng (Resistant Starch) đối với Đường Ruột
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Không giống tinh bột thông thường phân giải thành đường glucose tại ruột non, Tinh bột kháng RS2 tự nhiên chuối xanh vượt qua tiêu hóa dạ dày để đến đại tràng trọn vẹn.
          </p>
        </div>

        {/* 3 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg">
          {scienceFeatures.map((item) => (
            <div 
              key={item.id} 
              className="relative p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 border border-surface-container/40"
            >
              <div className="space-y-space-md">
                <div className={`w-14 h-14 rounded-2xl ${item.iconBg} flex items-center justify-center ${item.iconColor}`}>
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>
                <div className="space-y-space-xs">
                  <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
                    {item.badge}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                    {item.title}
                  </h3>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-space-md pt-space-sm flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-surface-container">
                <span>{item.statLabel}</span>
                <span className="font-bold text-secondary">{item.statValue}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Biological Diagram Mini Strip */}
        <div className="mt-space-xl p-space-md rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col lg:flex-row items-center justify-between gap-space-md border border-surface-container">
          <div className="flex items-center gap-space-md">
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-on-secondary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[24px]">science</span>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-label-lg font-bold text-primary">
                Chứng nhận phân tích hàm lượng độc lập
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Kiểm nghiệm định kỳ tại Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3 (QUATEST 3).
              </span>
            </div>
          </div>
          <button 
            type="button"
            onClick={() => onNavigate('goc-khoa-hoc')}
            className="inline-flex items-center gap-1.5 font-label-lg text-label-lg text-secondary hover:text-primary font-bold shrink-0 transition-colors"
          >
            <span>Xem tài liệu nghiên cứu y khoa</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </section>
  );
}
