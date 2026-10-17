import React from 'react';

export default function FeaturedProducts({ 
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  const products = [
    {
      id: 'prod-01',
      name: 'Bột tinh bột kháng Banova 250g',
      category: 'Hũ thủy tinh organic',
      badge: 'Best Seller',
      badgeType: 'secondary',
      rsBadge: '5.8g RS/khẩu phần',
      description: 'Hũ thủy tinh nắp gỗ bảo quản tối ưu, dùng hàng ngày pha nước ấm, sinh tố hoặc làm bánh.',
      price: 89000,
      formattedPrice: '89.000₫',
      unitInfo: 'Hũ 250 gram',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwGVTi1gB1XvNbSveYj_baHXsEbIOocmjJkIBVAFObemwtPxprwGnjI0ql6zljWfiOW3YYwywLmneJKhVc9vYG_lxGF9KNdEEGJ8G2KuFRvFhVgSJxlpv6969fl-nRcjp4ZHnopEgzoWmcQQE_zDbEEv3OlU5yB6kCjdpoiU_6pJQMEpqmtIMT4qSsrCc8VIroRwVHf3QsPqE9WTOpF9lF9qch7DDX04ErGUle-6PjvanY1rdFfVcB'
    },
    {
      id: 'prod-02',
      name: 'Bột Banova 10 gói 15g tiện lợi',
      category: 'Tiện ích văn phòng',
      badge: 'Tiện dụng',
      badgeType: 'primary',
      rsBadge: 'Có thể pha nước ấm',
      description: 'Định lượng sẵn 15g/gói, thuận tiện mang theo công tác, du lịch hoặc pha nhanh tại văn phòng.',
      price: 69000,
      formattedPrice: '69.000₫',
      unitInfo: 'Hộp 10 gói x 15g',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhVy0SXof3yd9on9XWt_wloQlgtJ_Zb1E88uhb2UQ2-REpBD_OG24sDIZj82vBPqrmhFKcAJY8WUZOY9hKOFI2hpFg1eC288ZA2KjcnR_PNWD3CrtFgG_fIjDbKkOry-t_4UGT1Z_jSU06MB9MIRlGseb_xwjROwP0aJRjJZsm4L9Fzv4iGAWsUyu1_1txjP9W1xFa1TWJAuMoU3H5nsQu3gjmCL0l76dOtGu6uIEUTOgZAKQQmOkK'
    },
    {
      id: 'prod-03',
      name: 'Bánh quy nguyên cám Prebiotic',
      category: 'Bánh quy ăn dặm',
      badge: 'Ăn vặt lành tính',
      badgeType: 'tertiary',
      rsBadge: 'Giàu chất xơ thô',
      description: 'Bữa phụ giàu chất xơ từ bột chuối xanh và yến mạch, không đường tinh luyện, giòn tan tự nhiên.',
      price: 39000,
      formattedPrice: '39.000₫',
      unitInfo: 'Gói 120 gram',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-pZPCm-H90xKbf1tg-YyqR5gWMMx6nkcCMip1SCW-NN-BQp7_ktEZZ2w6fFQoihG-HzH_FfZdFuFB52WKp5oHRdqecutgIXTiByjVQvWvGFIyWLFq4h3XW4HXAlzb7DNG67Ss6-6U5QeHOHwx0npK5VbWIHO-03EGrt6sE6fhLzyW1YuEmzbvBvhCmYokPrRXhlyhAZOn3IU4-MwPk3VLeDMcJe0GJMFE2Cp9Bd-OIDmp0X5vRtHZ'
    },
    {
      id: 'prod-04',
      name: 'Hộp quà Quy Nhơn Healthy',
      category: 'Hộp quà Quy Nhơn',
      badge: 'Quà tặng ý nghĩa',
      badgeType: 'secondary',
      rsBadge: 'Full Combo + Ly Shaker',
      description: 'Bộ quà biếu thượng hạng kết hợp bột chuối xanh Gia Lai, bánh ăn kiêng và ly shaker cao cấp.',
      price: 219000,
      formattedPrice: '219.000₫',
      unitInfo: 'Bộ quà tặng giới hạn',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhHU4TxO1C2iLW-yIEMTt6Ki-s4As6aE-_qhpuanORYt4-o_Rei7EkhCWDcRwY7sj7JKKDj82yo8JDs4bI1tMPyGEQ_bFRaI3jbe0dmmfOTGQ9rCqCRtzOzFM48vxJLkm5_5VLgVjO67gnsGHQ5GxmPco9pD9W0bKPuMIMJYWsMLb6Roz3N997bMJmUbDPDHTFnsTSytXMu45ES-ZMxjyp-t6p5T0HM0v4vnINkFW6c5iIvt2FRxBz'
    }
  ];

  return (
    <section className="w-full py-space-xl bg-surface">
      <div className="max-w-7xl mx-auto px-gutter">
        {/* Section Title & Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
          <div className="space-y-space-xs max-w-2xl">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
              SẢN PHẨM TIÊU BIỂU
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight">
              Danh mục sản phẩm dinh dưỡng Banova tuyển chọn
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Chế biến từ 100% chuối xanh chọn lọc vùng đất bazan Gia Lai nguyên sơ, giữ trọn hàm lượng RS2 hoạt tính sinh học cao.
            </p>
          </div>
          <button 
            type="button"
            onClick={() => onNavigate('san-pham')}
            className="inline-flex items-center gap-1 text-secondary font-label-lg text-label-lg font-bold hover:text-primary transition-colors self-start md:self-auto"
          >
            <span>Xem toàn bộ bộ sưu tập</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </button>
        </div>

        {/* 4 SKU Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {products.map((item) => (
            <div 
              key={item.id} 
              className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-surface-container/40"
            >
              {/* Product Thumbnail */}
              <div className="relative w-full h-64 bg-surface-container-low overflow-hidden">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={item.name} 
                  src={item.image} 
                />
                <span className={`absolute top-3 left-3 px-space-sm py-1 rounded-full text-label-sm font-bold shadow-xs ${
                  item.badgeType === 'secondary'
                    ? 'bg-secondary text-on-secondary'
                    : item.badgeType === 'primary'
                    ? 'bg-primary text-on-primary'
                    : 'bg-tertiary-container text-on-tertiary-container'
                }`}>
                  {item.badge}
                </span>
                <span className="absolute bottom-3 left-3 px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[10px] font-semibold">
                  {item.rsBadge}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-md">
                <div className="space-y-1">
                  <span className="font-label-sm text-[11px] text-secondary font-bold uppercase">
                    {item.category}
                  </span>
                  <h3 className="font-headline-sm text-body-lg text-primary font-bold group-hover:text-secondary transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="pt-space-xs flex items-center justify-between border-t border-surface-container/50">
                  <div>
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      {item.formattedPrice}
                    </span>
                    <span className="font-body-sm text-[11px] text-on-surface-variant block">
                      {item.unitInfo}
                    </span>
                  </div>
                  <button 
                    type="button"
                    aria-label={`Thêm ${item.name} vào giỏ hàng`} 
                    onClick={() => onAddToCart(item)}
                    className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-xs hover:scale-105 active:scale-95" 
                  >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
