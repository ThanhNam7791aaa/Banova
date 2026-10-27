import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, mapProduct, formatPrice } from '../../services';

const FEATURED_COUNT = 4;
const AIDA_BASE = 'https://lh3.googleusercontent.com/aida-public/';

/**
 * Thứ tự SKU ưu tiên cho khối "Sản phẩm tiêu biểu".
 * Tạm thời khai báo ở FE vì BE chưa có cờ isFeatured/sortOrder cho Product —
 * khi BE bổ sung thì chỉ cần đổi sang gọi /products?featured=true.
 */
const FEATURED_SLUGS = [
  'bot-tinh-bot-khang-banova-500g',
  'bot-tinh-bot-khang-banova-250g',
  'bot-banova-hop-10-goi-15g',
  'hop-qua-quy-nhon-healthy'
];

/**
 * Phương án dự phòng khi BE chưa sẵn sàng: 4 SKU chủ lực, ảnh khác nhau.
 * Giữ đúng giá/định lượng đang niêm yết để trang chủ không bị trống khối bán hàng.
 */
const FALLBACK_FEATURED = [
  {
    id: 'fallback-500g',
    slug: 'bot-tinh-bot-khang-banova-500g',
    name: 'Bột tinh bột kháng Banova 500g',
    category: { name: 'Bột' },
    image: `${AIDA_BASE}AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR`,
    formattedPrice: formatPrice(159000),
    unitInfo: 'hũ 500g',
    rsBadge: '5.8g RS2/khẩu phần',
    subInfo: 'Hũ 500g tiết kiệm cho gia đình dùng hằng ngày.'
  },
  {
    id: 'fallback-250g',
    slug: 'bot-tinh-bot-khang-banova-250g',
    name: 'Bột tinh bột kháng Banova 250g',
    category: { name: 'Bột' },
    image: `${AIDA_BASE}AB6AXuAwGVTi1gB1XvNbSveYj_baHXsEbIOocmjJkIBVAFObemwtPxprwGnjI0ql6zljWfiOW3YYwywLmneJKhVc9vYG_lxGF9KNdEEGJ8G2KuFRvFhVgSJxlpv6969fl-nRcjp4ZHnopEgzoWmcQQE_zDbEEv3OlU5yB6kCjdpoiU_6pJQMEpqmtIMT4qSsrCc8VIroRwVHf3QsPqE9WTOpF9lF9qch7DDX04ErGUle-6PjvanY1rdFfVcB`,
    formattedPrice: formatPrice(89000),
    unitInfo: 'hũ 250g',
    rsBadge: '5.8g RS2/khẩu phần',
    subInfo: 'Hũ thử 250g bảo quản tối ưu, pha nước ấm hoặc sinh tố.'
  },
  {
    id: 'fallback-10-goi',
    slug: 'bot-banova-hop-10-goi-15g',
    name: 'Bột Banova hộp 10 gói 15g tiện lợi',
    category: { name: 'Bột' },
    image: `${AIDA_BASE}AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ`,
    formattedPrice: formatPrice(69000),
    unitInfo: 'hộp 10 gói',
    rsBadge: '5.8g RS2/khẩu phần',
    subInfo: 'Định lượng sẵn 15g/gói, tiện mang theo khi đi làm hoặc công tác.'
  },
  {
    id: 'fallback-hop-qua',
    slug: 'hop-qua-quy-nhon-healthy',
    name: 'Hộp quà Quy Nhơn Healthy',
    category: { name: 'Hộp quà' },
    image: `${AIDA_BASE}AB6AXuAhHU4TxO1C2iLW-yIEMTt6Ki-s4As6aE-_qhpuanORYt4-o_Rei7EkhCWDcRwY7sj7JKKDj82yo8JDs4bI1tMPyGEQ_bFRaI3jbe0dmmfOTGQ9rCqCRtzOzFM48vxJLkm5_5VLgVjO67gnsGHQ5GxmPco9pD9W0bKPuMIMJYWsMLb6Roz3N997bMJmUbDPDHTFnsTSytXMu45ES-ZMxjyp-t6p5T0HM0v4vnINkFW6c5iIvt2FRxBz`,
    formattedPrice: formatPrice(219000),
    unitInfo: 'hộp quà',
    rsBadge: '5.8g RS2/khẩu phần',
    subInfo: 'Bộ quà biếu gồm bột chuối xanh, bánh ăn kiêng và ly shaker.'
  }
];

/** Chọn 4 SKU tiêu biểu: ưu tiên danh sách slug, sau đó bù bằng sản phẩm có ảnh khác nhau */
function pickFeatured(products) {
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  const picked = [];
  const usedImages = new Set();

  FEATURED_SLUGS.forEach((slug) => {
    const product = bySlug.get(slug);
    if (product && picked.length < FEATURED_COUNT) {
      picked.push(product);
      usedImages.add(product.image);
    }
  });

  // Tránh 3 card dùng chung một ảnh: chỉ bù bằng sản phẩm có ảnh chưa xuất hiện
  products.forEach((product) => {
    if (picked.length >= FEATURED_COUNT || picked.includes(product)) return;
    if (usedImages.has(product.image)) return;
    picked.push(product);
    usedImages.add(product.image);
  });

  // Nếu vẫn thiếu (ít sản phẩm/ảnh trùng), bù cho đủ số lượng
  products.forEach((product) => {
    if (picked.length >= FEATURED_COUNT || picked.includes(product)) return;
    picked.push(product);
  });

  return picked;
}

export default function FeaturedProducts({ 
  onAddToCart = () => {}
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchFeatured() {
      try {
        setLoading(true);
        const res = await api.products.list({ pageSize: 50 });
        if (isMounted) {
          const list = (res.data || []).map(mapProduct).filter(Boolean);
          setProducts(list.length > 0 ? pickFeatured(list) : FALLBACK_FEATURED);
        }
      } catch (err) {
        console.warn('[FeaturedProducts] Không tải được sản phẩm từ BE, dùng dữ liệu dự phòng:', err.message);
        if (isMounted) setProducts(FALLBACK_FEATURED);
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchFeatured();
    return () => { isMounted = false; };
  }, []);

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
          <Link 
            to="/san-pham"
            className="inline-flex items-center gap-1 text-secondary font-label-lg text-label-lg font-bold hover:text-primary transition-colors self-start md:self-auto"
          >
            <span>Xem toàn bộ sản phẩm</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl bg-surface-container-lowest p-3 sm:p-4 border border-surface-container/50 space-y-3 sm:space-y-4">
                <div className="w-full h-36 sm:h-56 bg-surface-container-low rounded-xl" />
                <div className="h-4 bg-surface-container-low rounded w-1/3" />
                <div className="h-6 bg-surface-container-low rounded w-3/4" />
                <div className="h-10 bg-surface-container-low rounded mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* 4 SKU Grid — 2 cột trên mobile để rút ngắn trang */}
        {!loading && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-gutter">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-surface-container/40"
              >
                {/* Product Thumbnail */}
                <Link to={`/san-pham/${item.slug || item.id}`} className="relative w-full h-36 sm:h-64 bg-surface-container-low overflow-hidden block">
                  <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                    alt={item.name} 
                    src={item.image} 
                  />
                  {item.rsBadge && (
                    <span className="absolute bottom-3 left-3 px-space-sm py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-[10px] font-semibold">
                      {item.rsBadge}
                    </span>
                  )}
                </Link>

                {/* Product Info */}
                <div className="p-3 sm:p-space-md flex flex-col flex-1 justify-between gap-2.5 sm:gap-space-md">
                  <div className="space-y-1">
                    {item.category?.name && (
                      <span className="font-label-sm text-[10px] sm:text-[11px] text-secondary font-bold uppercase">
                        {item.category.name}
                      </span>
                    )}
                    <Link to={`/san-pham/${item.slug || item.id}`}>
                      <h3 className="font-headline-sm text-[13px] sm:text-body-lg text-primary font-bold group-hover:text-secondary transition-colors line-clamp-2 sm:line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="hidden sm:block font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {item.subInfo || item.description}
                    </p>
                  </div>

                  <div className="pt-space-xs flex items-center justify-between gap-1 border-t border-surface-container/50">
                    <span className="font-headline-sm text-sm sm:text-headline-sm text-primary font-bold block truncate">
                      {item.formattedPrice}
                    </span>
                    <button 
                      type="button"
                      aria-label={`Thêm ${item.name} vào giỏ hàng`} 
                      onClick={() => onAddToCart(item)}
                      className="w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-xl bg-primary-container text-on-primary flex items-center justify-center hover:bg-secondary transition-colors shadow-xs hover:scale-105 active:scale-95" 
                    >
                      <span className="material-symbols-outlined text-[16px] sm:text-[20px]">add_shopping_cart</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
