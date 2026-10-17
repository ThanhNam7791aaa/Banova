import React, { useState } from 'react';

export default function ProductDetailPage({ 
  product, 
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  // Sản phẩm mặc định nếu vào thẳng trang chi tiết
  const currentProduct = product || {
    id: 'prod-01',
    name: 'Bột Tinh Bột Kháng Banova 500g',
    category: 'bot',
    categoryLabel: 'Bột tinh bột kháng',
    price: 159000,
    formattedPrice: '159.000 ₫',
    originalPrice: '189.000 ₫',
    discountAmount: '30.000 ₫',
    rating: '4.9',
    reviewsCount: 48,
    deliveredCount: '2,450+',
    packageSpecs: 'Hũ 500g (33 bữa)',
    servingSize: '15g / ngày',
    origin: 'Gia Lai OCOP 4*',
    rsPercentage: '58.4% Tự Nhiên',
    description: 'Giải pháp nuôi dưỡng hệ vi sinh đường ruột & hỗ trợ ổn định đường huyết tự nhiên từ chuối xanh cao nguyên Gia Lai sấy lạnh bảo toàn hoạt tính sinh học RS2.'
  };

  // Gallery hình ảnh
  const galleryImages = [
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuRkeO2Ho9wX6lnlN3vj-0_UDE_XwgdH-ikBHOTMU85zIcwJkLVP3Z-txEDWHa0Q9w9uPRIGfDKPT27cF937f-Q4XGbvg3OGLyLARRmZr3it4s6-Fx7RDsWaROFNSa2rJzJH_kayZMwAehpeZn0_pj-v-JchvFYYl-Z_M3vtRxymFYgxQUbWAzrVen5e8QjLOP2YhUCiJbT4oNEvlpeGg5XDgBb1HEyg-jffB3T7KA4U5pISbBXwOU',
      label: 'Hũ 500g'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZyyHv7i0P4Be6-bj_Xd-9dSY16GoMVWBM6W5ZAoMxHvIK1rCU1kT_WLS6cmTpvqvrSbGNPxnWd8lqaydeijB0NSapWJ9JJYR5WddpFoSruRrJs2BK2DQrOCqZDObwGFR8u7uz2s4wDLCewmCuiBsACj5qxG-aB9SnYM5-YIOzvJ0t5HSFEv2k4c20Ijq-xS77c3ysUFKivMOWbsalhyd5uAT7qlNDlZgS4T2ug8kFXfTBgDLI7xe2',
      label: 'Bột mịn RS2'
    },
    {
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6fjzxGjnVkT8F55HdpQTFJOp2FVi2eGiRULZVRDlpPq01y12Vpqu8VBoa8GKXVvENTWWCgKNALDOKFcwyKfeUnAtU1VSR0-t7dguTTWFC1rSFp5Ksgs0z5q_0p5r97qZgbG9OW8KzY0IdN-_Ta4uazHytLuz09AkIJS4sk_JWFhushXaVwP3IFZsTV5hcK4l73km91yAnY2hhYrzcS4jU7oV00_XmWjI1yBZ1q-hwupw5J-tKrOzB',
      label: 'Món gợi ý'
    }
  ];

  // Sản phẩm liên quan
  const crossSellProducts = [
    {
      id: 'cross-01',
      name: 'Bánh quy nguyên cám Prebiotic Banova',
      badge: 'Bữa xế lành mạnh',
      rating: '4.8 (112)',
      price: 39000,
      formattedPrice: '39.000 ₫',
      subInfo: 'Gói 120g • Giàu chất xơ chuối xanh, hỗ trợ no lâu và không lo tích mỡ thừa.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMA7pke-2VlhpG1qiTtwt0th4YCiMdLRBah0ficRlaLdMt7RaD-XjGwbsIG5FEgylEyqmvG6ugCFe_GADNs0ToBEvyTKe0FJK8XUbTDH_yeBN1KMq-VJ-MXoAtYUEvmGinJlW2_6q424oYBX98iAP7_koKU635tk0PgwesPPZIHkRVF75dw2PuhBz5PySZbwfufw_BEwOnbvzc-oKpkIcqPqHd86W7RtXKdVYWjRE6vrPQdoAbJu_Z'
    },
    {
      id: 'cross-02',
      name: 'Bột Banova 10 gói 15g Tiện Lợi',
      badge: 'Tiện lợi văn phòng',
      rating: '4.9 (86)',
      price: 69000,
      formattedPrice: '69.000 ₫',
      subInfo: 'Hộp 150g • Chia sẵn định lượng chuẩn 15g mang đi công tác, du lịch gọn nhẹ.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpMX9imrxWGyDFz_ruZHVJ5Ul12nZFhr8yNhh_OE-IZ5F6IiWthVnHw40HGSyCJETrH4WY0djbsrCOgRr0TPyv_nsyRegPhM479d2_Seom-D1Mi_CyfYnhj9EwgiXDuKedG2EN2BU3XhxBzl2sZL5yIb3wZLs1Ts1I79WvbYWbqey-OgclFHbSrIiHIrSsbHrWss0l6aBwluis8NRiSPWIgspN4S3WZ5tl8oy0-68GfyygeZjrjwyq'
    },
    {
      id: 'cross-03',
      name: 'Hộp quà Sức Khỏe Quy Nhơn Cao Cấp',
      badge: 'Quà tặng sức khỏe',
      rating: '5.0 (34)',
      price: 219000,
      formattedPrice: '219.000 ₫',
      subInfo: 'Combo Hũ 250g + Bánh quy cám + Bình lắc y sinh nắp kín cao cấp.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChFDgcQJFjgdPgc7aMBfVOTy1C-33eU383upvJX_m4Kujz2hSOMYlW9yeuEL9q9fQFtdM7QcR6GiUCuQEM2EwIUCCEb4YlPggvX-DsSKE55ajDqZKn41vZ-NXeNKBloifBRuou_dGdzP-h5JLz1vFxr4gTJrJDNbn_qrLL8kWarQ_DTX3X9VhtSP_9IQap3r5d1VyNpWEFMv3ckcPvC5C0DxBK1kcCul6zg01BbL9U7RdGnghCHJK2'
    }
  ];

  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  const incrementQuantity = () => setQuantity((q) => q + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((q) => q - 1);
  };

  const handleAdd = () => {
    onAddToCart({
      ...currentProduct,
      quantity
    });
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Breadcrumb & Status Bar */}
      <div className="w-full bg-surface-container-low/60 border-b-0 py-3">
        <div className="max-w-7xl mx-auto px-gutter flex flex-wrap items-center justify-between gap-y-2">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant">
            <button 
              type="button"
              onClick={() => onNavigate('trang-chu')}
              className="hover:text-primary transition-colors"
            >
              Trang chủ
            </button>
            <span className="text-outline-variant font-bold">/</span>
            <button 
              type="button"
              onClick={() => onNavigate('san-pham')}
              className="hover:text-primary transition-colors"
            >
              Danh mục sản phẩm
            </button>
            <span className="text-outline-variant font-bold">/</span>
            <span className="text-primary font-semibold truncate max-w-[220px] sm:max-w-none">
              {currentProduct.name}
            </span>
          </nav>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/50 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container/30">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span>Còn hàng tại kho Quy Nhơn &amp; Gia Lai</span>
          </div>
        </div>
      </div>

      {/* 2. Primary Showcase: 2 Columns Hero Section */}
      <section className="w-full py-8 md:py-12 bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            
            {/* Left: Product Media Experience (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              {/* Main Product Canvas Container */}
              <div className="relative w-full aspect-[4/3] sm:aspect-square rounded-2xl bg-surface-container-lowest overflow-hidden shadow-sm group border border-surface-container">
                <img 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  alt={currentProduct.name} 
                  src={galleryImages[activeImageIndex].src} 
                />
                {/* Badges Floating Over Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm shadow-md">
                    <span className="material-symbols-outlined text-[15px] text-secondary-fixed">eco</span>
                    100% Chuối Xanh Gia Lai sấy lạnh
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-md">
                    Bán chạy nhất • Tiết kiệm 16%
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-xs flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm border border-surface-container/50">
                  <span className="material-symbols-outlined text-[16px] text-primary">zoom_in</span>
                  <span>Di chuột để xem kết cấu RS2</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="grid grid-cols-3 gap-3">
                {galleryImages.map((img, idx) => {
                  const isActive = activeImageIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Xem ảnh ${img.label}`}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative aspect-square rounded-xl overflow-hidden bg-surface-container-lowest transition-all duration-200 focus:outline-none border ${
                        isActive
                          ? 'ring-2 ring-secondary shadow-xs opacity-100 border-secondary'
                          : 'opacity-70 hover:opacity-100 border-surface-container'
                      }`}
                    >
                      <img className="w-full h-full object-cover" alt={img.label} src={img.src} />
                      <span className="absolute bottom-1 inset-x-1 text-center bg-primary/80 text-on-primary text-[10px] font-label-sm py-0.5 rounded">
                        {img.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Regional Social Proof Card */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-lowest shadow-xs border border-surface-container">
                <div className="w-10 h-10 rounded-full bg-secondary-container/40 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary text-[22px]">verified</span>
                </div>
                <div className="font-body-sm text-body-sm text-on-surface">
                  <span className="font-bold text-primary">1,280+ khách hàng</span> tại Quy Nhơn, Gia Lai &amp; Tây Nguyên tin dùng duy trì sức khỏe đường ruột mỗi tháng.
                </div>
              </div>
            </div>

            {/* Right: Commerce & Clinical Details (7 cols) */}
            <div className="lg:col-span-7 flex flex-col">
              {/* Category & Medical Level Pill */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-md bg-secondary/10 text-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Dinh Dưỡng Prebiotic Chuẩn Y Học
                </span>
                <span className="font-body-sm text-body-sm text-outline">• OCOP 4 Sao Gia Lai</span>
              </div>

              {/* Product Title */}
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight mb-2">
                {currentProduct.name}
              </h1>

              {/* Value Proposition Subtitle */}
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-4 leading-relaxed">
                {currentProduct.description}
              </p>

              {/* Verified Ratings & Social Metrics */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 pb-4 mb-5 bg-surface-container-low/50 p-3 rounded-xl border border-surface-container">
                <div className="flex items-center gap-1 text-on-tertiary-container">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                    ))}
                  </div>
                  <span className="font-label-lg text-label-lg font-bold text-on-surface ml-1">
                    {currentProduct.rating} / 5.0
                  </span>
                </div>
                <span className="text-outline-variant font-light">|</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-medium underline underline-offset-4 cursor-pointer hover:text-secondary">
                  {currentProduct.reviewsCount} đánh giá có xác thực mua hàng
                </span>
                <span className="text-outline-variant font-light">|</span>
                <span className="font-body-sm text-body-sm text-secondary font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_shipping</span>
                  Đã giao {currentProduct.deliveredCount} hũ thành công
                </span>
              </div>

              {/* Pricing & Promotions Box */}
              <div className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm mb-6 border border-surface-container">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {currentProduct.formattedPrice}
                  </span>
                  {currentProduct.originalPrice && (
                    <span className="font-headline-sm text-headline-sm text-outline line-through">
                      {currentProduct.originalPrice}
                    </span>
                  )}
                  {currentProduct.discountAmount && (
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      Tiết kiệm {currentProduct.discountAmount}
                    </span>
                  )}
                  <span className="ml-auto font-body-sm text-body-sm text-outline">Đã bao gồm thuế VAT</span>
                </div>
                {/* Bonus Inclusions */}
                <div className="mt-3 flex items-center gap-2 pt-3 bg-secondary-container/20 px-3 py-2 rounded-xl text-on-surface">
                  <span className="material-symbols-outlined text-secondary text-[20px]">redeem</span>
                  <p className="font-label-md text-label-md">
                    <strong>Đặc quyền:</strong> Tặng kèm 01 muỗng định lượng chuẩn y sinh 15g và Cẩm nang vi sinh ruột PDF.
                  </p>
                </div>
              </div>

              {/* Nutritional Specifications Grid Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-center border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Quy cách đóng</span>
                  <strong className="font-label-md text-label-md text-primary mt-0.5">
                    {currentProduct.packageSpecs}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-center border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Khẩu phần chuẩn</span>
                  <strong className="font-label-md text-label-md text-primary mt-0.5">
                    {currentProduct.servingSize}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-center border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Vùng nguyên liệu</span>
                  <strong className="font-label-md text-label-md text-primary mt-0.5">
                    {currentProduct.origin}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low flex flex-col justify-center border border-surface-container/40">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Hàm lượng RS2</span>
                  <strong className="font-label-md text-label-md text-secondary mt-0.5">
                    {currentProduct.rsPercentage}
                  </strong>
                </div>
              </div>

              {/* Interactive Purchase Triggers */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-6">
                {/* Stepper Controller */}
                <div className="flex items-center justify-between bg-surface-container-low rounded-xl px-2 py-1 h-12 w-full sm:w-36 shrink-0 border border-surface-container">
                  <button 
                    type="button"
                    aria-label="Giảm số lượng" 
                    onClick={decrementQuantity}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-variant flex items-center justify-center transition-colors font-bold text-lg"
                  >
                    -
                  </button>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold px-2">
                    {quantity}
                  </span>
                  <button 
                    type="button"
                    aria-label="Tăng số lượng" 
                    onClick={incrementQuantity}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary hover:bg-surface-variant flex items-center justify-center transition-colors font-bold text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button 
                  type="button"
                  onClick={handleAdd}
                  className="flex-1 h-12 px-6 rounded-xl bg-primary text-on-primary hover:bg-primary-container transition-all shadow-md flex items-center justify-center gap-2 font-label-lg text-label-lg font-bold hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                  <span>Thêm vào giỏ hàng</span>
                </button>

                {/* Express Checkout CTA */}
                <button 
                  type="button"
                  onClick={() => {
                    handleAdd();
                    onNavigate('dat-hang');
                  }}
                  className="h-12 px-6 rounded-xl bg-tertiary-container text-tertiary-fixed hover:bg-tertiary transition-all shadow-sm flex items-center justify-center font-label-lg text-label-lg font-bold text-center"
                >
                  Mua ngay (Giao 2h)
                </button>
              </div>

              {/* Reassurance & Trust Signals Box */}
              <div className="p-4 rounded-2xl bg-surface-container-lowest shadow-xs space-y-2.5 border border-surface-container">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">bolt</span>
                  <span className="font-body-sm text-body-sm text-on-surface">
                    <strong>Giao hỏa tốc nội thành:</strong> Nhận hàng trong 2h tại TP. Quy Nhơn &amp; TP. Pleiku.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">sync</span>
                  <span className="font-body-sm text-body-sm text-on-surface">
                    <strong>Cam kết chất lượng:</strong> 1 đổi 1 trong 7 ngày miễn phí nếu không hài lòng về độ mịn hoặc hương vị.
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-secondary text-[20px]">verified_user</span>
                  <span className="font-body-sm text-body-sm text-on-surface">
                    <strong>Tiêu chuẩn quốc tế:</strong> Đạt chứng nhận HACCP, ISO 22000 &amp; Kiểm nghiệm QUATEST 3 độc lập.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Deep Scientific Authority & Clinical Nutrition Panel */}
      <section className="w-full py-12 md:py-16 bg-surface-container-low/40">
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Section Title & Badge */}
          <div className="max-w-3xl mx-auto text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm uppercase tracking-widest font-bold mb-3 border border-secondary-container/40">
              <span className="material-symbols-outlined text-[15px]">biotech</span>
              Minh Bạch Khoa Học &amp; Dinh Dưỡng
            </span>
            <h2 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
              Giá trị sinh học trong mỗi khẩu phần tiêu chuẩn (15g)
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2">
              Được nghiên cứu và định lượng dựa trên tỷ lệ kháng tinh bột tự nhiên (Resistant Starch Type 2 - RS2) tối ưu cho việc hình thành Butyrate tại đại tràng.
            </p>
          </div>

          {/* 4 Key Nutritional Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between border border-surface-container">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[26px]">vital_signs</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Hàm lượng RS2 Tự Nhiên</span>
                <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1">5.8g</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Kháng tinh bột nguyên bản không bị thủy phân ở dạ dày, đi nguyên vẹn vào đại tràng nuôi vi khuẩn có lợi.
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm border-t border-surface-container">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Chiếm ~38.7% khối lượng</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between border border-surface-container">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[26px]">speed</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Chỉ số đường huyết (GI)</span>
                <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1">&lt; 45 (Rất thấp)</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Giải phóng năng lượng chậm, không làm tăng vọt insulin sau ăn; lý tưởng cho người ăn kiêng và tiền tiểu đường.
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm border-t border-surface-container">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Không gây tích mỡ đột ngột</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between border border-surface-container">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[26px]">grain</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Chất xơ prebiotic</span>
                <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1">3.2g</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Cơ chất then chốt để vi khuẩn đường ruột tổng hợp chuỗi acid béo ngắn (SCFA Butyrate) bảo vệ lớp niêm mạc.
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm border-t border-surface-container">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Tăng sinh Bifidobacteria</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-surface-container-lowest shadow-xs flex flex-col justify-between border border-surface-container">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container/30 flex items-center justify-center text-secondary mb-4">
                  <span className="material-symbols-outlined text-[26px]">energy_savings_leaf</span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Năng lượng thuần</span>
                <div className="font-headline-lg text-headline-lg text-primary font-bold mt-1">52 kcal</div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                  Hoàn toàn 0g đường tinh luyện phụ gia, 0% chất béo bão hòa và không chứa gluten gây viêm màng nhầy.
                </p>
              </div>
              <div className="mt-4 pt-3 flex items-center gap-1.5 text-secondary font-label-sm text-label-sm border-t border-surface-container">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>100% Thuần thực vật</span>
              </div>
            </div>
          </div>

          {/* Tabbed Evidence Panels */}
          <div className="max-w-5xl mx-auto bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden border border-surface-container">
            {/* Tab Navigation Buttons */}
            <div className="flex flex-wrap border-b border-surface-container bg-surface-container-low p-2 gap-2">
              <button 
                type="button"
                onClick={() => setActiveTab(0)}
                className={`px-5 py-3 rounded-xl font-label-lg text-label-lg transition-all ${
                  activeTab === 0
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                Thành phần &amp; Cơ chế tác động
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab(1)}
                className={`px-5 py-3 rounded-xl font-label-lg text-label-lg transition-all ${
                  activeTab === 1
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                Hướng dẫn sử dụng chuẩn y học
              </button>
              <button 
                type="button"
                onClick={() => setActiveTab(2)}
                className={`px-5 py-3 rounded-xl font-label-lg text-label-lg transition-all ${
                  activeTab === 2
                    ? 'bg-primary-container text-on-primary font-bold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest'
                }`}
              >
                Bảo quản &amp; Kiểm nghiệm chất lượng
              </button>
            </div>

            {/* Tab 0: Ingredients & Mechanism */}
            {activeTab === 0 && (
              <div className="p-6 md:p-8 space-y-4 animate-in fade-in duration-200">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center shrink-0 mt-1">
                    <span className="material-symbols-outlined text-secondary text-[22px]">science</span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-2">
                      Thành phần nguyên liệu 100% chuối xanh tuyển chọn
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      Chuối tiêu xanh được thu hoạch đúng độ tuổi sinh học tại vùng cao nguyên Gia Lai (độ cao trên 700m với chất đất đỏ bazan giàu khoáng chất). Quá trình sấy lạnh tầng sôi khép kín ở nhiệt độ đối lưu dưới <strong>50°C</strong> đảm bảo các liên kết tinh bột dạng chuỗi thẳng không bị phá vỡ thành đường maltose, duy trì nguyên vẹn cấu trúc kháng tinh bột RS2.
                    </p>
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-low text-on-surface text-body-sm font-body-sm border border-surface-container">
                  <p>
                    <strong>Cơ chế tác động sinh học:</strong> Khi đi qua dạ dày và ruột non, RS2 hoàn toàn trơ với các enzyme phân giải tiêu hóa thông thường. Khi đến đại tràng kết tụ, các chủng lợi khuẩn bản địa như <em>Bifidobacterium adolescentis</em> và <em>Faecalibacterium prausnitzii</em> sử dụng RS2 làm thức ăn, lên men yếm khí tạo ra chuỗi axit béo Butyrate, giúp thắt chặt các liên kết khe ruột và làm dịu hội chứng ruột kích thích (IBS).
                  </p>
                </div>
              </div>
            )}

            {/* Tab 1: Guidelines */}
            {activeTab === 1 && (
              <div className="p-6 md:p-8 space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-label-md shrink-0">1</span>
                    <div>
                      <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1">Cách pha nước ấm buổi sáng</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Pha 1-2 muỗng gạt (khoảng 15g) với 150ml - 200ml nước ấm (nhiệt độ lý tưởng từ 40°C đến 50°C). Khuấy đều bằng muỗng hoặc dùng bình lắc và uống trước bữa ăn sáng 30 phút.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start p-4 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold font-label-md shrink-0">2</span>
                    <div>
                      <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1">Kết hợp sinh tố &amp; bữa ăn nhẹ</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Có thể mix trực tiếp vào cốc sinh tố bơ chuối, trộn cùng sữa chua Hy Lạp, bột yến mạch ngâm qua đêm (overnight oats) hoặc rắc lên salad hoa quả thanh mát.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="p-4 rounded-xl bg-tertiary-fixed/30 flex items-start gap-3 border border-tertiary-container/30">
                  <span className="material-symbols-outlined text-tertiary text-[22px] shrink-0 mt-0.5">warning</span>
                  <div className="font-body-sm text-body-sm text-on-surface">
                    <strong className="text-tertiary block font-bold">LƯU Ý KỸ THUẬT QUAN TRỌNG:</strong>
                    Tuyệt đối <strong>KHÔNG</strong> pha với nước sôi trên 60°C hoặc đem nấu nướng nhiệt độ cao nếu mục đích là giữ nguyên tinh bột kháng. Nhiệt lượng cao sẽ làm biến tính (hồ hóa) tinh bột RS2 thành tinh bột hấp thụ nhanh thông thường.
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Storage */}
            {activeTab === 2 && (
              <div className="p-6 md:p-8 space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="material-symbols-outlined text-primary text-[24px] mb-2">lock</span>
                    <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1">Bảo quản sau mở nắp</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Vặn chặt nắp gỗ sau mỗi lần sử dụng để ngăn hút ẩm tự nhiên từ không khí. Để nơi khô ráo, tránh ánh sáng chiếu trực tiếp.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="material-symbols-outlined text-primary text-[24px] mb-2">calendar_today</span>
                    <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1">Hạn sử dụng tiêu chuẩn</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      12 tháng kể từ ngày sản xuất in dưới đáy hũ. Khuyến nghị dùng hết trong vòng 60 ngày sau khi mở màng seal bảo vệ.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-low border border-surface-container">
                    <span className="material-symbols-outlined text-primary text-[24px] mb-2">fact_check</span>
                    <h4 className="font-label-lg text-label-lg font-bold text-primary mb-1">Kiểm định độc lập</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Được kiểm nghiệm vi sinh và kim loại nặng bởi Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 3 (QUATEST 3).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. Mandatory Medical Disclaimer */}
      <section className="w-full py-6 bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="p-5 md:p-6 rounded-2xl bg-tertiary-fixed/20 shadow-xs flex items-start gap-4 border border-tertiary-container/30">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center shrink-0 text-on-tertiary-fixed">
              <span className="material-symbols-outlined text-[24px]">health_and_safety</span>
            </div>
            <div className="font-body-sm text-body-sm text-on-surface leading-relaxed">
              <strong className="font-label-lg text-label-lg text-tertiary block mb-1 font-bold">
                Lưu ý y khoa minh bạch từ Banova:
              </strong>
              Sản phẩm là thực phẩm bổ sung dinh dưỡng tự nhiên hỗ trợ hệ vi sinh và chức năng chuyển hóa tiêu hóa thông qua nguồn cơ chất RS2 nguyên bản; sản phẩm <strong>không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh</strong>. Người đang điều trị y tế với thuốc hạ đường huyết liều cao hoặc có bệnh lý đại tràng cấp tính nên tham vấn bác sĩ chuyên khoa hoặc đội ngũ cố vấn dinh dưỡng của Banova để điều chỉnh lộ trình thích ứng phù hợp.
            </div>
          </div>
        </div>
      </section>

      {/* 5. Complementary & Cross-Sell Products */}
      <section className="w-full py-12 md:py-16 bg-surface-container-low/20">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wider">
                Hệ Sinh Thái Lành Mạnh
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary font-bold tracking-tight mt-1">
                Có thể bạn quan tâm — Kết hợp hoàn hảo cho hệ tiêu hóa
              </h2>
            </div>
            <button 
              type="button"
              onClick={() => onNavigate('san-pham')}
              className="inline-flex items-center gap-1 font-label-lg text-label-lg text-secondary hover:text-primary font-bold transition-colors self-start md:self-auto"
            >
              <span>Xem tất cả sản phẩm</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>

          {/* 3 Cross-sell Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
            {crossSellProducts.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col rounded-2xl bg-surface-container-lowest p-4 shadow-sm hover:shadow-md transition-shadow border border-surface-container"
              >
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container mb-4">
                  <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-[10px]">
                    {item.badge}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1 text-amber-500 mb-1">
                      <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">{item.rating}</span>
                    </div>
                    <h3 className="font-headline-sm text-body-lg text-primary font-bold line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                      {item.subInfo}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 flex items-center justify-between border-t border-surface-container/50">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                      {item.formattedPrice}
                    </span>
                    <button 
                      type="button"
                      onClick={() => onAddToCart(item)}
                      className="px-3.5 py-2 rounded-xl bg-secondary-container/40 text-on-secondary-container hover:bg-secondary hover:text-on-secondary font-label-sm text-label-sm font-bold transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                      <span>Thêm nhanh</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
