import React from 'react';

export default function QuizTeaser({ onNavigate = () => {} }) {
  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="relative rounded-3xl bg-primary text-on-primary overflow-hidden p-space-lg lg:p-space-xl shadow-2xl border border-primary-container">
          {/* Glowing background shapes */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Text Content */}
            <div className="lg:col-span-7 space-y-space-md">
              <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/20 text-secondary-fixed border border-secondary-container/30">
                <span className="material-symbols-outlined text-[18px]">quiz</span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
                  Trắc nghiệm đường ruột cá nhân hóa
                </span>
              </div>

              <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold tracking-tight">
                Bạn chưa biết sản phẩm nào phù hợp với nhu cầu cơ thể?
              </h2>

              <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                Chỉ mất 1 phút thực hiện trắc nghiệm chỉ số đường ruột (Gut Assessment) để chuyên gia dinh dưỡng gợi ý lộ trình nạp tinh bột kháng tối ưu theo thể trạng của bạn.
              </p>

              {/* 3 Visual Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="p-space-sm rounded-xl bg-primary-container/80 flex items-center gap-3 border border-primary-fixed/10">
                  <span className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold font-label-md flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span className="font-body-sm text-[12px] text-on-primary font-medium">
                    Đánh giá thói quen tiêu hóa
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-primary-container/80 flex items-center gap-3 border border-primary-fixed/10">
                  <span className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold font-label-md flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span className="font-body-sm text-[12px] text-on-primary font-medium">
                    Mục tiêu sức khỏe &amp; thể trạng
                  </span>
                </div>
                <div className="p-space-sm rounded-xl bg-primary-container/80 flex items-center gap-3 border border-primary-fixed/10">
                  <span className="w-7 h-7 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold font-label-md flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span className="font-body-sm text-[12px] text-on-primary font-medium">
                    Nhận thực đơn nạp RS2 chuẩn
                  </span>
                </div>
              </div>
            </div>

            {/* Quiz Action Side */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-sm p-space-lg rounded-2xl bg-surface-container-lowest text-on-surface shadow-xl flex flex-col space-y-space-md border border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <span className="material-symbols-outlined text-[24px]">assignment_turned_in</span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-body-lg font-bold text-primary">
                      Microbiome Quick-Check
                    </h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant">
                      Thời gian thực hiện: 60 giây
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-on-surface-variant font-body-sm text-[13px]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span>Định lượng lượng RS2 cần nạp/ngày</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span>Cách kết hợp cùng sữa hạt hoặc smoothie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[16px]">check_circle</span>
                    <span>Tặng mã ưu đãi 10% đơn hàng đầu tiên</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('quiz-tu-van')}
                  className="w-full py-3.5 px-space-md rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md hover:shadow-lg"
                >
                  <span>Bắt đầu bài trắc nghiệm ngay</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
