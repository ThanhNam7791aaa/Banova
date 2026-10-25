import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  const milestones = [
    {
      period: 'Q4/2026',
      title: 'Kiểm chứng thị trường',
      desc: 'Khảo sát 200 người tại Quy Nhơn, thử nghiệm sản phẩm, hoàn thiện công thức và hồ sơ pháp lý.'
    },
    {
      period: 'Q1/2027',
      title: 'Ra mắt tại Quy Nhơn',
      desc: 'Bán trực tiếp tại điểm bán nhỏ, giao bữa sáng theo gói, kênh Zalo OA và các sàn TMĐT.'
    },
    {
      period: 'Cuối 2027',
      title: 'Mở rộng B2B & toàn tỉnh',
      desc: 'Hợp tác khách sạn, resort, gym, quán cà phê và mở rộng kênh phân phối trong tỉnh.'
    },
    {
      period: '2028',
      title: 'Online toàn quốc',
      desc: 'Mở rộng bán online toàn quốc cho dòng bột và cookie hạn dùng dài.'
    }
  ];

  const values = [
    {
      icon: 'verified_user',
      title: 'Minh bạch nguồn gốc',
      desc: 'Nguyên liệu chuối xanh từ vùng đất bazan Gia Lai, quy trình sấy lạnh giữ trọn cấu trúc RS2.'
    },
    {
      icon: 'science',
      title: 'Dữ liệu kiểm nghiệm',
      desc: 'Hàm lượng tinh bột kháng và chất xơ được công bố theo phiếu kiểm nghiệm độc lập.'
    },
    {
      icon: 'gavel',
      title: 'Tuân thủ pháp lý',
      desc: 'Sản phẩm là thực phẩm bổ sung, không phải thuốc và không thay thế thuốc chữa bệnh.'
    },
    {
      icon: 'support_agent',
      title: 'Đồng hành dinh dưỡng',
      desc: 'Thực đơn gợi ý 7 ngày và kênh hỏi đáp dinh dưỡng cùng chuyên viên Banova.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full bg-gradient-to-b from-surface-container-low via-surface to-surface py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="max-w-3xl space-y-space-md">
            <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container/40">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              DỰ ÁN KHỞI NGHIỆP · GIA LAI – BÌNH ĐỊNH
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              Về Banova
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Banova phát triển các sản phẩm dinh dưỡng từ <strong className="text-primary">tinh bột kháng RS2</strong> của chuối xanh Gia Lai, hướng tới bữa sáng no lâu và nhẹ đường huyết cho người dân Quy Nhơn và khu vực lân cận.
            </p>
            <div className="flex flex-wrap gap-space-sm pt-space-xs">
              <Link to="/san-pham" className="inline-flex items-center gap-2 px-space-lg py-3 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-sm hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                Xem sản phẩm
              </Link>
              <Link to="/lien-he" className="inline-flex items-center gap-2 px-space-lg py-3 rounded-xl bg-surface-container-lowest text-primary font-label-lg text-label-lg font-semibold border border-surface-container hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined text-secondary text-[20px]">mail</span>
                Liên hệ dự án
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Transparency notice */}
      <section className="w-full bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="p-space-md rounded-2xl bg-tertiary-fixed/20 border border-tertiary-container/30 flex items-start gap-3">
            <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">info</span>
            <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              <strong className="text-tertiary font-bold">Minh bạch dự án:</strong> Banova hiện đang trong giai đoạn phát triển và kiểm chứng thị trường. Hình ảnh, thông tin sản phẩm và giá trên website mang tính minh họa cho mô hình kinh doanh; sản phẩm thương mại chính thức sẽ được công bố khi hoàn tất kiểm nghiệm và hồ sơ pháp lý.
            </p>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter grid grid-cols-1 lg:grid-cols-2 gap-gutter-lg items-center">
          <div className="space-y-space-sm">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Vấn đề &amp; cơ hội</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Nhu cầu kiểm soát đường huyết và bữa sáng tiện lợi ngày càng tăng
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Tỷ lệ đái tháo đường ở người 30–69 tuổi tại Việt Nam khoảng 7,3%, trong khi tiền đái tháo đường chiếm 17,8%. Tuy vậy, chưa có thương hiệu địa phương nào gắn tinh bột kháng với bữa sáng và bánh ăn liền tại Quy Nhơn.
            </p>
            <p className="font-body-sm text-body-sm text-outline">
              Nguồn: Bộ Y tế / BV Nội tiết Trung ương (dẫn theo Checkpoint 2 của dự án).
            </p>
          </div>
          <div className="grid grid-cols-2 gap-space-md">
            <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">7,3%</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tỷ lệ đái tháo đường (30–69 tuổi)</p>
            </div>
            <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">17,8%</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Tỷ lệ tiền đái tháo đường</p>
            </div>
            <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">7.850 ha</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Diện tích chuối Gia Lai</p>
            </div>
            <div className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">316.000 tấn</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Sản lượng chuối/năm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="w-full py-space-xl bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="max-w-2xl space-y-space-xs mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Giải pháp</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">Ba dòng sản phẩm chính</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Tập trung vào một nhu cầu rõ ràng: bữa sáng no lâu, nhẹ đường huyết, dễ dùng mỗi ngày.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {[
              { icon: 'blender', title: 'Bột tinh bột kháng Banova', desc: 'Hũ 500g kèm muỗng định lượng 10g, pha nước ấm dưới 60°C.' },
              { icon: 'bakery_dining', title: 'Bánh healthy bổ sung RS2', desc: 'Bánh quy yến mạch, cookie chức năng hạn dùng dài.' },
              { icon: 'breakfast_dining', title: 'Hộp bữa sáng lành mạnh', desc: 'Gói 5 ngày và 7 ngày, tiện mang đi làm, đi du lịch.' }
            ].map((item) => (
              <div key={item.title} className="p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs space-y-space-sm">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{item.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="max-w-2xl space-y-space-xs mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Lộ trình</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">Từng bước có cổng kiểm soát</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Chỉ mở rộng khi giai đoạn trước đạt mục tiêu, nhằm giới hạn rủi ro vốn.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {milestones.map((m, idx) => (
              <div key={m.period} className="relative p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-on-primary font-label-md text-label-md font-bold mb-3">
                  {idx + 1}
                </span>
                <div className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">{m.period}</div>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold mt-1">{m.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="w-full py-space-xl bg-surface-container-low/50">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="max-w-2xl space-y-space-xs mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">Giá trị cốt lõi</span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">Điều Banova cam kết</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
            {values.map((v) => (
              <div key={v.title} className="p-space-md rounded-2xl bg-surface-container-lowest border border-surface-container shadow-xs space-y-2">
                <span className="material-symbols-outlined text-secondary text-[26px]">{v.icon}</span>
                <h3 className="font-label-lg text-label-lg text-primary font-bold">{v.title}</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="rounded-3xl bg-primary text-on-primary p-space-lg sm:p-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="space-y-1 text-center md:text-left">
              <h2 className="font-headline-lg text-headline-lg font-bold">Cùng đồng hành cùng Banova</h2>
              <p className="font-body-md text-on-primary-container">Đăng ký nhận tin hoặc liên hệ để nhận thông tin cập nhật về dự án.</p>
            </div>
            <div className="flex items-center gap-space-sm shrink-0">
              <Link to="/lien-he" className="inline-flex items-center gap-2 px-space-lg py-3 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors">
                <span className="material-symbols-outlined text-[20px]">mail</span>
                Liên hệ ngay
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
