import React from 'react';

export default function QuizTeaser({ onNavigate = () => {} }) {
  return (
    <section className="w-full py-10 lg:py-14 bg-surface">
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="rounded-3xl bg-gradient-to-br from-secondary-container/35 via-surface-container-lowest to-secondary-container/15 p-6 lg:p-10 border border-secondary/25 shadow-sm relative overflow-hidden">
          {/* Subtle Ambient Accent */}
          <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-secondary-fixed/20 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            {/* Cột Trái: Thông điệp cốt lõi (Không lặp ý) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-[12px] font-bold">
                <span className="material-symbols-outlined text-[16px]">biotech</span>
                <span>Khảo sát thể trạng vi sinh cá nhân</span>
              </div>

              <h2 className="font-headline-lg text-headline-md sm:text-headline-lg text-primary font-extrabold tracking-tight">
                Chưa rõ thể trạng của bạn cần bao nhiêu gam RS2 mỗi ngày?
              </h2>

              <p className="font-body-md text-on-surface-variant leading-relaxed max-w-xl">
                Mỗi đường ruột có mức dung nạp khác nhau. Dành 60 giây làm trắc nghiệm để nhận phác đồ chia liều tăng dần (từ 7.5g đến 15g) an toàn, êm bụng, không lo đầy hơi.
              </p>

              {/* 3 Thể trạng phổ biến click nhanh */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-on-surface-variant font-medium">
                <span className="text-outline">Hỗ trợ riêng cho:</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-container shadow-2xs">Đại tràng nhạy cảm</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-container shadow-2xs">Kiểm soát đường huyết</span>
                <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-container shadow-2xs">Bữa sáng no lâu giữ dáng</span>
              </div>
            </div>

            {/* Cột Phải: Card CTA trực tiếp, hành động ngay */}
            <div className="lg:col-span-5 flex flex-col items-stretch sm:items-end justify-center">
              <div className="w-full sm:max-w-sm p-5 rounded-2xl bg-surface-container-lowest shadow-md border border-secondary/20 space-y-3.5 text-center sm:text-left">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">timer</span>
                    <span className="font-label-md text-label-md font-bold text-primary">Chỉ mất 60 giây</span>
                  </div>
                  <span className="font-label-sm text-[11px] font-bold bg-secondary-container text-secondary px-2 py-0.5 rounded-full">
                    Miễn phí 100%
                  </span>
                </div>

                <p className="font-body-sm text-[13px] text-on-surface-variant leading-normal">
                  Nhận ngay kết quả phân tích hệ vi sinh, gợi ý sản phẩm phù hợp và mã ưu đãi dùng thử độc quyền.
                </p>

                <button
                  type="button"
                  onClick={() => onNavigate('quiz-tu-van')}
                  className="w-full py-3 px-4 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-primary transition-all shadow-sm hover:shadow cursor-pointer"
                >
                  <span>Bắt đầu bài trắc nghiệm</span>
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
