import React, { useState, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { api, mapProduct } from '../services';

export default function CatalogPage({ 
  onNavigate = () => {},
  onAddToCart = () => {},
  onSelectProduct = () => {}
}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'all', name: 'Tất cả', slug: 'all' }]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter & Query States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  
  // Pagination State
  const [page, setPage] = useState(1);
  const [pageSize] = useState(9);
  const [meta, setMeta] = useState({ page: 1, pageSize: 9, total: 0, totalPages: 1 });

  // 1. Fetch categories
  useEffect(() => {
    let isMounted = true;
    async function fetchCategories() {
      try {
        const res = await api.categories.list();
        if (isMounted && res.data) {
          setCategories([{ id: 'all', name: 'Tất cả', slug: 'all' }, ...res.data]);
        }
      } catch (err) {
        console.warn('[CatalogPage] Không tải được danh mục:', err);
      }
    }
    fetchCategories();
    return () => { isMounted = false; };
  }, []);

  // 2. Fetch products with server-side filters & pagination
  useEffect(() => {
    let isMounted = true;
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const params = {
          page,
          pageSize,
        };

        if (selectedCategory && selectedCategory !== 'all') {
          params.category = selectedCategory;
        }

        if (searchQuery.trim()) {
          params.q = searchQuery.trim();
        }

        if (sortOption) {
          params.sort = sortOption;
        }

        const res = await api.products.list(params);
        if (isMounted) {
          const mapped = (res.data || []).map(mapProduct);
          setProducts(mapped);
          if (res.meta) {
            setMeta(res.meta);
          } else {
            setMeta({ page: 1, pageSize, total: mapped.length, totalPages: 1 });
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error('[CatalogPage] Lỗi tải sản phẩm:', err);
          setError(err.message || 'Không thể tải danh sách sản phẩm');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();
    return () => { isMounted = false; };
  }, [page, pageSize, selectedCategory, searchQuery, sortOption]);

  const handleCategoryChange = (catSlug) => {
    setSelectedCategory(catSlug);
    setPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setPage(1);
  };

  return (
    <div className="flex flex-col w-full">
      {/* 1. Top Breadcrumb & Catalog Header Hero */}
      <section className="w-full bg-gradient-to-b from-surface-container-low via-surface to-surface pb-space-lg">
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Breadcrumb */}
          <nav aria-label="Đường dẫn trang" className="pt-space-md pb-space-sm flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
            <button 
              type="button"
              onClick={() => onNavigate('trang-chu')}
              className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Trang chủ</span>
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-primary font-bold">Sản phẩm</span>
          </nav>

          {/* Intro Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center pt-space-sm pb-space-md">
            <div className="lg:col-span-8 space-y-space-sm">
              <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/60 text-on-secondary-container font-label-sm text-label-sm border border-secondary-container/40">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                DANH MỤC SẢN PHẨM DINH DƯỠNG TỰ NHIÊN
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Sản Phẩm Tinh Bột Kháng Banova
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                Giải pháp dinh dưỡng prebiotic từ chuối xanh Gia Lai nguyên sơ, giàu chất xơ hòa tan RS2 hỗ trợ hệ vi sinh đường ruột khỏe mạnh, no lâu và cân bằng chỉ số đường huyết tự nhiên.
              </p>
            </div>

            <div className="lg:col-span-4 bg-surface-container-lowest p-space-md rounded-xl shadow-sm border border-surface-container">
              <div className="flex items-center justify-between pb-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant">Kháng tinh bột tự nhiên</span>
                <span className="font-label-lg text-label-lg text-secondary font-bold">Chuẩn RS2 Gia Lai</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '100%' }} />
              </div>
              <p className="font-body-sm text-body-sm text-outline pt-space-xs">
                Kháng tinh bột type-2 tự nhiên không bị thủy phân tại dạ dày, lên men chọn lọc tại đại tràng tạo SCFA Butyrate quý giá.
              </p>
            </div>
          </div>

          {/* Quick Stats Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-sm pb-space-md">
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[24px]">inventory_2</span>
              <div>
                <div className="font-label-lg text-label-lg text-primary font-bold">{loading ? '—' : (meta.total || products.length)} Sản phẩm</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Dữ liệu từ máy chủ</div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[24px]">eco</span>
              <div>
                <div className="font-label-lg text-label-lg text-primary font-bold">100% Thuần tự nhiên</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Chuối xanh Gia Lai</div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
              <div>
                <div className="font-label-lg text-label-lg text-primary font-bold">HACCP &amp; ISO 22000</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Tiêu chuẩn quốc tế</div>
              </div>
            </div>
            <div className="flex items-center gap-space-sm p-space-sm rounded-xl bg-surface-container-lowest shadow-sm border border-surface-container">
              <span className="material-symbols-outlined text-secondary text-[24px]">local_shipping</span>
              <div>
                <div className="font-label-lg text-label-lg text-primary font-bold">Giao nhanh Quy Nhơn</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Nội thành trong 2h</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Filter & Controls Toolbar */}
      <section className="w-full bg-surface pb-space-md">
        <div className="max-w-7xl mx-auto px-gutter space-y-space-md">
          {/* Category Pills từ API */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const catKey = cat.slug || cat.id;
              const isActive = selectedCategory === catKey;
              return (
                <button
                  key={cat.id || catKey}
                  type="button"
                  onClick={() => handleCategoryChange(catKey)}
                  className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-1.5 shrink-0 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Search, Sort Controls */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-surface-container">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Tìm kiếm sản phẩm theo tên, mô tả..."
                className="w-full h-11 pl-10 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setPage(1);
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Sorting & Layout Toggle */}
            <div className="flex items-center gap-space-sm justify-between sm:justify-end shrink-0">
              <div className="relative inline-block text-left">
                <select
                  aria-label="Sắp xếp sản phẩm"
                  value={sortOption}
                  onChange={handleSortChange}
                  className="h-11 pl-space-md pr-8 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="newest">Sắp xếp: Mới nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                </select>
                <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-outline text-[18px]">
                  expand_more
                </span>
              </div>

              {/* View Toggle */}
              <div className="flex items-center p-1 rounded-lg bg-surface-container-low">
                <button
                  type="button"
                  aria-label="Dạng lưới"
                  onClick={() => setViewMode('grid')}
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === 'grid'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">grid_view</span>
                </button>
                <button
                  type="button"
                  aria-label="Dạng danh sách"
                  onClick={() => setViewMode('list')}
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all cursor-pointer ${
                    viewMode === 'list'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">view_list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Grid & Empty State */}
      <section className="w-full bg-surface pb-space-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter animate-pulse">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="rounded-2xl bg-surface-container-lowest p-4 border border-surface-container space-y-4">
                  <div className="w-full h-64 bg-surface-container-low rounded-xl" />
                  <div className="h-4 bg-surface-container-low rounded w-1/4" />
                  <div className="h-6 bg-surface-container-low rounded w-3/4" />
                  <div className="h-10 bg-surface-container-low rounded mt-4" />
                </div>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && !loading && (
            <div className="p-space-xl rounded-2xl bg-error-container/20 border border-error-container text-center space-y-2 my-8">
              <span className="material-symbols-outlined text-error text-[40px]">error</span>
              <h3 className="font-headline-sm text-error font-bold">{error}</h3>
              <p className="font-body-md text-on-surface-variant">Vui lòng đảm bảo server Banova.Api đang chạy trên cổng 5252.</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <div className="p-space-xl rounded-2xl bg-surface-container-lowest text-center space-y-3 border border-surface-container my-8">
              <span className="material-symbols-outlined text-outline text-[48px]">search_off</span>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
                Không tìm thấy sản phẩm phù hợp
              </h3>
              <p className="font-body-md text-on-surface-variant">
                Vui lòng thử lại với từ khóa khác hoặc xóa bớt tiêu chí lọc.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setPage(1);
                }}
                className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary-container text-on-primary font-label-md font-bold cursor-pointer"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          )}

          {/* Products List */}
          {!loading && !error && products.length > 0 && (
            <div 
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'
                  : 'grid grid-cols-1 gap-space-md'
              }
            >
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={onAddToCart}
                  onViewDetail={onSelectProduct}
                />
              ))}
            </div>
          )}

          {/* Pagination & Status */}
          {!loading && !error && products.length > 0 && (
            <div className="pt-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Trang <strong>{meta.page}</strong> / <strong>{meta.totalPages || 1}</strong> — Tổng <strong>{meta.total || products.length}</strong> sản phẩm
              </p>
              <div className="flex items-center gap-space-xs">
                <button 
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className={`px-space-md h-10 rounded-xl font-label-md text-label-md transition-colors ${
                    page <= 1 
                      ? 'bg-surface-container-low text-outline cursor-not-allowed' 
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container cursor-pointer'
                  }`}
                >
                  Trang trước
                </button>

                {Array.from({ length: meta.totalPages || 1 }, (_, i) => i + 1).map((pNum) => (
                  <button 
                    key={pNum}
                    type="button"
                    onClick={() => setPage(pNum)}
                    className={`w-10 h-10 rounded-xl font-label-md text-label-md font-bold transition-all cursor-pointer ${
                      pNum === page
                        ? 'bg-primary-container text-on-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    {pNum}
                  </button>
                ))}

                <button 
                  type="button"
                  disabled={page >= (meta.totalPages || 1)}
                  onClick={() => setPage((p) => Math.min(meta.totalPages || 1, p + 1))}
                  className={`px-space-md h-10 rounded-xl font-label-md text-label-md transition-colors ${
                    page >= (meta.totalPages || 1)
                      ? 'bg-surface-container-low text-outline cursor-not-allowed'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container cursor-pointer'
                  }`}
                >
                  Tiếp theo
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. Value Banner (Lợi ích độc quyền Banova) */}
      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="bg-primary text-on-primary rounded-2xl p-space-lg sm:p-space-xl shadow-md relative overflow-hidden border border-primary-container">
            <div className="absolute -right-12 -bottom-12 w-80 h-80 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl space-y-space-xs pb-space-lg">
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-widest font-bold">
                Cam kết nguồn gốc minh bạch
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold">
                Lợi ích độc quyền khi mua trực tiếp tại Banova
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container">
                Sản phẩm được chế biến từ nông trường chuối xanh Gia Lai bạt ngàn, công nghệ sấy lạnh giữ trọn vẹn cấu trúc tinh bột kháng RS2 tự nhiên.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter relative z-10">
              <div className="p-space-md rounded-xl bg-primary-container/80 backdrop-blur-sm space-y-space-xs border border-primary-fixed/10">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">local_shipping</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                  Freeship Quy Nhơn &gt; 200k
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Giao nhanh hỏa tốc trong 2 giờ nội thành TP. Quy Nhơn và hỗ trợ 50% phí vận chuyển toàn quốc.
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-primary-container/80 backdrop-blur-sm space-y-space-xs border border-primary-fixed/10">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">biotech</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                  Kiểm nghiệm vi sinh từng lô
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Mỗi mẻ tinh bột đều được cấp chứng nhận kiểm nghiệm hàm lượng kháng tinh bột và độ tinh sạch đạt chuẩn HACCP.
                </p>
              </div>

              <div className="p-space-md rounded-xl bg-primary-container/80 backdrop-blur-sm space-y-space-xs border border-primary-fixed/10">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container">
                  <span className="material-symbols-outlined text-[26px]">support_agent</span>
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                  Đồng hành dinh dưỡng 1:1
                </h3>
                <p className="font-body-sm text-body-sm text-on-primary-container">
                  Đội ngũ chuyên viên tư vấn liều lượng phù hợp cho người tiểu đường, tiền tiểu đường, người ăn kiêng Low GI qua Zalo/Hotline.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
