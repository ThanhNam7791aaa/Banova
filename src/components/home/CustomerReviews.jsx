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

  // GỘP TẤT CẢ TIÊU CHUẨN VÀO 1 DẢI BẢO CHỨNG DUY NHẤT VÀ MẠNH NHẤT
  const certifications = [
    {
      id: 'cert-1',
      icon: 'verified',
      title: 'HACCP & ISO 22000',
      desc: 'Quy chuẩn an toàn chế biến thực phẩm y sinh quốc tế'
    },
    {
      id: 'cert-2',
      icon: 'eco',
      title: 'OCOP 4 Sao Gia Lai',
      desc: 'Nông sản chuối xanh đất đỏ bazan vùng Đak Đoa'
    },
    {
      id: 'cert-3',
      icon: 'science',
      title: 'Kiểm Định QUATEST 3',
      desc: 'Định lượng hoạt tính kháng tinh bột RS2 độc lập'
    },
    {
      id: 'cert-4',
      icon: 'spa',
      title: '100% Tự Nhiên (0% Phụ Gia)',
      desc: 'Không đường tinh luyện, không chất bảo quản'
    }
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-surface-container-low/50">
      <div className="max-w-7xl mx-auto px-gutter">
        
        {/* Header phá vỡ rập khuôn: Căn trái kết hợp rating badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">forum</span>
              <span className="font-label-md text-label-md font-bold text-primary">Chia sẻ từ người dùng</span>
              <span className="text-outline-variant hidden sm:inline">•</span>
              <span className="font-body-sm text-[12px] text-on-surface-variant">Nội dung do khách hàng cung cấp</span>
            </div>
            <h2 className="font-headline-lg text-headline-md sm:text-headline-lg text-primary font-extrabold tracking-tight">
              Phản Hồi Từ Người Dùng Banova Hằng Ngày
            </h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Câu chuyện cải thiện chức năng tiêu hóa và giữ nhịp trao đổi chất ổn định từ khách hàng tại Quy Nhơn và các tỉnh thành.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          {reviews.map((item) => (
            <div 
              key={item.id} 
              className="p-5 rounded-2xl bg-surface-container-lowest shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 border border-surface-container"
            >
              <p className="font-body-md text-body-sm sm:text-body-md text-on-surface italic leading-relaxed">
                {item.content}
              </p>

              <div className="flex items-center gap-3 pt-3 border-t border-surface-container/60">
                <div className={`w-9 h-9 rounded-full ${item.avatarBg} flex items-center justify-center font-bold text-sm shrink-0`}>
                  {item.avatarChar}
                </div>
                <div>
                  <h4 className="font-label-md text-label-md font-bold text-primary">
                    {item.name}
                  </h4>
                  <p className="font-body-sm text-[11px] text-on-surface-variant">
                    {item.ageAndJob}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DẢI BẢO CHỨNG DUY NHẤT & MẠNH NHẤT TOÀN TRANG (Gộp từ các chip trùng lặp) */}
        <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm border border-secondary/25">
          <div className="text-center mb-6">
            <span className="font-label-sm text-[11px] uppercase tracking-widest text-secondary font-bold bg-secondary-container/50 px-3 py-1 rounded-full">
              HỆ THỐNG TIÊU CHUẨN KIỂM SOÁT CHẤT LƯỢNG BANOVA
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary shrink-0 shadow-2xs">
                  <span className="material-symbols-outlined text-[24px]">{cert.icon}</span>
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-label-md text-label-md font-bold text-primary">
                    {cert.title}
                  </h4>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-snug">
                    {cert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
