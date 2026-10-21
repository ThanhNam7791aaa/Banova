import React, { useState } from 'react';
import MedicalDisclaimer from '../components/layout/MedicalDisclaimer';
import { api } from '../services';

export default function CheckoutPage({
  cartItems = [],
  onUpdateQty = () => {},
  onRemoveItem = () => {},
  onClearCart = () => {},
  onResetDemoCart = () => {},
  onNavigate = () => {},
  initialStep = 1
}) {
  const [currentStep, setCurrentStep] = useState(initialStep); // 1: Giỏ hàng, 2: Thanh toán & Thông tin, 3: Thành công
  const [couponCode, setCouponCode] = useState('BANOVAQUI');
  const [couponApplied, setCouponApplied] = useState(true);
  const [couponError, setCouponError] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('demo'); // 'demo' | 'cod' | 'qr'
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderError, setOrderError] = useState(null);

  // Form thông tin khách hàng
  const [formData, setFormData] = useState({
    name: 'Nguyễn Văn An',
    phone: '0912 345 678',
    email: 'an.nguyen@example.com',
    city: 'Bình Định / Toàn quốc',
    district: 'TP. Quy Nhơn',
    address: 'Số 88 Đường Lê Lợi, Phường Lê Lợi',
    notes: 'Giao giờ hành chính, gọi trước khi đến 15 phút'
  });

  const [orderSuccessData, setOrderSuccessData] = useState(null);

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount || 0) + ' ₫';
  };

  // Tính toán chi phí
  const subtotal = cartItems.reduce((acc, item) => acc + ((Number(item.price) || 0) * (Number(item.quantity) || 1)), 0);
  const totalQty = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 1), 0);
  const shippingFee = 0; // Luôn miễn phí cước bảo ôn
  const discountAmount = couponApplied ? 0 : 0; // Miễn phí cước 30.000đ được áp dụng
  const finalTotal = subtotal - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    const cleanCode = couponCode.trim().toUpperCase();
    if (cleanCode === 'BANOVAQUI' || cleanCode === 'FREESHIP' || cleanCode === 'BANOVA') {
      setCouponApplied(true);
      setCouponError('');
    } else {
      setCouponError('Mã không hợp lệ. Hãy thử "BANOVAQUI" hoặc "FREESHIP"!');
    }
  };

  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponError('');
  };

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProceedToStep2 = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = async (e) => {
    if (e) e.preventDefault();

    if (!formData.name.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Vui lòng điền đầy đủ Họ tên, Số điện thoại và Địa chỉ nhận hàng.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Giỏ hàng đang trống. Vui lòng thêm sản phẩm trước khi đặt hàng.');
      return;
    }

    try {
      setIsSubmitting(true);
      setOrderError(null);

      // Quy tắc BE Handover 5.3: paymentMethod chỉ có 'COD' hoặc 'DEMO' (VietQR map sang DEMO)
      const bePaymentMethod = paymentMethod === 'cod' ? 'COD' : 'DEMO';

      const payload = {
        customerName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email ? formData.email.trim() : null,
        address: `${formData.address.trim()}${formData.district ? ', ' + formData.district : ''}${formData.city ? ', ' + formData.city : ''}`,
        note: formData.notes ? formData.notes.trim() : null,
        paymentMethod: bePaymentMethod,
        // Chỉ gửi productId và quantity, KHÔNG gửi giá (NFR-09)
        items: cartItems.map((item) => ({
          productId: item.id,
          quantity: Number(item.quantity) || 1
        }))
      };

      const response = await api.orders.create(payload);
      const serverOrder = response.data || {};

      setOrderSuccessData({
        orderId: serverOrder.orderCode || `BNV-${new Date().getFullYear()}1019-999`,
        createdAt: serverOrder.createdAt 
          ? new Date(serverOrder.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
          : new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
        paymentMethod: bePaymentMethod,
        customer: { ...formData },
        items: [...cartItems],
        subtotal: serverOrder.totalAmount || subtotal,
        finalTotal: serverOrder.totalAmount || finalTotal,
        couponApplied,
        status: serverOrder.status || 'PENDING'
      });

      // Dọn sạch giỏ hàng sau khi đặt thành công
      onClearCart();
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error('[CheckoutPage] Lỗi đặt hàng API:', err);
      const errMsg = err.message || 'Không thể gửi đơn hàng đến máy chủ. Vui lòng thử lại sau.';
      setOrderError(errMsg);
      alert('Lỗi đặt hàng: ' + errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-20rem)]">
      {/* 1. Breadcrumb tinh tế */}
      <div className="w-full bg-surface-container-low/50 border-b border-surface-container/70">
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-gutter py-2.5">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-[13px] text-on-surface-variant">
            <button 
              type="button"
              onClick={() => onNavigate('trang-chu')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </button>
            <span className="text-outline-variant font-normal">/</span>
            <span className="text-primary font-semibold">Giỏ hàng &amp; Thanh toán</span>
            {currentStep === 3 && (
              <>
                <span className="text-outline-variant font-normal">/</span>
                <span className="text-secondary font-bold">Xác nhận đơn hàng</span>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* 2. Top Stepper / Checkout Progress Bar */}
      <section className="w-full bg-surface-container-low/80 border-b border-surface-container py-space-md sticky top-20 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-gutter">
          <div className="flex items-center justify-between relative max-w-3xl mx-auto">
            {/* Connecting Track */}
            <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-surface-variant rounded-full z-0">
              <div 
                className="h-full bg-secondary transition-all duration-500 rounded-full" 
                style={{ 
                  width: currentStep === 1 ? '20%' : currentStep === 2 ? '55%' : '100%' 
                }}
              />
            </div>

            {/* Step 1: Giỏ hàng */}
            <button 
              type="button"
              className="relative z-10 flex flex-col sm:flex-row items-center gap-2 group focus:outline-none text-left bg-surface/90 px-2.5 py-1 rounded-xl cursor-pointer" 
              onClick={() => {
                if (currentStep !== 3) setCurrentStep(1);
              }}
            >
              <div className={`w-9 h-9 rounded-full font-headline-sm text-headline-sm flex items-center justify-center shadow-md transition-all ${
                currentStep >= 1 ? 'bg-secondary text-on-secondary ring-4 ring-secondary-container' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {currentStep > 1 ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  <span className="font-bold text-sm">1</span>
                )}
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold">Bước 1</span>
                <span className="font-label-md text-label-md text-primary font-bold">Giỏ hàng (Xem lại)</span>
              </div>
            </button>

            {/* Step 2: Thông tin & Thanh toán */}
            <button 
              type="button"
              className={`relative z-10 flex flex-col sm:flex-row items-center gap-2 group focus:outline-none text-left bg-surface/90 px-2.5 py-1 rounded-xl cursor-pointer ${
                currentStep < 2 ? 'opacity-80' : ''
              }`} 
              onClick={() => {
                if (cartItems.length > 0 && currentStep !== 3) setCurrentStep(2);
              }}
            >
              <div className={`w-9 h-9 rounded-full font-headline-sm text-headline-sm flex items-center justify-center shadow-md transition-all ${
                currentStep === 2 
                  ? 'bg-primary-container text-on-primary ring-4 ring-secondary-container' 
                  : currentStep > 2 
                    ? 'bg-secondary text-on-secondary' 
                    : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {currentStep > 2 ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  <span className="font-bold text-sm">2</span>
                )}
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-secondary font-bold">
                  {currentStep === 2 ? 'Bước 2 (Đang chọn)' : 'Bước 2'}
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">Thông tin giao &amp; TT Mô phỏng</span>
              </div>
            </button>

            {/* Step 3: Hoàn tất đơn hàng */}
            <div className={`relative z-10 flex flex-col sm:flex-row items-center gap-2 bg-surface/90 px-2.5 py-1 rounded-xl transition-all ${
              currentStep === 3 ? 'opacity-100' : 'opacity-60'
            }`}>
              <div className={`w-9 h-9 rounded-full font-headline-sm text-headline-sm flex items-center justify-center transition-all ${
                currentStep === 3 
                  ? 'bg-primary-container text-on-primary ring-4 ring-secondary-container shadow-md' 
                  : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {currentStep === 3 ? (
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                ) : (
                  <span className="font-bold text-sm">3</span>
                )}
              </div>
              <div className="flex flex-col text-center sm:text-left">
                <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-semibold">Bước 3</span>
                <span className="font-label-md text-label-md text-on-surface-variant font-semibold">Hoàn tất đơn hàng</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Nội dung Chính Giỏ hàng & Thanh toán (Khi Steps = 1 hoặc 2) */}
      {currentStep !== 3 && (
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-gutter py-space-lg w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
            
            {/* CỘT TRÁI (Col 8 / ~60%) */}
            <div className="lg:col-span-8 space-y-space-lg">
              
              {/* Tab chuyển đổi giữa Bước 1 và Bước 2 */}
              <div className="flex bg-surface-container-low p-1.5 rounded-2xl gap-2 w-full max-w-lg border border-surface-container-highest/60">
                <button 
                  type="button"
                  className={`flex-1 py-2.5 px-4 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    currentStep === 1 
                      ? 'bg-surface-container-lowest text-primary shadow-sm border border-surface-container' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => setCurrentStep(1)}
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                  <span>1. Chi tiết giỏ hàng ({totalQty} sản phẩm)</span>
                </button>
                <button 
                  type="button"
                  className={`flex-1 py-2.5 px-4 rounded-xl font-label-md text-label-md font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    currentStep === 2 
                      ? 'bg-surface-container-lowest text-primary shadow-sm border border-surface-container' 
                      : 'text-on-surface-variant hover:text-primary'
                  }`}
                  onClick={() => {
                    if (cartItems.length > 0) setCurrentStep(2);
                  }}
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>2. Thông tin nhận &amp; Thanh toán</span>
                </button>
              </div>

              {/* ======================= STEP 1: XEM LẠI GIỎ HÀNG ======================= */}
              {currentStep === 1 && (
                <div className="space-y-space-md animate-in fade-in duration-300">
                  {/* Free Shipping Milestone Card */}
                  <div className="bg-gradient-to-r from-secondary-container/40 via-surface-container-lowest to-secondary-container/20 p-space-md rounded-2xl border border-secondary/20 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-secondary">
                        <span className="material-symbols-outlined text-[22px]">local_shipping</span>
                        <span className="font-label-md text-label-md font-bold">Đủ điều kiện Freeship Quy Nhơn &amp; Toàn quốc!</span>
                      </div>
                      <span className="font-label-sm text-label-sm bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-bold">
                        Tài trợ 100% Cước
                      </span>
                    </div>
                    <div className="w-full bg-surface-container h-2.5 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full rounded-full transition-all duration-700" style={{ width: '100%' }} />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Đơn hàng chứa dòng Tinh Bột Kháng Banova được đóng thùng bảo ôn 3 lớp chống ẩm tuyệt đối.
                    </p>
                  </div>

                  {/* Cart Products List */}
                  <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-highest/60 overflow-hidden">
                    <div className="p-space-md bg-surface-container-low/70 flex justify-between items-center border-b border-surface-container">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-[20px]">inventory_2</span>
                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                          Danh sách sản phẩm trong giỏ ({totalQty})
                        </h2>
                      </div>
                      {cartItems.length > 0 && (
                        <button 
                          type="button"
                          className="font-label-sm text-label-sm text-error hover:underline flex items-center gap-1 font-semibold cursor-pointer"
                          onClick={onClearCart}
                        >
                          <span className="material-symbols-outlined text-[16px]">delete_sweep</span>
                          Xóa tất cả
                        </button>
                      )}
                    </div>

                    {/* Danh sách các Item */}
                    {cartItems.length > 0 ? (
                      <div className="p-space-md space-y-space-md divide-y divide-surface-container">
                        {cartItems.map((item) => (
                          <div 
                            key={item.id} 
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md pt-space-sm first:pt-0"
                          >
                            <div className="flex items-center gap-space-md min-w-0">
                              <div className="w-20 h-20 rounded-xl overflow-hidden bg-surface-container shrink-0 relative border border-surface-container-highest">
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                                {item.weight && (
                                  <span className="absolute bottom-1 left-1 bg-primary-container text-on-primary text-[10px] px-1.5 py-0.5 rounded-full font-label-sm font-bold">
                                    {item.weight}
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                  {item.rsTag && (
                                    <span className="font-label-sm text-[11px] text-secondary uppercase bg-secondary-container/50 px-2 py-0.5 rounded-full font-bold">
                                      {item.rsTag}
                                    </span>
                                  )}
                                  <span className="font-label-sm text-[11px] text-primary-container bg-surface-container-high px-2 py-0.5 rounded-full font-semibold">
                                    Chuối xanh Gia Lai sấy lạnh
                                  </span>
                                </div>
                                <h3 className="font-label-lg text-label-md lg:text-label-lg text-on-surface font-bold truncate">
                                  {item.name}
                                </h3>
                                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">
                                  {item.description || 'Sản phẩm dinh dưỡng vi sinh kháng tinh bột RS2'}
                                </p>
                                <div className="text-secondary font-bold font-label-md text-label-md sm:hidden mt-1">
                                  {formatVND(item.price)}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between w-full sm:w-auto gap-space-lg shrink-0">
                              <div className="hidden sm:block text-right">
                                <span className="font-label-md text-label-md text-on-surface font-bold">
                                  {formatVND(item.price)}
                                </span>
                                <span className="block font-body-sm text-[12px] text-on-surface-variant">Đơn giá</span>
                              </div>

                              {/* Stepper Số Lượng [- 1 +] */}
                              <div className="flex items-center bg-surface-container-low border border-surface-container-highest rounded-xl p-1 shadow-inner">
                                <button 
                                  type="button"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors font-bold text-lg cursor-pointer"
                                  onClick={() => onUpdateQty(item.id, -1)}
                                >
                                  -
                                </button>
                                <span className="w-9 text-center font-label-md text-label-md text-primary font-bold">
                                  {item.quantity}
                                </span>
                                <button 
                                  type="button"
                                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface hover:bg-surface-container-lowest transition-colors font-bold text-lg cursor-pointer"
                                  onClick={() => onUpdateQty(item.id, 1)}
                                >
                                  +
                                </button>
                              </div>

                              {/* Thành tiền & Nút Xóa */}
                              <div className="text-right min-w-[100px]">
                                <div className="font-headline-sm text-headline-sm text-primary font-extrabold font-mono">
                                  {formatVND(item.price * item.quantity)}
                                </div>
                                <button 
                                  type="button"
                                  className="text-error font-label-sm text-label-sm hover:underline flex items-center gap-0.5 ml-auto mt-0.5 font-medium cursor-pointer"
                                  onClick={() => onRemoveItem(item.id)}
                                >
                                  <span className="material-symbols-outlined text-[16px]">delete</span>
                                  Xóa
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      /* Empty cart notification */
                      <div className="p-space-xl text-center space-y-space-sm">
                        <span className="material-symbols-outlined text-[52px] text-outline-variant">remove_shopping_cart</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Giỏ hàng của bạn đang trống</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mx-auto">
                          Hãy thêm các sản phẩm tinh bột kháng Banova để phục hồi và bảo dưỡng hệ vi sinh đường ruột.
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2">
                          <button 
                            type="button"
                            className="bg-primary-container text-on-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md hover:bg-primary transition-colors inline-block font-bold shadow-md cursor-pointer"
                            onClick={onResetDemoCart}
                          >
                            Khôi phục giỏ hàng mẫu
                          </button>
                          <button 
                            type="button"
                            className="bg-surface-container text-primary px-space-md py-2.5 rounded-xl font-label-md text-label-md hover:bg-surface-container-high transition-colors inline-block font-bold cursor-pointer"
                            onClick={() => onNavigate('san-pham')}
                          >
                            Xem danh mục sản phẩm
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Tặng kèm miễn phí độc quyền */}
                    {cartItems.length > 0 && (
                      <div className="m-space-md p-space-sm bg-secondary-container/30 border border-dashed border-secondary/50 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-sm">
                            <span className="material-symbols-outlined text-[20px]">redeem</span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-primary font-bold">
                              Quà tặng y sinh độc quyền: Muỗng định lượng chuẩn 15g + Ebook cẩm nang 14 ngày
                            </p>
                            <p className="font-body-sm text-body-sm text-secondary font-medium">
                              Tự động cộng kèm vào kiện hàng Banova xuất xưởng
                            </p>
                          </div>
                        </div>
                        <span className="font-label-md text-label-md font-extrabold text-secondary font-mono">
                          0 ₫ (Miễn phí)
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Promo Code Section */}
                  {cartItems.length > 0 && (
                    <div className="space-y-space-xs">
                      <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container-highest/60 flex flex-col sm:flex-row items-center justify-between gap-space-md">
                        <div className="flex items-center gap-space-sm w-full sm:w-auto">
                          <div className="w-10 h-10 rounded-xl bg-secondary-container/60 flex items-center justify-center text-secondary">
                            <span className="material-symbols-outlined text-[22px]">sell</span>
                          </div>
                          <div>
                            <p className="font-label-md text-label-md text-primary font-bold">Mã Voucher / Khuyến mãi</p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Nhập mã ưu đãi (Ví dụ: <strong className="text-secondary font-mono">BANOVAQUI</strong> hoặc <strong className="text-secondary font-mono">FREESHIP</strong>)
                            </p>
                          </div>
                        </div>
                        <form onSubmit={handleApplyCoupon} className="flex items-center gap-2 w-full sm:w-auto">
                          <div className="relative flex-1 sm:w-64">
                            <input 
                              type="text"
                              value={couponCode}
                              onChange={(e) => setCouponCode(e.target.value)}
                              placeholder="Nhập BANOVAQUI"
                              className="w-full h-11 px-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-label-md text-label-md focus:outline-none focus:border-secondary focus:bg-surface-container-lowest uppercase tracking-wider font-mono"
                            />
                          </div>
                          <button 
                            type="submit"
                            className="h-11 px-space-md bg-secondary text-on-secondary rounded-xl font-label-md text-label-md hover:bg-secondary/90 transition-all font-bold shrink-0 shadow-sm cursor-pointer"
                          >
                            Áp dụng
                          </button>
                        </form>
                      </div>

                      {couponError && (
                        <p className="text-error font-body-sm text-sm px-2">{couponError}</p>
                      )}

                      {/* Coupon Applied Badge Banner */}
                      {couponApplied && (
                        <div className="bg-secondary-container/40 border border-secondary/30 p-space-sm rounded-xl flex items-center justify-between">
                          <div className="flex items-center gap-space-sm">
                            <span className="material-symbols-outlined text-secondary">check_circle</span>
                            <span className="font-label-md text-label-md text-primary font-bold">
                              Mã <strong className="font-mono text-secondary">{couponCode || 'BANOVAQUI'}</strong> đã kích hoạt thành công: Miễn phí vận chuyển 100% toàn quốc
                            </span>
                          </div>
                          <button 
                            type="button"
                            onClick={handleRemoveCoupon}
                            className="font-label-sm text-label-sm text-on-surface-variant hover:text-error underline font-semibold cursor-pointer"
                          >
                            Bỏ chọn
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Thanh điều hướng thao tác Bước 1 */}
                  <div className="flex justify-between items-center pt-2">
                    <button 
                      type="button"
                      onClick={() => onNavigate('san-pham')}
                      className="font-label-md text-label-md text-secondary font-bold flex items-center gap-1 hover:underline cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      Tiếp tục mua sắm
                    </button>
                    {cartItems.length > 0 && (
                      <button 
                        type="button"
                        onClick={handleProceedToStep2}
                        className="px-space-lg py-3.5 bg-primary-container text-on-primary rounded-xl font-label-md text-label-md font-bold flex items-center gap-2 shadow-lg hover:bg-primary transition-all cursor-pointer"
                      >
                        <span>Chuyển sang điền thông tin</span>
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ======================= STEP 2: THÔNG TIN GIAO & PHƯƠNG THỨC THANH TOÁN ======================= */}
              {currentStep === 2 && (
                <div className="space-y-space-md animate-in fade-in duration-300">
                  {/* Quick Guest Checkout Notice Banner */}
                  <div className="bg-surface-container-low border border-surface-container-highest p-space-md rounded-2xl flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-secondary shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">flash_on</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-label-lg text-label-md lg:text-label-lg text-primary font-bold">
                          Đặt hàng nhanh (Guest Checkout) — Không cần đăng ký tài khoản
                        </h3>
                        <span className="font-label-sm text-[10px] bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-bold uppercase">
                          Tiết kiệm 5 phút
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Dữ liệu được bảo mật y sinh theo chuẩn 256-bit SSL và chỉ sử dụng cho mục đích điều phối giao vận đơn hàng Banova.
                      </p>
                    </div>
                  </div>

                  {/* Customer & Delivery Address Form Card */}
                  <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-highest/60 space-y-space-md">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-secondary text-[22px]">person_pin_circle</span>
                        <h2 className="font-headline-sm text-headline-sm font-bold">Thông tin nhận hàng</h2>
                      </div>
                      <span className="font-body-sm text-[12px] text-outline font-medium">
                        <span className="text-error">*</span> Bắt buộc điền
                      </span>
                    </div>

                    <form className="space-y-space-md" onSubmit={handleSubmitOrder}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                        {/* Họ và tên người nhận (*) */}
                        <div className="space-y-1.5">
                          <label className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between" htmlFor="custName">
                            <span>Họ và tên người nhận <span className="text-error">*</span></span>
                            <span className="font-body-sm text-[12px] text-outline font-normal">Họ tên đầy đủ</span>
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[20px]">badge</span>
                            <input 
                              id="custName"
                              type="text"
                              required
                              value={formData.name}
                              onChange={(e) => handleFormChange('name', e.target.value)}
                              placeholder="Ví dụ: Nguyễn Văn An"
                              className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                            />
                          </div>
                        </div>

                        {/* Số điện thoại nhận hàng (*) */}
                        <div className="space-y-1.5">
                          <label className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between" htmlFor="custPhone">
                            <span>Số điện thoại (Nhận hàng) <span className="text-error">*</span></span>
                            <span className="font-body-sm text-[12px] text-secondary font-semibold">Tài xế liên hệ trước</span>
                          </label>
                          <div className="relative">
                            <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[20px]">call</span>
                            <input 
                              id="custPhone"
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => handleFormChange('phone', e.target.value)}
                              placeholder="0912 345 678"
                              className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email nhận hóa đơn VAT */}
                      <div className="space-y-1.5">
                        <label className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between" htmlFor="custEmail">
                          <span>Email nhận thông tin &amp; Hóa đơn VAT (Tùy chọn)</span>
                          <span className="font-body-sm text-[12px] text-on-surface-variant">Lộ trình vận đơn tự động</span>
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[20px]">mail</span>
                          <input 
                            id="custEmail"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleFormChange('email', e.target.value)}
                            placeholder="an.nguyen@example.com"
                            className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Tỉnh/Thành phố & Quận/Huyện */}
                      <div className="space-y-1.5">
                        <label className="font-label-md text-label-md text-on-surface font-bold">
                          Khu vực giao hàng &amp; Địa chỉ chi tiết <span className="text-error">*</span>
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm mb-2">
                          <div className="bg-surface-container-low border border-surface-container-highest rounded-xl p-3 flex items-center justify-between">
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Tỉnh / Thành phố:</span>
                            <span className="font-label-md text-label-md font-bold text-primary flex items-center gap-1">
                              <span className="material-symbols-outlined text-[16px] text-secondary">location_city</span>
                              Bình Định / Toàn quốc
                            </span>
                          </div>
                          <div className="bg-surface-container-low border border-surface-container-highest rounded-xl p-3 flex items-center justify-between">
                            <span className="font-body-sm text-body-sm text-on-surface-variant">Quận / Huyện:</span>
                            <span className="font-label-md text-label-md font-bold text-primary">TP. Quy Nhơn</span>
                          </div>
                        </div>

                        {/* Địa chỉ chi tiết */}
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[20px]">home_pin</span>
                          <input 
                            id="custAddress"
                            type="text"
                            required
                            value={formData.address}
                            onChange={(e) => handleFormChange('address', e.target.value)}
                            placeholder="Số nhà, tên đường, khu dân cư, phường/xã..."
                            className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                          />
                        </div>
                      </div>

                      {/* Ghi chú giao hàng */}
                      <div className="space-y-1.5">
                        <label className="font-label-md text-label-md text-on-surface font-bold flex items-center justify-between" htmlFor="custNotes">
                          <span>Ghi chú giao hàng</span>
                          <span className="font-body-sm text-[12px] text-on-surface-variant">Lưu ý cho shipper</span>
                        </label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-on-surface-variant text-[20px]">edit_note</span>
                          <input 
                            id="custNotes"
                            type="text"
                            value={formData.notes}
                            onChange={(e) => handleFormChange('notes', e.target.value)}
                            placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến 15 phút..."
                            className="w-full h-12 pl-11 pr-4 bg-surface-container-low border border-surface-container-highest rounded-xl text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:border-secondary focus:ring-1 focus:ring-secondary focus:outline-none transition-all"
                          />
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Phương thức thanh toán (Payment Methods) */}
                  <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container-highest/60 space-y-space-md">
                    <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                      <div className="flex items-center gap-2 text-primary">
                        <span className="material-symbols-outlined text-secondary text-[22px]">payments</span>
                        <h2 className="font-headline-sm text-headline-sm font-bold">Phương thức thanh toán</h2>
                      </div>
                      <span className="font-label-sm text-label-sm bg-secondary-container/60 text-secondary px-3 py-1 rounded-full font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">verified_user</span>
                        Bảo vệ SSL 256-bit
                      </span>
                    </div>

                    <div className="space-y-3">
                      {/* Tùy chọn 1 (Mặc định): Thanh toán mô phỏng tức thì */}
                      <label 
                        onClick={() => setPaymentMethod('demo')}
                        className={`cursor-pointer block p-space-md rounded-2xl transition-all relative overflow-hidden ${
                          paymentMethod === 'demo'
                            ? 'border-2 border-secondary bg-surface-container-low/70'
                            : 'border border-surface-container-highest bg-surface-container-low/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start gap-space-md">
                          <div className="pt-0.5">
                            <input 
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'demo'}
                              onChange={() => setPaymentMethod('demo')}
                              className="w-5 h-5 accent-secondary cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 space-y-1.5">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-label-lg text-label-lg font-extrabold text-primary">
                                Thanh toán mô phỏng tức thì (Demo Instant Payment)
                              </span>
                              <span className="font-label-sm text-[11px] bg-secondary text-on-secondary px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                                Không trừ tiền thật - Môi trường thử nghiệm
                              </span>
                            </div>
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                              Cơ chế tự động tạo mã vận đơn kiểm tra y sinh và xác nhận đơn hàng thành công ngay lập tức trong 3 giây qua sandbox an toàn.
                            </p>
                            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs font-mono font-medium text-on-surface-variant">
                              <span className="bg-surface-container-lowest border border-surface-container-highest px-2 py-0.5 rounded-md shadow-2xs">
                                SANDBOX-GATEWAY
                              </span>
                              <span className="bg-surface-container-lowest border border-surface-container-highest px-2 py-0.5 rounded-md shadow-2xs text-secondary font-bold">
                                ZERO-FEE
                              </span>
                              <span className="bg-surface-container-lowest border border-surface-container-highest px-2 py-0.5 rounded-md shadow-2xs text-primary font-bold">
                                XÁC NHẬN TỨC THÌ (3 GIÂY)
                              </span>
                            </div>
                          </div>
                        </div>
                      </label>

                      {/* Tùy chọn 2: COD */}
                      <label 
                        onClick={() => setPaymentMethod('cod')}
                        className={`cursor-pointer block p-space-md rounded-2xl transition-all ${
                          paymentMethod === 'cod'
                            ? 'border-2 border-secondary bg-surface-container-low/70'
                            : 'border border-surface-container-highest bg-surface-container-low/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start gap-space-md">
                          <div className="pt-0.5">
                            <input 
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'cod'}
                              onChange={() => setPaymentMethod('cod')}
                              className="w-5 h-5 accent-secondary cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-label-lg text-label-md font-bold text-on-surface">
                                Thanh toán khi nhận hàng (COD)
                              </span>
                              <span className="font-label-sm text-[11px] bg-surface-variant text-on-surface-variant px-2.5 py-0.5 rounded-full font-semibold">
                                Đồng kiểm khi nhận hàng
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Quý khách mở kiện hàng kiểm tra tem niêm phong và mã truy xuất nguồn gốc chuối Gia Lai trước khi trả tiền cho bưu tá.
                            </p>
                          </div>
                        </div>
                      </label>

                      {/* Tùy chọn 3: Chuyển khoản QR Napas 24/7 (VietQR) */}
                      <label 
                        onClick={() => setPaymentMethod('qr')}
                        className={`cursor-pointer block p-space-md rounded-2xl transition-all ${
                          paymentMethod === 'qr'
                            ? 'border-2 border-secondary bg-surface-container-low/70'
                            : 'border border-surface-container-highest bg-surface-container-low/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start gap-space-md">
                          <div className="pt-0.5">
                            <input 
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'qr'}
                              onChange={() => setPaymentMethod('qr')}
                              className="w-5 h-5 accent-secondary cursor-pointer"
                            />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-label-lg text-label-md font-bold text-on-surface">
                                Chuyển khoản QR Napas 24/7 (VietQR tích hợp)
                              </span>
                              <span className="font-label-sm text-[11px] bg-secondary-container/80 text-secondary px-2.5 py-0.5 rounded-full font-bold">
                                Miễn phí giao dịch
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Quét mã QR tự động điền số tài khoản, mã đơn hàng và số tiền chính xác qua ứng dụng ngân hàng di động.
                            </p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Nút quay lại giỏ hàng */}
                  <div className="flex justify-start">
                    <button 
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="font-label-md text-label-md text-on-surface-variant hover:text-primary font-bold flex items-center gap-1.5 py-2 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[18px]">arrow_back</span>
                      Quay lại chỉnh sửa số lượng giỏ hàng
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* CỘT PHẢI: Sticky Order Summary Card (Col 4 / ~40%) */}
            <div className="lg:col-span-4 sticky top-24 space-y-space-md">
              <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-lg border border-surface-container-highest/60 space-y-space-md">
                <div className="flex items-center justify-between pb-space-sm bg-surface-container-low -mx-space-lg -mt-space-lg p-space-md rounded-t-2xl border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">receipt_long</span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Tóm tắt đơn hàng</h3>
                  </div>
                  <span className="font-label-sm text-label-sm bg-primary-container text-on-primary px-3 py-1 rounded-full font-bold font-mono">
                    {totalQty} sản phẩm
                  </span>
                </div>

                {/* Danh sách mini các sản phẩm */}
                <div className="space-y-2 py-1 max-h-48 overflow-y-auto divide-y divide-surface-container/60">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-body-sm font-body-sm pt-1">
                      <div className="flex items-center gap-2 truncate pr-2">
                        <span className="w-2 h-2 rounded-full bg-secondary shrink-0" />
                        <span className="text-on-surface truncate font-medium">
                          {item.quantity}x {item.name}
                        </span>
                      </div>
                      <span className="font-bold text-primary font-mono text-sm shrink-0">
                        {formatVND(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Bảng tính chi phí */}
                <div className="space-y-2.5 pt-2 border-t border-surface-container text-body-sm">
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Tạm tính:</span>
                    <span className="font-bold text-on-surface font-mono">{formatVND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      Phí giao hàng:
                      <span className="material-symbols-outlined text-[16px] text-secondary" title="Freeship Quy Nhơn &amp; Toàn Quốc">info</span>
                    </span>
                    <div className="text-right">
                      <span className="text-outline-variant line-through text-xs font-mono mr-1">30.000 ₫</span>
                      <span className="text-secondary font-bold font-mono">0 ₫ (Freeship)</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant">
                    <span>Giảm giá ({couponCode}):</span>
                    <span className="text-secondary font-bold font-mono">
                      {couponApplied ? '-0 ₫ (Freeship)' : '0 ₫'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-variant text-xs">
                    <span>Thuế VAT y sinh (8%):</span>
                    <span className="text-on-surface-variant font-medium">Đã bao gồm trong giá</span>
                  </div>

                  {/* Tổng thanh toán */}
                  <div className="pt-space-sm mt-space-sm bg-surface-container-low p-space-md rounded-xl space-y-1 border border-surface-container">
                    <div className="flex justify-between items-baseline">
                      <span className="font-label-lg text-label-lg font-bold text-primary">Tổng thanh toán:</span>
                      <span className="font-headline-lg text-[26px] font-extrabold text-primary-container tracking-tight font-mono">
                        {formatVND(finalTotal)}
                      </span>
                    </div>
                    <p className="font-body-sm text-[11px] text-on-surface-variant text-right">
                      Đã bao gồm thuế GTGT &amp; cước bảo ôn
                    </p>
                  </div>
                </div>

                {/* Thông báo lỗi khi submit đặt hàng (B2-09) */}
                {orderError && (
                  <div className="p-4 rounded-xl bg-error-container/40 border border-error text-error text-body-sm flex items-start gap-2.5 animate-in fade-in">
                    <span className="material-symbols-outlined text-[20px] shrink-0 mt-0.5">error</span>
                    <div className="space-y-0.5">
                      <strong className="block font-semibold">Không thể gửi đơn hàng:</strong>
                      <span>{orderError}</span>
                    </div>
                  </div>
                )}

                {/* Checkout Trigger Button (CTA Nổi bật) */}
                <button 
                  type="button"
                  disabled={cartItems.length === 0 || isSubmitting}
                  onClick={() => {
                    if (currentStep === 1) {
                      setCurrentStep(2);
                    } else {
                      handleSubmitOrder();
                    }
                  }}
                  className="w-full py-4 bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg font-bold tracking-wide shadow-xl hover:bg-primary transition-all flex items-center justify-center gap-2 group transform active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[22px] group-hover:rotate-12 transition-transform text-secondary-fixed">
                    lock_clock
                  </span>
                  <span>
                    {isSubmitting 
                      ? 'Đang xử lý đặt hàng...' 
                      : (currentStep === 1 
                        ? `Tiến hành đặt hàng (${formatVND(finalTotal)})` 
                        : `Xác nhận đặt hàng mô phỏng (${formatVND(finalTotal)})`
                      )
                    }
                  </span>
                </button>

                

                {/* Huy hiệu cam kết & bảo chứng */}
                <div className="space-y-2.5 pt-3 border-t border-surface-container text-on-surface-variant text-xs font-medium">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">verified</span>
                    <span>Cam kết 100% Chuối xanh Gia Lai tự nhiên OCOP 4 sao</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">published_with_changes</span>
                    <span>Đổi trả miễn phí 7 ngày nếu không ưng ý</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">shield</span>
                    <span>Bảo mật thông tin chuẩn y sinh SSL 256-bit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[18px]">medical_services</span>
                    <span>Dược sĩ vi sinh tư vấn 1:1 trong suốt liệu trình</span>
                  </div>
                </div>
              </div>

              {/* Thông tin chứng thực nông nghiệp Gia Lai */}
              <div className="bg-gradient-to-br from-surface-container-low to-secondary-container/20 border border-secondary/20 rounded-2xl p-space-md flex items-start gap-space-sm shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[22px]">eco</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-label-md text-label-md font-bold text-primary">Chứng thực Nông nghiệp Cao nguyên Gia Lai</h4>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    Quy trình sấy lạnh giữ tinh thể RS2 kháng tiêu hóa, thu hoạch từ chuối xanh thổ nhưỡng đất đỏ bazan Đak Đoa - Gia Lai ở độ già 75-80 ngày tuổi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= STEP 3: SUCCESS CONFIRMATION VIEW (DYNAMIC) ======================= */}
      {currentStep === 3 && orderSuccessData && (
        <div className="max-w-7xl mx-auto px-margin-sm lg:px-gutter py-space-lg w-full animate-in fade-in zoom-in-95 duration-500">
          <div className="relative w-full overflow-hidden bg-gradient-to-b from-surface-container-low via-surface to-surface pb-space-xl">
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[340px] bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-48 right-12 w-[320px] h-[320px] bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative max-w-5xl mx-auto pt-space-sm space-y-space-lg">
              
              {/* Header Chúc mừng thành công */}
              <section className="flex flex-col items-center text-center max-w-3xl mx-auto pt-space-sm">
                <div className="relative flex items-center justify-center mb-space-md">
                  <div className="absolute w-28 h-28 rounded-full bg-secondary-fixed-dim/30 animate-ping opacity-60" />
                  <div className="relative w-20 h-20 rounded-full bg-primary-container flex items-center justify-center shadow-lg shadow-primary-container/20">
                    <span className="material-symbols-outlined text-[42px] text-secondary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>
                      check_circle
                    </span>
                  </div>
                  <span className="material-symbols-outlined absolute -top-1 -right-3 text-secondary text-2xl rotate-12">eco</span>
                  <span className="material-symbols-outlined absolute -bottom-2 -left-3 text-secondary text-xl -rotate-45">psychiatry</span>
                </div>

                <div className="inline-flex items-center gap-space-xs bg-secondary-container/40 px-space-md py-1 rounded-full mb-space-sm">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
                    Xác nhận thanh toán mô phỏng thành công
                  </span>
                </div>

                <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold mb-space-xs">
                  Đặt hàng thành công! Cảm ơn bạn đã lựa chọn Banova.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Mã đơn hàng: <strong className="text-primary font-bold text-[18px] font-mono px-2 py-0.5 bg-surface-container rounded-lg">{orderSuccessData.orderId}</strong>
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-1">
                  Đã gửi thông tin đơn hàng và hóa đơn điện tử đến <span className="font-semibold text-primary">{orderSuccessData.customer.email || 'an.nguyen@example.com'}</span> và tin nhắn SMS <span className="font-semibold text-primary">{orderSuccessData.customer.phone}</span>
                </p>

                {/* Status Bar */}
                <div className="w-full mt-space-lg p-space-md bg-surface-container-lowest rounded-xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container">
                  <div className="flex items-center gap-space-sm">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container animate-ping" />
                      <span className="font-bold">Chờ xử lý (PENDING)</span>
                    </div>
                    <span className="text-outline-variant hidden sm:inline">•</span>
                    <span className="font-label-md text-label-md text-on-surface-variant">Chuẩn hóa dược lý Gia Lai</span>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-md text-label-md text-right">
                    <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
                    <span>Dự kiến trong <strong>2h tại TP. Quy Nhơn</strong> (24–48h đối với toàn quốc)</span>
                  </div>
                </div>
              </section>

              {/* 4-Stage Fulfillment Pipeline Timeline */}
              <section className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between relative gap-space-md">
                  {/* Step 1 */}
                  <div className="flex items-center gap-space-sm z-10 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold shadow-md">
                      <span className="material-symbols-outlined text-[20px]">done</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-secondary font-bold uppercase">1. Vừa xong</p>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">Đặt hàng thành công</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">{orderSuccessData.createdAt} - Hôm nay</p>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1 h-0.5 bg-secondary mx-2" />

                  {/* Step 2 */}
                  <div className="flex items-center gap-space-sm z-10 w-full md:w-auto">
                    <div className="w-10 h-10 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold shadow-sm">
                      <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-tertiary-container font-bold uppercase">2. Đang xử lý</p>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface text-[16px] leading-tight font-bold">Dược sĩ thẩm định &amp; đóng gói</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Kiểm tra bao bì vi sinh RS2</p>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1 h-0.5 bg-surface-container-high mx-2" />

                  {/* Step 3 */}
                  <div className="flex items-center gap-space-sm z-10 w-full md:w-auto opacity-70">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface-variant uppercase">3. Dự kiến</p>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface-variant text-[16px] leading-tight font-bold">Giao hàng hỏa tốc</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">2h tại Quy Nhơn / 24-48h toàn quốc</p>
                    </div>
                  </div>

                  <div className="hidden md:block flex-1 h-0.5 bg-surface-container-high mx-2" />

                  {/* Step 4 */}
                  <div className="flex items-center gap-space-sm z-10 w-full md:w-auto opacity-70">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center font-bold">
                      <span className="material-symbols-outlined text-[20px]">health_and_safety</span>
                    </div>
                    <div>
                      <p className="font-label-md text-label-md text-on-surface-variant uppercase">4. Đồng hành</p>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface-variant text-[16px] leading-tight font-bold">Dược sĩ đồng hành vi sinh 1:1</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Theo dõi đáp ứng đường ruột</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Chi tiết đơn hàng & Khách hàng */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
                {/* Thông tin nhận hàng (Cột trái - 5 cột) */}
                <div className="lg:col-span-5 flex flex-col gap-space-md">
                  <div className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
                    <div>
                      <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-surface-container">
                        <div className="flex items-center gap-space-xs text-primary">
                          <span className="material-symbols-outlined text-secondary">pin_drop</span>
                          <h3 className="font-headline-sm text-headline-sm font-bold">Thông tin nhận hàng</h3>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-0.5 bg-secondary-container/40 text-secondary font-bold rounded-full">
                          Giao Hỏa Tốc
                        </span>
                      </div>

                      <div className="space-y-space-xs font-body-md text-body-md text-on-surface">
                        <div className="flex items-center gap-space-xs">
                          <span className="font-semibold text-primary">{orderSuccessData.customer.name}</span>
                          <span className="text-on-surface-variant">• {orderSuccessData.customer.phone}</span>
                        </div>
                        <p className="text-on-surface-variant">{orderSuccessData.customer.address}, {orderSuccessData.customer.district}, {orderSuccessData.customer.city}</p>
                      </div>

                      {orderSuccessData.customer.notes && (
                        <div className="mt-space-md p-space-sm bg-surface-container-low rounded-lg">
                          <span className="font-label-sm text-label-sm text-on-surface-variant block font-semibold mb-0.5">
                            Ghi chú giao hàng:
                          </span>
                          <p className="font-body-sm text-body-sm text-primary italic">
                            "{orderSuccessData.customer.notes}"
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-space-lg pt-space-sm border-t border-surface-container">
                      <div className="flex items-center justify-between mb-space-xs">
                        <span className="font-label-md text-label-md text-on-surface-variant">Phương thức thanh toán đã chọn</span>
                        <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full font-semibold">
                          <span className="material-symbols-outlined text-[14px]">verified</span> Đã xác thực
                        </span>
                      </div>
                      <div className="p-space-sm bg-surface-container rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-primary">credit_card</span>
                          <div>
                            <p className="font-label-md text-label-md font-bold text-primary">
                              {orderSuccessData.paymentMethod === 'cod' 
                                ? 'Thanh toán khi nhận hàng (COD)' 
                                : orderSuccessData.paymentMethod === 'qr' 
                                  ? 'Chuyển khoản QR Napas 24/7 (VietQR)' 
                                  : 'Thanh toán mô phỏng tức thì (Demo Instant)'
                              }
                            </p>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              {orderSuccessData.paymentMethod === 'demo' ? 'Đã xác thực thành công (Sandbox 0đ)' : 'Đồng kiểm khi nhận kiện hàng'}
                            </p>
                          </div>
                        </div>
                        <span className="font-label-sm text-label-sm px-2 py-1 rounded bg-surface-container-highest text-on-surface-variant font-bold font-mono">
                          {orderSuccessData.paymentMethod === 'demo' ? 'Sandbox 0đ' : 'COD'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Nông nghiệp Gia Lai Card */}
                  <div className="bg-primary p-space-md rounded-2xl text-on-primary relative overflow-hidden shadow-sm">
                    <div className="absolute -right-6 -bottom-6 w-28 h-28 bg-surface-tint/30 rounded-full blur-xl" />
                    <div className="flex items-start gap-space-sm">
                      <span className="material-symbols-outlined text-secondary-fixed text-[28px]">biotech</span>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-[16px] text-primary-fixed font-bold">
                          Nguồn gốc Nông nghiệp Cao nguyên Gia Lai
                        </h4>
                        <p className="font-body-sm text-body-sm text-primary-fixed-dim mt-1">
                          Chuối xanh tự nhiên Đak Đoa - Gia Lai chuẩn OCOP 4 sao, công nghệ sấy lạnh giữ trọn tinh bột kháng RS2 tự nhiên lên men chậm tối ưu cho đại tràng.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Danh sách sản phẩm đã đặt (Cột phải - 7 cột) */}
                <div className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm flex flex-col justify-between border border-surface-container">
                  <div>
                    <div className="flex items-center justify-between pb-space-sm mb-space-md border-b border-surface-container">
                      <div className="flex items-center gap-space-xs text-primary">
                        <span className="material-symbols-outlined text-secondary">shopping_bag</span>
                        <h3 className="font-headline-sm text-headline-sm font-bold">
                          Chi tiết sản phẩm đã đặt ({orderSuccessData.items.length})
                        </h3>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface-variant font-semibold font-mono">
                        Mã phiếu: #{orderSuccessData.orderId}
                      </span>
                    </div>

                    <div className="space-y-space-md">
                      {orderSuccessData.items.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center gap-space-md p-space-sm rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors"
                        >
                          <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center shrink-0 overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-label-lg text-label-lg font-bold text-on-surface truncate">
                                  {item.name}
                                </h4>
                                <p className="font-body-sm text-body-sm text-on-surface-variant">
                                  {item.rsTag || 'RS2 Tự nhiên từ chuối xanh Đak Đoa Gia Lai'}
                                </p>
                              </div>
                              <span className="font-headline-sm text-headline-sm text-[16px] text-primary font-bold font-mono">
                                {formatVND(item.price * item.quantity)}
                              </span>
                            </div>
                            <div className="flex items-center gap-space-sm mt-1">
                              <span className="font-label-sm text-label-sm text-on-surface-variant">
                                Số lượng: 0{item.quantity}
                              </span>
                              <span className="inline-flex items-center gap-0.5 text-secondary font-label-sm text-label-sm font-semibold">
                                <span className="material-symbols-outlined text-[13px]">verified</span> 68.4% RS2 Assay
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Quà tặng kèm y sinh */}
                      <div className="flex items-center gap-space-md p-space-sm rounded-xl bg-secondary-container/20 border border-dashed border-secondary/40">
                        <div className="w-16 h-16 rounded-lg bg-surface-container-lowest flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-secondary text-[28px]">card_giftcard</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-label-sm text-label-sm uppercase px-1.5 py-0.5 rounded bg-secondary text-on-secondary font-bold inline-block mb-1">
                                Quà tặng kèm y sinh
                              </span>
                              <h4 className="font-label-lg text-label-lg font-bold text-primary truncate">
                                Muỗng Định Lượng Chuẩn 15g + Ebook Vi Sinh 14 Ngày
                              </h4>
                              <p className="font-body-sm text-body-sm text-on-surface-variant">
                                Liệu trình kích hoạt vi khuẩn tạo Butyrate
                              </p>
                            </div>
                            <span className="font-label-lg text-label-lg text-secondary font-bold font-mono">0 ₫</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chi phí breakdown */}
                    <div className="mt-space-lg pt-space-md space-y-space-xs border-t border-surface-container">
                      <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Tạm tính</span>
                        <span className="text-on-surface font-semibold font-mono">{formatVND(orderSuccessData.subtotal)}</span>
                      </div>
                      <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span className="flex items-center gap-1">
                          Phí giao hàng <span className="text-secondary font-label-sm text-label-sm font-bold bg-secondary-container/50 px-1.5 rounded">Miễn phí (Quy Nhơn &amp; Toàn Quốc)</span>
                        </span>
                        <span className="text-secondary font-semibold font-mono">0 ₫</span>
                      </div>
                      <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Giảm giá khuyến mãi ({couponCode})</span>
                        <span className="text-on-surface font-semibold font-mono">-0 ₫</span>
                      </div>
                      <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                        <span>Thuế GTGT (VAT) &amp; Phí bảo ôn</span>
                        <span className="text-on-surface-variant font-medium">Đã bao gồm</span>
                      </div>
                      <div className="flex justify-between items-baseline pt-space-sm mt-space-sm text-primary border-t border-surface-container">
                        <div>
                          <span className="font-headline-sm text-headline-sm font-bold">Tổng thanh toán</span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Hình thức: {orderSuccessData.paymentMethod === 'demo' ? 'Đã đối soát giả lập Sandbox' : 'Thanh toán COD'}
                          </p>
                        </div>
                        <span className="font-headline-lg text-headline-lg font-bold text-primary font-mono">
                          {formatVND(orderSuccessData.finalTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hỗ trợ Dược Sĩ 1-on-1 & Nút In Vận Đơn */}
              <section className="bg-surface-container-low rounded-2xl p-space-lg border border-surface-container">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-space-lg">
                  <div className="flex items-center gap-space-md">
                    <div className="w-14 h-14 rounded-full bg-primary-container text-secondary-fixed flex items-center justify-center shrink-0 shadow">
                      <span className="material-symbols-outlined text-[32px]">support_agent</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-space-xs mb-1">
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                          Đồng hành sức khỏe đường ruột cùng Banova
                        </h3>
                        <span className="font-label-sm text-label-sm bg-secondary text-on-secondary px-2 py-0.5 rounded-full font-bold">
                          1-on-1 Support
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                        Dược sĩ lâm sàng sẽ theo dõi phản ứng sinh hơi trong 3 ngày đầu tiên khi bổ sung tinh bột kháng. Hãy kết nối ngay để nhận phác đồ chia liều tối ưu.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-space-sm w-full lg:w-auto">
                    <a 
                      href="https://zalo.me" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-md py-3 rounded-xl font-label-lg text-label-lg font-bold shadow-md transition-all"
                    >
                      <span className="material-symbols-outlined text-[20px]">chat</span>
                      <span>Dược sĩ tư vấn Zalo (0900 xxx)</span>
                    </a>
                    <button 
                      type="button"
                      onClick={() => alert('Cẩm nang Hướng dẫn Sử dụng RS2 Banova 14 Ngày (PDF) đang được tải về...')}
                      className="flex-1 lg:flex-initial inline-flex items-center justify-center gap-space-xs bg-surface-container-lowest hover:bg-surface text-primary px-space-md py-3 rounded-xl font-label-lg text-label-lg font-bold shadow-sm transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px] text-secondary">download</span>
                      <span>Tải cẩm nang sử dụng RS2 (PDF)</span>
                    </button>
                  </div>
                </div>

                <div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container">
                  <button 
                    type="button"
                    onClick={() => window.print()}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs text-on-surface-variant hover:text-primary font-label-lg text-label-lg transition-colors py-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">print</span>
                    <span>In biên nhận đơn hàng</span>
                  </button>
                  <div className="flex items-center gap-space-sm w-full sm:w-auto">
                    <button 
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        onNavigate('trang-chu');
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-surface-container text-primary hover:bg-surface-container-high px-space-lg py-3 rounded-xl font-label-lg text-label-lg font-bold transition-all cursor-pointer"
                    >
                      Quay lại trang chủ
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setCurrentStep(1);
                        onNavigate('san-pham');
                      }}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-space-xs bg-primary hover:bg-primary-container text-on-primary px-space-lg py-3 rounded-xl font-label-lg text-label-lg font-bold shadow-md transition-all cursor-pointer"
                    >
                      <span>Tiếp tục mua sắm</span>
                      <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* 4. Khung Khuyến cáo Y Tế Bắt Buộc (Medical Disclaimer chuẩn với khiên y tế xanh) */}
      <div className="max-w-7xl mx-auto px-margin-sm lg:px-gutter pb-space-xl w-full">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
