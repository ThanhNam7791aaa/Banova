import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Global ErrorBoundary Component (B2-16)
 * Bắt tất cả các lỗi runtime crash giao diện và hiển thị màn hình cứu hộ thân thiện
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary] Bắt lỗi hiển thị:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center px-4 py-12">
          <div className="max-w-lg w-full bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-error-container/40 text-error flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px]">healing</span>
            </div>
            
            <div className="space-y-2">
              <h1 className="font-headline-md text-headline-md text-primary font-bold">
                Đã xảy ra sự cố hiển thị
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Trang web đã ghi nhận sự cố bất thường. Đội ngũ kỹ thuật Banova đang xử lý. Bạn có thể thử tải lại trang hoặc quay về trang chủ.
              </p>
            </div>

            {process.env.NODE_ENV !== 'production' && this.state.error && (
              <div className="text-left bg-surface-container-low p-4 rounded-xl text-xs text-error font-mono overflow-auto max-h-40 border border-surface-container">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={this.handleReload}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-sm hover:bg-primary-container transition-all"
              >
                Tải lại trang
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container text-primary font-label-md font-bold hover:bg-surface-container-high transition-all"
              >
                Về Trang Chủ
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
