import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-24 h-24 rounded-full bg-secondary-container/40 text-secondary flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-[52px]">search_off</span>
        </div>
        <div className="space-y-2">
          <span className="font-label-lg text-secondary font-bold uppercase tracking-wider">Lỗi 404</span>
          <h1 className="font-headline-xl text-primary font-bold">Không tìm thấy trang</h1>
          <p className="font-body-md text-on-surface-variant">
            Trang bạn đang tìm kiếm không tồn tại, đã đổi địa chỉ hoặc tạm thời không khả dụng.
          </p>
        </div>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-on-primary font-label-lg font-bold shadow-sm hover:bg-primary-container transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">home</span>
            <span>Quay về trang chủ</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
