import React, { useState } from 'react';
import { api } from '../services';
import MedicalDisclaimer from '../components/layout/MedicalDisclaimer';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    topic: 'tu-van-dinh-duong',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await api.contact.send(formData);
      setSubmitSuccess(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        topic: 'tu-van-dinh-duong',
        message: ''
      });
    } catch (err) {
      console.error('[ContactPage] Lỗi gửi liên hệ:', err);
      setErrorMessage(err.message || 'Không thể gửi tin nhắn lúc này. Vui lòng liên hệ Hotline 1900 6822.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-7xl mx-auto px-gutter space-y-space-xl">
        {/* Header giới thiệu */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">support_agent</span>
            Trung tâm Đồng hành Sức khỏe Banova
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold">
            Liên Hệ &amp; Tư Vấn Cùng Dược Sĩ Chuyên Môn
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Chúng tôi luôn sẵn sàng lắng nghe mọi thắc mắc về hệ vi sinh đường ruột, liều dùng tinh bột kháng RS2 và hỗ trợ giao hàng tận nơi trên toàn quốc.
          </p>
        </div>

        {/* Khung nội dung chính: 2 Cột */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg">
          {/* Cột trái: Form liên hệ trực tuyến (7 cột) */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg md:p-space-xl rounded-3xl shadow-sm border border-surface-container space-y-space-md">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                Gửi Tin Nhắn Cho Chuyên Viên
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Vui lòng điền thông tin bên dưới, dược sĩ Banova sẽ gọi lại hỗ trợ trong vòng 15-30 phút.
              </p>
            </div>

            {submitSuccess && (
              <div className="p-space-md rounded-2xl bg-secondary-container/30 border border-secondary-container text-on-secondary-container flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                <div>
                  <h4 className="font-label-lg font-bold">Gửi thông tin thành công!</h4>
                  <p className="font-body-sm">
                    Đội ngũ chuyên viên dinh dưỡng Banova đã nhận được yêu cầu và sẽ liên hệ hỗ trợ bạn sớm nhất.
                  </p>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-space-md rounded-2xl bg-error-container/30 border border-error text-error flex items-start gap-3">
                <span className="material-symbols-outlined text-error text-[24px]">error</span>
                <div>
                  <h4 className="font-label-lg font-bold">Không thể gửi yêu cầu</h4>
                  <p className="font-body-sm">{errorMessage}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Họ và tên <span className="text-error">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-11 px-space-md rounded-xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Số điện thoại <span className="text-error">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0912 345 678"
                    className="w-full h-11 px-space-md rounded-xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Email nhận tài liệu
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="email@example.com"
                    className="w-full h-11 px-space-md rounded-xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                  />
                </div>
                <div>
                  <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                    Vấn đề bạn quan tâm
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full h-11 px-space-md rounded-xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                  >
                    <option value="tu-van-dinh-duong">Tư vấn liệu trình tiêu hóa / RS2</option>
                    <option value="duong-huyet">Hỗ trợ người tiền đái tháo đường</option>
                    <option value="dai-trang-ibs">Hội chứng ruột kích thích (IBS)</option>
                    <option value="dat-hang-giao-nhanh">Hỏi về đơn hàng / Đại lý Quy Nhơn</option>
                    <option value="khac">Vấn đề khác</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-on-surface font-semibold mb-1">
                  Nội dung chi tiết câu hỏi
                </label>
                <textarea
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Mô tả triệu chứng tiêu hóa hoặc câu hỏi về liều dùng..."
                  className="w-full p-space-md rounded-xl bg-surface border border-outline-variant focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent font-body-md"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    Đang gửi thông tin...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    Gửi Yêu Cầu Tư Vấn Ngay
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Cột phải: Thông tin Showroom Quy Nhơn & Google Maps (5 cột) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Box địa chỉ showroom */}
            <div className="bg-surface-container-lowest p-space-lg rounded-3xl shadow-sm border border-surface-container space-y-4">
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[24px]">storefront</span>
                Văn Phòng &amp; Showroom Quy Nhơn
              </h3>
              
              <div className="space-y-3 font-body-md text-body-md text-on-surface-variant">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">location_on</span>
                  <div>
                    <strong className="text-on-surface block">Địa chỉ Showroom:</strong>
                    TP. Quy Nhơn, Tỉnh Bình Định (Trung tâm trải nghiệm dinh dưỡng Banova)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">call</span>
                  <div>
                    <strong className="text-on-surface block">Tổng đài tư vấn:</strong>
                    <span className="text-secondary font-bold text-lg">1900 6822</span> (8:00 - 20:00 hàng ngày)
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">mail</span>
                  <div>
                    <strong className="text-on-surface block">Email chuyên môn:</strong>
                    chuyengia@banova.vn
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px] mt-0.5">schedule</span>
                  <div>
                    <strong className="text-on-surface block">Thời gian mở cửa:</strong>
                    Thứ Hai – Chủ Nhật: 07:30 – 21:00
                  </div>
                </div>
              </div>

              {/* Bản đồ Google Maps Mockup tương tác */}
              <div className="relative rounded-2xl overflow-hidden border border-surface-container h-48 bg-surface-container-low flex items-center justify-center group">
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-500"
                  style={{
                    backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ')`
                  }}
                />
                <div className="absolute inset-0 bg-primary/40"></div>
                <div className="relative z-10 text-center p-4 text-on-primary">
                  <span className="material-symbols-outlined text-[36px] text-secondary-fixed">pin_drop</span>
                  <p className="font-label-lg font-bold">Khu vực Quy Nhơn &amp; Bình Định</p>
                  <p className="font-body-sm opacity-90">Hỗ trợ giao hàng hỏa tốc trong 2 giờ</p>
                  <a
                    href="https://maps.google.com/?q=Quy+Nhon+Binh+Dinh"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-surface-container-lowest text-primary font-label-sm font-bold shadow hover:bg-surface-container transition-colors"
                  >
                    Xem trên Google Maps
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Khung cam kết bảo chứng chất lượng */}
            <div className="bg-primary-container/20 p-space-md rounded-2xl border border-primary-container/30 space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold font-label-lg">
                <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
                Bảo Chứng Nguồn Gốc Gia Lai &amp; Quy Nhơn
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                100% sản phẩm Banova được chứng nhận an toàn thực phẩm ISO 22000, HACCP và đạt tiêu chuẩn OCOP 4 Sao Tỉnh Gia Lai. Miễn phí đổi trả trong 15 ngày nếu có bất kỳ lỗi đóng gói.
              </p>
            </div>
          </div>
        </div>

        {/* Khung cảnh báo y tế chuẩn NFR-09 */}
        <MedicalDisclaimer />
      </div>
    </div>
  );
};

export default ContactPage;
