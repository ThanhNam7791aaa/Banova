import React, { useState, useMemo } from 'react';
import ProductCard from '../components/product/ProductCard';

export default function CatalogPage({ 
  onNavigate = () => {},
  onAddToCart = () => {},
  onSelectProduct = () => {}
}) {
  // Mock dữ liệu 6 SKU chuẩn tài liệu
  const initialProducts = [
    {
      id: 'prod-01',
      slug: 'bot-tinh-bot-khang-banova-500g',
      name: 'Bột tinh bột kháng Banova 500g',
      category: 'bot',
      categoryLabel: 'Bột tinh bột kháng',
      badge: 'Bán chạy nhất',
      discount: '-11%',
      rsBadge: '11.6g RS2 / 2 khẩu phần',
      rsValue: 11.6,
      subInfo: 'Hũ thủy tinh 500g • 33 khẩu phần • GI < 45',
      description: 'Hũ thủy tinh cao cấp 500g bảo quản tối ưu cấu trúc RS2 sấy lạnh, thích hợp cho cả gia đình dùng đều đặn 1 tháng.',
      price: 159000,
      formattedPrice: '159.000 ₫',
      originalPrice: '179.000 ₫',
      rating: '4.9',
      reviewsCount: 128,
      benefits: ['gi-low', 'scfa', 'no-sugar', 'ocop'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqu4Gc51Yg9Kk6fQaxsMiMJ6qEXPjR5Dpq8kg6laED18kWOhDhT1Eu2xu6WZRg_Y30SKpW8QNVCxaTKbA03MddttUc6grNcuP3y7DkYXERmMIxjLNOyEbUvvDxGP1M5sDBPlYwUFMtt5LQolzVD5MevRhWlmfj9RTMSmCskm4tKqQoZrH0uPqvgHiOIgJHs7Z8bu_mQdZYXkbBRp-M1DMSp2xaZuiapMFKAhZnXvns9OKlO05lnQ9l'
    },
    {
      id: 'prod-02',
      slug: 'bot-tinh-bot-khang-banova-250g',
      name: 'Bột tinh bột kháng Banova 250g',
      category: 'bot',
      categoryLabel: 'Bột tinh bột kháng',
      badge: 'Thuần tự nhiên',
      rsBadge: '5.8g RS2 / khẩu phần',
      rsValue: 5.8,
      subInfo: 'Hũ 250g • 16 khẩu phần • Prebiotic tự nhiên',
      description: 'Hũ 250g nhỏ gọn, dùng thử trải nghiệm 2 tuần cải thiện rõ rệt hệ tiêu hóa và nhu động ruột.',
      price: 89000,
      formattedPrice: '89.000 ₫',
      rating: '5.0',
      reviewsCount: 94,
      benefits: ['gi-low', 'scfa', 'no-sugar', 'ocop'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCim1TmSYwJPmmYbSMxrhs9lrY9qFGakG0DkE9_RLBJEOrgVTapeHZsWnAOCbZycMnX28b9GhksBx4ibBok_m2JhDUjwdsaJfItui3g4okNrYlXFQAZ1G0YUuPA1xhLU1bGG3I1RXH356SSnjEi5pp90G8Qi5X96-nFOnE_LyI0ZqYw6IyZE2NcZP1iYceYhALkpmMhznG3Iw-3bjXiSj5TQsI3Grq_TYvYeUS7xeZ11nxxjm0y5fJz'
    },
    {
      id: 'prod-03',
      slug: 'bot-banova-10-goi-15g-tien-loi',
      name: 'Bột Banova 10 gói 15g tiện lợi',
      category: 'bot',
      categoryLabel: 'Bột tinh bột kháng',
      badge: 'Văn phòng & Du lịch',
      rsBadge: '5.8g RS2 / gói',
      rsValue: 5.8,
      subInfo: 'Hộp 10 gói x 15g • Pha nhanh với nước ấm/sinh tố',
      description: 'Định lượng chuẩn xác 15g/gói, bao bì tráng nhôm tiện lợi mang theo khi đi làm hoặc công tác xa.',
      price: 69000,
      formattedPrice: '69.000 ₫',
      rating: '4.8',
      reviewsCount: 76,
      benefits: ['gi-low', 'scfa', 'no-sugar'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaigzIEeqxw6pfPNapHWxjdYqNPmdfBvhCjtErP2h-0ZRtfHe0cyEx1SgwTu_7qGWwVYj3-zavRO_XSKcnzGA3ZUiF-efoGpjrNhxHRaNXTWxVIs4-xtxaOAWVo3rh5wOH52FFh9gcP1aF33-__7wpET1RM0mPqzZFEKXQDhNNBFF78PyfbcdXeE9pFpqeyaC5O5wXwX--p2its2XrOy9zqOhPbtvRpbfyCej1aSBJ0k-hmSosM9Ky'
    },
    {
      id: 'prod-04',
      slug: 'banh-quy-nguyen-cam-prebiotic-chuoi-xanh',
      name: 'Bánh quy nguyên cám Prebiotic Chuối Xanh',
      category: 'banh',
      categoryLabel: 'Bánh dinh dưỡng',
      badge: 'Ăn vặt lành mạnh',
      rsBadge: '3.2g RS / gói',
      rsValue: 3.2,
      subInfo: 'Gói 120g • Yến mạch & chuối xanh • 0g đường tinh luyện',
      description: 'Bánh quy nướng nhiệt độ thấp giữ hoạt tính prebiotic, vị giòn bùi tự nhiên từ yến mạch và chuối xanh Gia Lai.',
      price: 39000,
      formattedPrice: '39.000 ₫',
      rating: '4.9',
      reviewsCount: 52,
      benefits: ['gi-low', 'no-sugar'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZCy2ZlK0WItabDM2N4CEGOK0TkEIQHOIJdCykDBdIJzRxN4QZBIUWJWPqb3-YhbtdG1KduT_AtHiu2_eoYkXcO42jKBhWnTDjuByBk_6wNTZ8C-6Y_JFvEFpZjz33n_G8EO2Llbui6ei7QNudDpmkVDiy-E0OhK3FqedIl7ADWVcZRI-IbUnIAfnj8Ozz7-BmTEydIB60L-8r5cSJ1O10tu_K4J3PWbvyxCXCJ8Q-4zgEFSs5jqEk'
    },
    {
      id: 'prod-05',
      slug: 'combo-bua-sang-gut-health',
      name: 'Combo Bữa Sáng Gut-Health (Bột 250g + Bánh quy + Shaker)',
      category: 'combo',
      categoryLabel: 'Bữa sáng tiện lợi',
      badge: 'Tiết kiệm 15%',
      discount: '-15%',
      rsBadge: 'Lộ trình 14 ngày',
      rsValue: 5.8,
      subInfo: 'Combo khởi động • Tặng kèm cẩm nang sử dụng RS2',
      description: 'Giải pháp bữa sáng dinh dưỡng nhanh gọn chỉ trong 2 phút: 1 hũ bột 250g, 1 gói bánh prebiotic và 1 bình lắc thể thao cao cấp.',
      price: 125000,
      formattedPrice: '125.000 ₫',
      originalPrice: '148.000 ₫',
      rating: '5.0',
      reviewsCount: 38,
      benefits: ['gi-low', 'scfa', 'ocop'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnPRTryhx18_e9BqdcUcQ8KXdTO9CsMARjewr_03cUEZaRMuKWpjZd5WD0XaZcIfnXYrRQqqxmQiMnrt_slOxZiw6Pc9Cg7ZcZUOn2i3YDyMVy3A4lQ_WNu8eJUp7COgFThjZyHWiDp3Uhz-nvWNSG6zP-aJQ7E5HbVAbwReBlBvZ-gZVyybVpfGgm1OC6d0XXG4talRFBLbdxOfwbB9MsSrE2UknK4g1oKl7RQLtVeiD869fGKwn'
    },
    {
      id: 'prod-06',
      slug: 'hop-qua-quy-nhon-healthy-cao-cap',
      name: 'Hộp quà Quy Nhơn Healthy Cao Cấp',
      category: 'qua-tang',
      categoryLabel: 'Hộp quà tặng',
      badge: 'Quà tặng ý nghĩa',
      rsBadge: 'Set quà OCOP',
      rsValue: 11.6,
      subInfo: 'Hộp quà biếu sang trọng • 2 hũ bột 250g + Bánh quy + Ly thủy tinh',
      description: 'Hộp quà sức khỏe tinh tế gửi tặng người thân, đối tác: Đóng gói hộp cứng cao cấp kèm quai xách sang trọng.',
      price: 219000,
      formattedPrice: '219.000 ₫',
      rating: '4.9',
      reviewsCount: 29,
      benefits: ['ocop', 'scfa'],
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9pTeR_U7bU3Iu6xdQT65AcJ_1KIZKyJaTU-aloGWXmpkEaVvuFqWSYxOGME-kdTauBrpI9bPTOqIlsPzFdfTMZlzMH_9T6NRGcEEy2OaIENgRt951A5yHm1_wJnEDv9giOF1fZbgselZlMpms8d6wUZQbFlRmYg41EWR58jmGaB0r7WIjdNI_oYXzL1PLl5TV1x14dJoXVsUt7FVe4lEfUM2pGmLhaf96bMwpfq_cHZFPYTPXD5ss'
    }
  ];

  // States
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const [sortOption, setSortOption] = useState('newest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  const categories = [
    { id: 'all', label: 'Tất cả', count: 6 },
    { id: 'bot', label: 'Bột tinh bột kháng', count: 3 },
    { id: 'banh', label: 'Bánh dinh dưỡng', count: 1 },
    { id: 'combo', label: 'Bữa sáng tiện lợi', count: 1 },
    { id: 'qua-tang', label: 'Hộp quà tặng', count: 1 }
  ];

  const benefitTags = [
    { id: 'gi-low', label: 'GI Thấp (<45)', icon: 'check_circle' },
    { id: 'scfa', label: 'Giàu SCFA Butyrate', icon: 'check_circle' },
    { id: 'no-sugar', label: 'Không đường phụ gia', icon: 'check_circle' },
    { id: 'ocop', label: 'Chuẩn OCOP 4 Sao', icon: 'grade' }
  ];

  // Lọc và sắp xếp sản phẩm
  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];

    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.subInfo.toLowerCase().includes(q)
      );
    }

    // Lọc theo tag lợi ích
    if (selectedBenefit) {
      list = list.filter((p) => p.benefits?.includes(selectedBenefit));
    }

    // Sắp xếp
    if (sortOption === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rs-high') {
      list.sort((a, b) => b.rsValue - a.rsValue);
    } else if (sortOption === 'best-seller') {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    }

    return list;
  }, [selectedCategory, searchQuery, selectedBenefit, sortOption]);

  const toggleBenefit = (benefitId) => {
    setSelectedBenefit((prev) => (prev === benefitId ? null : benefitId));
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
              className="flex items-center gap-1 hover:text-primary transition-colors"
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
                <span className="font-label-md text-label-md text-on-surface-variant">Chỉ số kháng tinh bột TB</span>
                <span className="font-label-lg text-label-lg text-secondary font-bold">58.4% RS2</span>
              </div>
              <div className="w-full h-2 rounded-full bg-surface-container-high overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: '58.4%' }} />
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
                <div className="font-label-lg text-label-lg text-primary font-bold">6 Sản phẩm</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Có sẵn tại kho</div>
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
          {/* Category Pills */}
          <div className="flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-space-md py-space-xs rounded-full font-label-md text-label-md flex items-center gap-1.5 shrink-0 transition-all ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isActive 
                      ? 'bg-surface-container-lowest/20 text-on-primary' 
                      : 'bg-surface-container-high text-on-surface-variant'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search, Benefit Tags & Sort Controls */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-space-md border border-surface-container">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên sản phẩm, công dụng (ví dụ: 500g, gói nhỏ, quà tặng)..."
                className="w-full h-11 pl-10 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-secondary transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            {/* Diet / Scientific Benefit Tags */}
            <div className="flex items-center gap-space-xs flex-wrap">
              {benefitTags.map((tag) => {
                const isSelected = selectedBenefit === tag.id;
                return (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleBenefit(tag.id)}
                    className={`px-space-sm py-1 rounded-lg font-label-sm text-label-sm transition-colors flex items-center gap-1 ${
                      isSelected
                        ? 'bg-secondary text-on-secondary font-bold shadow-xs'
                        : 'bg-surface-container-low hover:bg-secondary-container/40 text-on-surface-variant'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {tag.icon}
                    </span>
                    {tag.label}
                  </button>
                );
              })}
            </div>

            {/* Sorting & Layout Toggle */}
            <div className="flex items-center gap-space-sm justify-between sm:justify-end shrink-0">
              <div className="relative inline-block text-left">
                <select
                  aria-label="Sắp xếp sản phẩm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="h-11 pl-space-md pr-8 rounded-xl bg-surface-container-low text-on-surface font-label-md text-label-md appearance-none focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
                >
                  <option value="newest">Sắp xếp: Mới nhất</option>
                  <option value="rs-high">Hàm lượng RS cao nhất</option>
                  <option value="price-asc">Giá: Thấp đến cao</option>
                  <option value="price-desc">Giá: Cao đến thấp</option>
                  <option value="best-seller">Bán chạy nhất</option>
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
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
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
                  className={`w-9 h-9 rounded-md flex items-center justify-center transition-all ${
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
          {filteredProducts.length === 0 ? (
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
                  setSelectedBenefit(null);
                }}
                className="inline-flex items-center gap-1.5 px-space-md py-2 rounded-xl bg-primary-container text-on-primary font-label-md font-bold"
              >
                Xóa tất cả bộ lọc
              </button>
            </div>
          ) : (
            <div 
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter'
                  : 'grid grid-cols-1 gap-space-md'
              }
            >
              {filteredProducts.map((product) => (
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
          <div className="pt-space-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Hiển thị <strong>1–{filteredProducts.length}</strong> trong tổng số <strong>{filteredProducts.length}</strong> sản phẩm dinh dưỡng
            </p>
            <div className="flex items-center gap-space-xs">
              <button 
                type="button"
                disabled 
                className="px-space-md h-10 rounded-xl bg-surface-container-low text-outline font-label-md text-label-md cursor-not-allowed"
              >
                Trang trước
              </button>
              <button 
                type="button"
                className="w-10 h-10 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-xs"
              >
                1
              </button>
              <button 
                type="button"
                className="w-10 h-10 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors"
              >
                2
              </button>
              <button 
                type="button"
                className="px-space-md h-10 rounded-xl bg-surface-container-low text-on-surface hover:bg-surface-container font-label-md text-label-md transition-colors"
              >
                Tiếp theo
              </button>
            </div>
          </div>
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
