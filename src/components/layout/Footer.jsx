import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../services';

/**
 * Danh sách kênh social ở chân trang.
 * Lưu ý: chỉ dùng tên icon có thật trong bộ Material Symbols đang nạp,
 * nếu không ligature sẽ hỏng và icon biến thành chữ (gây tràn ngang).
 */
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'public' },
  { label: 'Zalo', href: 'https://zalo.me', icon: 'chat' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'smart_display' },
  { label: 'TikTok Shop', href: 'https://tiktok.com', icon: 'storefront' },
  { label: 'Shopee', href: 'https://shopee.vn', icon: 'shopping_bag' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (email.trim()) {
      setLoading(true);
      setFeedbackMsg(null);
      try {
        await api.newsletter.subscribe(email.trim());
        setFeedbackMsg('✓ Đã đăng ký nhận bản tin thành công!');
        setTimeout(() => {
          setFeedbackMsg(null);
        }, 4000);
        setEmail('');
      } catch (err) {
        if (err.code === 'CONFLICT' || err.status === 409) {
          setFeedbackMsg('Email này đã được đăng ký trước đó.');
        } else {
          setFeedbackMsg(err.message || 'Không thể đăng ký lúc này.');
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <footer className="w-full bg-primary text-on-primary pt-space-xl pb-space-lg">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter-lg pb-space-xl">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-space-md">
            <Link to="/" className="flex items-center gap-space-sm group">
              <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-secondary-container text-[22px]">
                  nutrition
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary font-bold tracking-tight">
                BANOVA
              </span>
            </Link>
            <p className="font-body-sm text-[13px] text-on-primary-container leading-relaxed">
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
            <div className="font-body-sm text-[13px] text-on-primary-container pt-space-xs space-y-1">
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
            <ul className="space-y-space-sm font-body-sm text-[13px] text-on-primary-container">
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/san-pham"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Bột tinh bột kháng nguyên chất RS2
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/san-pham"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Combo Liệu trình chuyên sâu 60 ngày
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/san-pham"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Hộp 10 gói 15g tiện lợi văn phòng
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/san-pham"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Bánh quy yến mạch Prebiotic Banova
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng - Không còn link chết */}
          <div className="space-y-space-md">
            <h3 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider font-bold">
              Hỗ trợ khách hàng
            </h3>
            <ul className="space-y-space-sm font-body-sm text-[13px] text-on-primary-container">
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/faq"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Câu hỏi thường gặp (FAQ)
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/dat-hang"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Hướng dẫn đặt hàng &amp; thanh toán
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/lien-he"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Chính sách giao hàng Quy Nhơn &amp; Toàn quốc
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/lien-he"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Chính sách đổi trả &amp; hoàn tiền 15 ngày
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/quiz"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Quiz tư vấn tình trạng đường ruột
                </Link>
              </li>
              <li>
                <Link 
                  className="hover:text-on-primary transition-colors flex items-center gap-1.5" 
                  to="/gioi-thieu"
                >
                  <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                  Giới thiệu dự án Banova
                </Link>
              </li>
            </ul>
          </div>

          {/* Cột 4: Đăng ký bản tin */}
          <div className="space-y-space-md">
            <h3 className="font-label-lg text-label-lg text-on-primary uppercase tracking-wider font-bold">
              Bản tin sức khỏe
            </h3>
            <p className="font-body-sm text-[13px] text-on-primary-container">
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
                  disabled={loading}
                  className="w-full h-11 px-space-md rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors flex items-center justify-center gap-2" 
                  type="submit"
                >
                  {loading ? 'Đang gửi...' : feedbackMsg ? feedbackMsg : 'Đăng ký ngay'}
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
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                aria-label={social.label}
                title={social.label}
                className="w-9 h-9 shrink-0 rounded-full overflow-hidden bg-primary-container flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-colors text-on-primary"
                href={social.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined text-[18px] leading-none">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
