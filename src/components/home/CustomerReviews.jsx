import React from 'react';

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: 'Chị Thu Hằng',
      ageAndJob: '32 tuổi • Nhân viên ngân hàng (TP. Quy Nhơn)',
      avatarChar: 'H',
      avatarBg: 'bg-secondary-container text-on-secondary-container',
      content: '"Làm việc ít vận động bụng hay đầy hơi, khó chịu buổi xế chiều. Từ ngày uống 1 ly tinh bột kháng Banova mỗi sáng với sữa chua, tiêu hóa êm ru, nhẹ nhõm hẳn. Đặt ở Quy Nhơn nhận hàng trong 2 tiếng."'
    },
    {
      id: 2,
      name: 'Bác Minh Tuấn',
      ageAndJob: '58 tuổi • Cán bộ hưu trí (Gia Lai)',
      avatarChar: 'T',
      avatarBg: 'bg-primary-fixed text-primary',
      content: '"Tôi kiểm soát đường huyết chặt chẽ, dùng Banova thay thế một phần bột mì khi làm bánh và khuấy nước ấm uống trước bữa chính. Chỉ số đường huyết sau ăn rất ổn định, bác sĩ theo dõi cũng khen ngợi."'
    },
    {
      id: 3,
      name: 'Bạn Hoàng Long',
      ageAndJob: '26 tuổi • Fitness Coach & Marathoner',
      avatarChar: 'L',
      avatarBg: 'bg-tertiary-fixed text-tertiary',
      content: '"Pha chung với whey smoothie cực kỳ hợp lý, bột mịn màng không mùi gắt, uống vào no lâu đến tận trưa mà không bị thèm ăn vặt linh tinh trong giai đoạn siết cơ. Sản phẩm tự nhiên rất đáng tiền."'
    }
  ];

  const standards = [
    {
      id: 'std-1',
      icon: 'eco',
      title: '100% Nguồn Gốc Tự Nhiên',
      desc: 'Không pha trộn tinh bột phụ'
    },
    {
      id: 'std-2',
      icon: 'verified',
      title: 'Chuối Xanh Chuẩn OCOP',
      desc: 'Vùng nguyên liệu sạch Gia Lai'
    },
    {
      id: 'std-3',
      icon: 'block',
      title: '0% Chất Bảo Quản',
      desc: 'Không chất tạo màu hay hương liệu'
    },
    {
      id: 'std-4',
      icon: 'biotech',
      title: 'Đã Kiểm Nghiệm RS2',
      desc: 'Phân tích độc lập tại phòng lab'
    }
  ];

  return (
    <section className="w-full py-space-xl bg-surface-container-low">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-space-xs mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
            CÂU CHUYỆN KHÁCH HÀNG THỰC TẾ
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
            Khách hàng nói gì về trải nghiệm Banova tại Quy Nhơn &amp; Toàn quốc
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Hành trình phục hồi hệ tiêu hóa và cân bằng trao đổi chất từ các khách hàng đã tin tưởng đồng hành cùng chuối xanh Gia Lai.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-lg mb-space-xl">
          {reviews.map((item) => (
            <div 
              key={item.id} 
              className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-md flex flex-col justify-between space-y-space-md border border-surface-container/40"
            >
              <div className="space-y-space-sm">
                <div className="flex items-center gap-1 text-on-tertiary-container">
                  {[...Array(5)].map((_, i) => (
                    <span 
                      key={i} 
                      className="material-symbols-outlined text-[18px]" 
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
                  {item.content}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-space-xs border-t border-surface-container/50">
                <div className={`w-10 h-10 rounded-full ${item.avatarBg} flex items-center justify-center font-bold font-headline-sm shrink-0`}>
                  {item.avatarChar}
                </div>
                <div>
                  <h4 className="font-label-lg text-label-lg font-bold text-primary">
                    {item.name}
                  </h4>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    {item.ageAndJob}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Strip */}
        <div className="p-space-lg rounded-2xl bg-surface-container-lowest shadow-sm border border-surface-container">
          <div className="text-center font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant font-bold mb-space-md">
            TIÊU CHUẨN KIỂM SOÁT CHẤT LƯỢNG BANOVA
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
            {standards.map((std) => (
              <div key={std.id} className="flex flex-col items-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-secondary-container/40 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[24px]">{std.icon}</span>
                </div>
                <h5 className="font-headline-sm text-body-md font-bold text-primary">
                  {std.title}
                </h5>
                <p className="font-body-sm text-[12px] text-on-surface-variant">
                  {std.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
