import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api, mapProduct } from '../../services';

export default function FeaturedProducts({ 
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function fetchFeatured() {
      try {
        setLoading(true);
        setError(null);
        const res = await api.products.list({ pageSize: 4 });
        if (isMounted) {
          const list = (res.data || []).map(mapProduct);
          setProducts(list);
        }
      } catch (err) {
        if (isMounted) {
          console.error('[FeaturedProducts] Lỗi fetch:', err);
          setError(err.message || 'Không thể tải danh sách sản phẩm');
        }
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
            <span>Xem toàn bộ bộ sưu tập</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter animate-pulse">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container/50 space-y-4">
                <div className="w-full h-56 bg-surface-container-low rounded-xl" />
                <div className="h-4 bg-surface-container-low rounded w-1/3" />
                <div className="h-6 bg-surface-container-low rounded w-3/4" />
                <div className="h-10 bg-surface-container-low rounded mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error message */}
        {error && !loading && (
          <div className="p-space-lg rounded-2xl bg-error-container/20 border border-error-container text-on-surface text-center space-y-2">
            <span className="material-symbols-outlined text-error text-[32px]">warning</span>
            <p className="font-label-lg text-error font-bold">{error}</p>
            <p className="font-body-sm text-on-surface-variant">Vui lòng kiểm tra xem Backend API (`http://localhost:5252`) đã được bật chưa.</p>
          </div>
        )}

        {/* 4 SKU Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {products.map((item) => (
              <div 
                key={item.id} 
                className="group rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden border border-surface-container/40"
              >
                {/* Product Thumbnail */}
                <Link to={`/san-pham/${item.slug || item.id}`} className="relative w-full h-64 bg-surface-container-low overflow-hidden block">
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
                <div className="p-space-md flex flex-col flex-1 justify-between space-y-space-md">
                  <div className="space-y-1">
                    {item.category?.name && (
                      <span className="font-label-sm text-[11px] text-secondary font-bold uppercase">
                        {item.category.name}
                      </span>
                    )}
                    <Link to={`/san-pham/${item.slug || item.id}`}>
                      <h3 className="font-headline-sm text-body-lg text-primary font-bold group-hover:text-secondary transition-colors line-clamp-1">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {item.subInfo || item.description}
                    </p>
                  </div>

                  <div className="pt-space-xs flex items-center justify-between border-t border-surface-container/50">
                    <div>
                      <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {item.formattedPrice}
                      </span>
                      {item.unitInfo && (
                        <span className="font-body-sm text-[11px] text-on-surface-variant block">
                          {item.unitInfo}
                        </span>
                      )}
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
        )}
      </div>
    </section>
  );
}
