import React from 'react';

export default function MedicalDisclaimer({ className = '' }) {
  return (
    <section className={`w-full bg-surface py-space-lg ${className}`}>
      <div className="max-w-7xl mx-auto px-gutter">
        <div className="flex items-center gap-space-md p-space-md rounded-xl bg-secondary-container/20 text-on-surface shadow-[0_1px_8px_rgba(0,0,0,0.02)] border border-secondary-container/30">
          <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-secondary-container text-[24px]">
              verified_user
            </span>
          </div>
          <div className="flex-1 font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            <strong className="text-primary font-headline-sm text-body-sm block sm:inline mr-1 font-bold">
              Khuyến cáo khoa học:
            </strong>
            Thông tin trên website mang tính chất tham khảo kiến thức dinh dưỡng y khoa và hệ vi sinh đường ruột. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
          </div>
        </div>
      </div>
    </section>
  );
}
