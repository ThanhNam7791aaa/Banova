import React, { useState } from 'react';

export default function Footer({ onNavigate = () => {} }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      // Giả lập gửi bản tin (sau này nối API POST /api/newsletter)
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-primary text-on-primary pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg pb-space-xl">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[22px]">
                  nutrition
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary font-bold tracking-tight">
                BANOVA
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-primary-container leading-relaxed">
              Dinh dưỡng đột phá từ vùng đất Gia Lai bạt ngàn tự nhiên, giàu kháng tinh bột RS2 tự nhiên hỗ trợ hệ vi sinh microbiome khỏe mạnh và chuyển hóa bền vững.
            </p>
            {/* Huy hiệu chứng nhận */}
            <div className="flex flex-wrap gap-space-xs pt-space-xs">
              <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed-dim/20 text-primary-fixed font-label-sm text-label-sm">
                ISO 22000
              </span>
              <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed-dim/20 text-primary-fixed font-label-sm text-label-sm">
                HACCP
              </span>
              <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed-dim/20 text-primary-fixed font-label-sm text-label-sm">
                OCOP 4 Sao
              </span>
              <span className="inline-flex items-center px-space-sm py-0.5 rounded-full bg-primary-fixed-dim/20 text-primary-fixed font-label-sm text-label-sm">
                100% Tự Nhiên
              </span>
            </div>
            {/* Thông tin liên hệ trực tiếp */}
            <div className="font-body-sm text-body-sm text-on-primary-container pt-space-xs space-y-1">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed">call</span>
                Hotline: <strong className="text-on-primary">1900 6822</strong>
              </p>
              <p className="flex items-start gap-2">
                <span className="material-symbols-outlined text-[16px] text-secondary-fixed mt-1">location_on</span>
                Showroom &amp; VP: TP. Quy Nhơn, Tỉnh Bình Định
              </p>
            </div>
          </div>

          {/* Cột 2: Danh mục sản phẩm */}
          <div className="space-y-space-md">
            <h3 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider font-bold">
              Danh mục sản phẩm
            </h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#san-pham"
                  onClick={() => onNavigate('san-pham')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Bột tinh bột kháng nguyên chất RS2
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#san-pham"
                  onClick={() => onNavigate('san-pham')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Bánh quy dinh dưỡng Prebiotic Banova
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#san-pham"
                  onClick={() => onNavigate('san-pham')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Hộp bữa sáng dinh dưỡng Gut-Health
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#san-pham"
                  onClick={() => onNavigate('san-pham')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Hộp quà sức khỏe cao cấp Gia Lai
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="space-y-space-md">
            <h3 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider font-bold">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-space-sm font-body-sm text-body-sm text-on-primary-container">
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#goc-khoa-hoc"
                  onClick={() => onNavigate('goc-khoa-hoc')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Câu hỏi thường gặp (FAQ)
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#lien-he"
                  onClick={() => onNavigate('lien-he')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Hướng dẫn đặt hàng &amp; thanh toán
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#lien-he"
                  onClick={() => onNavigate('lien-he')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Chính sách giao hàng Quy Nhơn &amp; Toàn quốc
                </a>
              </li>
              <li>
                <a 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  href="#lien-he"
                  onClick={() => onNavigate('lien-he')}
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Chính sách đổi trả &amp; hoàn tiền
                </a>
              </li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký bản tin */}
          <div className="space-y-space-md">
            <h3 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider font-bold">
              Bản tin sức khỏe
            </h3>
            <p className="font-body-sm text-body-sm text-on-primary-container">
              Đăng ký nhận "Cẩm nang dinh dưỡng đường ruột &amp; Microbiome học" định kỳ từ chuyên gia Banova.
            </p>
            <form className="space-y-space-xs" onSubmit={handleSubscribe}>
              <div className="flex flex-col gap-space-xs">
                <input 
                  className="w-full h-11 px-space-md rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary-fixed" 
                  placeholder="Nhập email của bạn..." 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  className="w-full h-11 px-space-md rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors" 
                  type="submit"
                >
                  {subscribed ? '✓ Đã đăng ký thành công!' : 'Đăng ký ngay'}
                </button>
              </div>
            </form>
            <p className="font-label-sm text-label-sm text-on-primary-container/80 flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-secondary-fixed">verified</span>
              Cam kết bảo mật thông tin &amp; không spam.
            </p>
          </div>
        </div>

        {/* Chân trang đáy */}
        <div className="pt-space-lg border-t border-primary-container flex flex-col md:flex-row items-center justify-between gap-space-md text-on-primary-container font-body-sm text-body-sm">
          <p>© 2026 Banova. Bản quyền thuộc về Banova Việt Nam. Dinh dưỡng tự nhiên từ chuối xanh Gia Lai.</p>
          <div className="flex items-center gap-space-sm">
            <a aria-label="Facebook" className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors text-on-primary" href="#">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </a>
            <a aria-label="Zalo" className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors text-on-primary" href="#">
              <span className="material-symbols-outlined text-[18px]">chat</span>
            </a>
            <a aria-label="YouTube" className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors text-on-primary" href="#">
              <span className="material-symbols-outlined text-[18px]">smart_display</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
