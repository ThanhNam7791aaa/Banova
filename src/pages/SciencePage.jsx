import React, { useState } from 'react';
import MedicalDisclaimer from '../components/layout/MedicalDisclaimer';

export const ARTICLES_DATA = [
  {
    id: 'art-01',
    category: 'science',
    categoryLabel: 'Khoa học',
    tags: ['TieuDuong', 'ResistantStarch'],
    title: 'Tinh bột kháng là gì và vì sao tốt cho người tiền đái tháo đường?',
    excerpt: 'Phân tích cơ chế sinh học khi tinh bột kháng RS2 chuối xanh đi qua ruột non mà không bị enzym amylase phân giải, giúp kiểm soát chỉ số đường huyết sau ăn, gia tăng độ nhạy insulin và kích thích tế bào L giải phóng GLP-1 tự nhiên.',
    date: '18/10/2026',
    readTime: '5 phút đọc',
    author: 'Banova Clinical Nutrition Team',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjzQ4TVd9h7TdU-hj6ee0cnMwdHxq2Jjtik5begTaIO_DC8MwmI8yS6XMsVRukZQviRNSmuk3NforpsiNxH96NBb8byJacx2PsQxn02tgFXRzPrdOqwzAqfjJMCfG44CRPzLnBQOuc2vQ8Jt1IKAGliDJkJZkyeNiopiCbm4R_HF6E4tnObXUqBlRCAxk-Q-844h8ODJNrQ2aZzEV4mUfHRo2yqytf6NZWp0WpXSWUB-ORjmXui25Z',
    featured: true
  },
  {
    id: 'art-02',
    category: 'science',
    categoryLabel: 'Khoa học',
    tags: ['IBS', 'ResistantStarch'],
    title: 'Cơ chế SCFA Butyrate: Lá chắn vàng bảo vệ hàng rào niêm mạc đại tràng',
    excerpt: 'Cách các chủng vi khuẩn kỵ khí Faecalibacterium prausnitzii lên men tinh bột kháng tạo nguồn năng lượng chính cho tế bào biểu mô ruột kết.',
    date: '14/10/2026',
    readTime: '4 phút đọc',
    author: 'TS. Dược học Lê Minh Tuấn',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGeTEsnpxVQF1Uk0Dhb1Q-9-hAJ7eUSYy_5kxkh7T_rmvFUdsN17wpnM58L1wXIGX0hlPnvb0FnZ6mZzsQnEvBuGzpkgLE8W21EiQstVUXey_7KztWONXz1c4izSqtwqdP5EJr32oTfpE3_bLW1UL7BkzTxGX7qCqbQxK35JAkrvbN8EFtyImlSzNDHb09gT_mJGJPfEueOqru0sJks5Ry20DQ7f8xOtoGmaWC3yVI1OzpGTZIer0e'
  },
  {
    id: 'art-03',
    category: 'blog',
    categoryLabel: 'Công thức',
    tags: ['CongThucSmoothie', 'ResistantStarch'],
    title: 'Sinh tố chuối xanh yến mạch phục hồi năng lượng buổi sáng không gây tăng đường huyết',
    excerpt: 'Công thức bữa sáng 3 phút kết hợp 15g bột Banova RS2 giúp no lâu đến trưa, kiểm soát thèm ngọt hiệu quả.',
    date: '11/10/2026',
    readTime: '3 phút đọc',
    author: 'Chuyên gia Ẩm thực Dinh dưỡng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9VhbaCs7sW8Gq06-Li3R5knT29vurdeHZXqLBKVNU4h4IBozCq7Uuv2Ox-YcK96-E-NUhW_33_HjTKm6yeTZ4rIPEavmoCrKbuSm9cf5127ETGIfgVRYdSMaV49yhd9MNE6pQn37SPwFJMHC_yKYs0d2Xt0T2Zj7mCUXbcJmlDme_z6Mevc4aQgF_VcukXwxrW6LVCfq33mymsqNUFUMkTrz8ajFoLSFNAIxj1c0ikUUwUEZPeuFW'
  },
  {
    id: 'art-04',
    category: 'science',
    categoryLabel: 'Khoa học',
    tags: ['ResistantStarch'],
    title: 'So sánh 4 loại tinh bột kháng (RS1 - RS4) và ưu thế vượt trội của RS2 tự nhiên Gia Lai',
    excerpt: 'Tại sao phương pháp sấy lạnh tầng sôi giữ được cấu trúc hạt tinh bột kháng nguyên vẹn tốt hơn các dạng tinh bột biến tính hóa học.',
    date: '08/10/2026',
    readTime: '6 phút đọc',
    author: 'Viện Dinh Dưỡng Ứng Dụng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2tMc0vSFKxKtgG64XwHNyIzT92SBBTPLhy9ycyjwEW573RpEmVAEQoItJYBBcrzXMVIeOjdXec3TxhIq9hXvVGmXUUDKEJtDDqhafl8y5L0e5fch84_g86Wmxtf2JWRfwNvHEFiryUxVvc-E0OGVulpWdW7BXs7S8oqwPA6yF4FBIZl6fOcvcygumMHskS2ek3aS2fOofcLqOl0duJJlVTtONeKBk1GOyfXZzUhL2gKVrQ-2kK4BA'
  },
  {
    id: 'art-05',
    category: 'blog',
    categoryLabel: 'Công thức',
    tags: ['ResistantStarch'],
    title: 'Bánh quy hạt Chia & Tinh bột kháng: Bữa phụ hoàn hảo cho người theo chế độ Eat Clean & Keto',
    excerpt: 'Hướng dẫn nướng bánh ở nhiệt độ dưới ngưỡng phá vỡ cấu trúc tinh thể RS2, giòn xốp thơm lừng.',
    date: '05/10/2026',
    readTime: '5 phút đọc',
    author: 'Banova Kitchen Lab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGbEhcqBFLZ74_NAZCBDB1G_iaU_l-tXuTDTzptZgUZ6h5aqIQhnLqEVd2dlt3k4l7XWRb5s1izC6taziBnjA-qp1M2yhJp2_pmY9wp4WLemQ6iEgEEMVIX4Jp9XmbCrbbFvx81pFFvCKvEZUl77RsUGHjnvW0BCaRK5D4nX9TrtGEDrOldX-Pb6FkJbXDRFoiclt2phy6iqSRAq4-V7JkvkKu48qoLN5XLiQYvuY8vurwfELdfc3X'
  },
  {
    id: 'art-06',
    category: 'science',
    categoryLabel: 'Khoa học',
    tags: ['IBS'],
    title: 'Mối liên hệ giữa trục Não - Ruột (Gut-Brain Axis) và chất lượng giấc ngủ',
    excerpt: 'Hơn 90% Serotonin của cơ thể được tổng hợp tại đường ruột. Nuôi dưỡng vi sinh vật đường ruột giúp giảm căng thẳng và ngủ sâu.',
    date: '01/10/2026',
    readTime: '7 phút đọc',
    author: 'TS. Nguyễn Thùy Trang',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA1geI4xvnuqoEUpFmQaGQUXSr7bx8KsmI-e2JsR8lpEV_4KXdTwwQKLjEcZMcxPTeObmNHXNIDPIwEzNK7yDu5ViYC1oNO6ewZ1_QPsmHwQ66hMCwqKNpmmppw0R_54jEAlcfIJFd7XepWA-2YSU_LqevyuemdsbcRXfZFJk6OJHKLj1V6GnqgfxCYFWe5hbZay-q8J6u6a73I3DNxGEwNh1vyaUogVn9v2vQjuh1HanT7_pAriFw_'
  },
  {
    id: 'art-07',
    category: 'blog',
    categoryLabel: 'Công thức',
    tags: ['IBS', 'ResistantStarch'],
    title: 'Súp rau củ thanh đạm rắc bột Banova hỗ trợ người đại tràng nhạy cảm',
    excerpt: 'Mẹo bổ sung bột RS2 vào thức ăn ấm dưới 50 độ C không làm biến tính tinh bột, êm bụng nhẹ nhàng cho bữa tối.',
    date: '28/09/2026',
    readTime: '4 phút đọc',
    author: 'Banova Kitchen Lab',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNRvuI20xgA_72DNLDG-2smFgaIu6sHRF3XyZ0lI8kmYjIaRGUZd_B7NKkw6y0Jh4-ayDuJf4RqjLO3bPh5k-F4tl2v1Fcxqkm9xcyiHJjr-mq4uM3UfeNyNE4rXR8Dj_wBkAPNdmvgxaCLH1fmPBqhrjc3I24wRGEjHhv9FteQp-3CLbetdg4AgsyIPUc4XKBDQhcg6gmA1ZthE3HFNFRQa7VNNKusLtTaua-wMlkRFNA5O23kV4F'
  }
];

export default function SciencePage({
  onNavigate = () => {},
  onSelectArticle = () => {}
}) {
  const [currentFilter, setCurrentFilter] = useState('all'); // 'all' | 'science' | 'blog'
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  // Lọc bài viết
  const filteredArticles = ARTICLES_DATA.filter((art) => {
    const matchesCategory = currentFilter === 'all' || art.category === currentFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q));

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = ARTICLES_DATA.find((a) => a.featured) || ARTICLES_DATA[0];
  const gridArticles = filteredArticles.filter((a) => a.id !== 'art-01');

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
  };

  const handleResetFilters = () => {
    setCurrentFilter('all');
    setSearchQuery('');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setNewsletterSubmitted(true);
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
      {/* Top Ambient Glow & Hero */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-gradient-to-b from-secondary-container/30 via-surface-container-high/20 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Hero / Header Section */}
        <section className="max-w-7xl mx-auto px-gutter pt-space-md pb-space-lg w-full">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-space-md text-on-surface-variant font-body-sm text-body-sm">
            <button 
              type="button"
              onClick={() => onNavigate('trang-chu')}
              className="hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">home</span>
              Trang chủ
            </button>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="font-label-sm text-label-sm text-primary font-bold">Góc khoa học</span>
          </nav>

          {/* Category Label & Header Content */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
            <div className="max-w-3xl space-y-space-sm">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                TRUNG TÂM DỮ LIỆU &amp; NGHIÊN CỨU VI SINH BANOVA
              </div>
              <h1 className="font-headline-xl text-headline-xl text-primary font-bold tracking-tight">
                Khoa Học Dinh Dưỡng &amp; Ẩm Thực Vi Sinh Lành Mạnh
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Khám phá các công trình nghiên cứu y sinh về tinh bột kháng tự nhiên RS2 từ chuối xanh Gia Lai, giải pháp cân bằng hệ vi sinh đường ruột và công thức ẩm thực phục hồi chuyển hóa.
              </p>
            </div>

            {/* Quick Quantitative Data Pill */}
            <div className="flex items-center gap-space-md p-space-md rounded-xl bg-surface-container-lowest shadow-sm self-start lg:self-auto shrink-0 border border-surface-container">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-secondary-fixed">
                <span className="material-symbols-outlined text-[28px]">biotech</span>
              </div>
              <div>
                <div className="font-headline-sm text-headline-sm text-primary font-bold">100% RS2</div>
                <div className="font-body-sm text-body-sm text-on-surface-variant">Chiết xuất chuối xanh tự nhiên</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Filter & Search Controls Section */}
      <section className="max-w-7xl mx-auto px-gutter w-full pb-space-lg">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm space-y-space-md border border-surface-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
            {/* Filter Tabs */}
            <div className="inline-flex flex-wrap p-1 rounded-xl bg-surface-container-low gap-1" id="categoryFilter">
              <button 
                type="button"
                onClick={() => setCurrentFilter('all')}
                className={`px-space-md py-space-sm rounded-lg font-label-lg text-label-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentFilter === 'all' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>Tất cả</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentFilter === 'all' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  18
                </span>
              </button>

              <button 
                type="button"
                onClick={() => setCurrentFilter('science')}
                className={`px-space-md py-space-sm rounded-lg font-label-lg text-label-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentFilter === 'science' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>Nghiên cứu khoa học (SCIENCE)</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentFilter === 'science' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  10
                </span>
              </button>

              <button 
                type="button"
                onClick={() => setCurrentFilter('blog')}
                className={`px-space-md py-space-sm rounded-lg font-label-lg text-label-lg font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentFilter === 'blog' 
                    ? 'bg-primary-container text-on-primary shadow-xs' 
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <span>Lối sống &amp; Ẩm thực (BLOG)</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${currentFilter === 'blog' ? 'bg-secondary text-on-secondary' : 'bg-surface-container-high text-on-surface-variant'}`}>
                  8
                </span>
              </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full lg:w-96">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-outline pointer-events-none">
                search
              </span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm bài viết, tài liệu vi sinh..."
                className="w-full h-11 pl-10 pr-space-md bg-surface-container-low text-on-surface placeholder:text-outline rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all border border-surface-container"
              />
              {searchQuery && (
                <button 
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-primary cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Hot Tags */}
          <div className="flex items-center flex-wrap gap-space-xs pt-1">
            <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 mr-1 font-semibold">
              <span className="material-symbols-outlined text-[15px] text-secondary">local_fire_department</span>
              Chủ đề nóng:
            </span>
            {['TieuDuong', 'IBS', 'ResistantStarch', 'CongThucSmoothie'].map((tag) => (
              <button 
                key={tag}
                type="button"
                onClick={() => handleTagClick(tag)}
                className={`font-label-sm text-label-sm px-3 py-1 rounded-full transition-colors cursor-pointer ${
                  searchQuery.toLowerCase() === tag.toLowerCase() 
                    ? 'bg-secondary text-on-secondary font-bold' 
                    : 'bg-surface-container hover:bg-secondary-container hover:text-on-secondary-container text-on-surface-variant'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article Hero Card (Khi không tìm kiếm từ khóa khác biệt) */}
      {!searchQuery && currentFilter !== 'blog' && (
        <section className="max-w-7xl mx-auto px-gutter w-full pb-space-xl">
          <div className="relative bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:shadow-xl transition-all duration-300 border border-surface-container">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Visual Column (Left) */}
              <div className="relative lg:col-span-7 min-h-[380px] lg:min-h-[460px] overflow-hidden bg-surface-container">
                <div 
                  className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: `url('${featuredArticle.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent lg:hidden" />
                
                {/* Scientific Indicator Watermark Badge */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">verified</span>
                    Nghiên cứu mới
                  </span>
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-xs">
                    Chuẩn Y Sinh RS2
                  </span>
                </div>

                {/* Bottom Visual Metric Overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-space-sm rounded-xl bg-surface-container-lowest/90 backdrop-blur-md hidden sm:flex items-center justify-between text-on-surface border border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[20px]">science</span>
                    <span className="font-label-sm text-label-sm font-semibold">Cơ chế Amylase Resistance</span>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-bold">Δ GI &lt; 28%</span>
                </div>
              </div>

              {/* Content Column (Right) */}
              <div className="lg:col-span-5 p-space-lg lg:p-space-xl flex flex-col justify-between space-y-space-md">
                <div className="space-y-space-md">
                  {/* Overline Meta */}
                  <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[16px] text-secondary">schedule</span>
                    <span>{featuredArticle.readTime}</span>
                    <span className="text-outline-variant">•</span>
                    <span className="text-secondary font-bold">Nghiên cứu lâm sàng</span>
                  </div>

                  {/* Title */}
                  <h2 
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="font-headline-lg text-headline-lg text-primary font-bold leading-tight group-hover:text-secondary transition-colors cursor-pointer"
                  >
                    {featuredArticle.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                </div>

                {/* Author Info & CTA */}
                <div className="pt-space-md space-y-space-md border-t border-surface-container">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-[20px]">clinical_notes</span>
                    </div>
                    <div>
                      <div className="font-label-lg text-label-lg text-primary font-bold">{featuredArticle.author}</div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Xuất bản: {featuredArticle.date}</div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => onSelectArticle(featuredArticle)}
                    className="inline-flex items-center justify-between w-full px-space-lg py-3.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary transition-all duration-200 shadow-sm group/btn cursor-pointer"
                  >
                    <span>Đọc toàn bộ nghiên cứu</span>
                    <span className="material-symbols-outlined text-[20px] transition-transform group-hover/btn:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Article Grid Section (6 Cards) */}
      <section className="max-w-7xl mx-auto px-gutter w-full pb-space-xl">
        <div className="flex items-center justify-between mb-space-lg">
          <div className="space-y-1">
            <h3 className="font-headline-md text-headline-md text-primary font-bold">Tài Liệu &amp; Kiến Thức Chuyên Sâu</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Được biên soạn và thẩm định bởi hội đồng cố vấn y khoa Banova
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant">
            <span>Hiển thị {filteredArticles.length} bài viết</span>
          </div>
        </div>

        {/* 3-Column Responsive Grid */}
        {gridArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg" id="articleGrid">
            {gridArticles.map((art) => (
              <article 
                key={art.id} 
                onClick={() => onSelectArticle(art)}
                className="article-card flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-surface-container cursor-pointer"
              >
                <div className="relative h-48 overflow-hidden bg-surface-container">
                  <div 
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105" 
                    style={{ backgroundImage: `url('${art.image}')` }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold shadow-xs ${
                      art.category === 'science' 
                        ? 'bg-secondary-container/90 backdrop-blur-md text-on-secondary-container' 
                        : 'bg-surface-container-high/90 backdrop-blur-md text-primary'
                    }`}>
                      {art.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-space-md flex-1 flex flex-col justify-between space-y-space-md">
                  <div className="space-y-space-xs">
                    <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                      <span>{art.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">timer</span>
                        {art.readTime}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors leading-snug line-clamp-2">
                      {art.title}
                    </h4>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3">
                      {art.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-surface-container">
                    <span className="inline-flex items-center gap-1.5 font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                      <span>{art.category === 'science' ? 'Chi tiết nghiên cứu' : 'Xem công thức'}</span>
                      <span className="material-symbols-outlined text-[18px] transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                    <span className="text-outline text-xs">#{art.tags[0]}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-space-xl text-center space-y-space-md bg-surface-container-lowest p-space-xl rounded-2xl border border-surface-container">
            <div className="w-16 h-16 rounded-full bg-surface-container-high mx-auto flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[32px]">search_off</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Không tìm thấy bài viết phù hợp</h4>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Vui lòng thử từ khóa khác hoặc xóa bộ lọc hiện tại.
              </p>
            </div>
            <button 
              type="button"
              onClick={handleResetFilters}
              className="px-space-md py-2.5 rounded-xl bg-primary-container text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary transition-colors cursor-pointer shadow-sm"
            >
              Xem tất cả bài viết
            </button>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-space-xl flex items-center justify-center gap-2">
          <button 
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 cursor-pointer border border-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
          </button>
          {[1, 2, 3].map((page) => (
            <button 
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`w-10 h-10 rounded-xl font-label-lg text-label-lg font-bold transition-all cursor-pointer ${
                currentPage === page 
                  ? 'bg-primary-container text-on-primary shadow-xs' 
                  : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high border border-surface-container'
              }`}
            >
              {page}
            </button>
          ))}
          <button 
            type="button"
            disabled={currentPage === 3}
            onClick={() => setCurrentPage((p) => Math.min(3, p + 1))}
            className="w-10 h-10 rounded-xl bg-surface-container-lowest flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-40 cursor-pointer border border-surface-container"
          >
            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
          </button>
        </div>
      </section>

      {/* Newsletter Subscription Box (Clinical Microbiome Digest) */}
      <section className="max-w-7xl mx-auto px-gutter w-full pb-space-xl">
        <div className="relative overflow-hidden rounded-3xl bg-primary-container text-on-primary p-space-lg lg:p-space-xl shadow-xl">
          {/* Ambient Glow Behind CTA */}
          <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-secondary/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 space-y-space-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/20 text-secondary-fixed font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                BẢN TIN Y SINH HỌC HÀNG TUẦN
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-primary font-bold">
                Cập nhật Nghiên cứu Vi Sinh &amp; Chuyển hóa Mới Nhất
              </h2>
              <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                Nhận tóm tắt các ấn phẩm khoa học quốc tế về kháng tinh bột RS2, liệu pháp nuôi dưỡng vi sinh vật đường ruột và công thức thực dưỡng bảo toàn hoạt tính từ Hội đồng Chuyên môn Banova.
              </p>
              <div className="flex flex-wrap items-center gap-space-md text-on-primary font-label-sm text-label-sm pt-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">verified_user</span>
                  <span>Dữ liệu thực nghiệm</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">block</span>
                  <span>Không spam quảng cáo</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">unsubscribe</span>
                  <span>Hủy đăng ký bất kỳ lúc nào</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-5 bg-surface-container-lowest p-space-md rounded-2xl text-on-surface shadow-md border border-surface-container">
              {newsletterSubmitted ? (
                <div className="p-space-md text-center space-y-2">
                  <span className="material-symbols-outlined text-secondary text-[48px]">check_circle</span>
                  <h4 className="font-headline-sm text-headline-sm text-primary font-bold">Đăng ký thành công!</h4>
                  <p className="font-body-sm text-on-surface-variant">
                    Cảm ơn bạn. Bản tin nghiên cứu y sinh Banova đầu tiên sẽ được gửi vào hộp thư của bạn vào thứ Hai tới.
                  </p>
                </div>
              ) : (
                <form className="space-y-space-sm" onSubmit={handleNewsletterSubmit}>
                  <div className="space-y-1">
                    <label className="block font-label-lg text-label-lg text-primary font-semibold" htmlFor="newsletterEmail">
                      Email nhận tài liệu nghiên cứu
                    </label>
                    <input 
                      id="newsletterEmail"
                      type="email"
                      required
                      placeholder="bacsi@benhvien.vn hoặc email của bạn..."
                      className="w-full h-12 px-space-md bg-surface-container-low text-on-surface placeholder:text-outline rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all border border-surface-container"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block font-label-sm text-label-sm text-on-surface-variant" htmlFor="readerRole">
                      Bạn quan tâm với tư cách:
                    </label>
                    <select 
                      id="readerRole"
                      className="w-full h-11 px-space-md bg-surface-container-low text-on-surface rounded-xl font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-secondary border border-surface-container"
                    >
                      <option value="consumer">Người tiêu dùng &amp; Chăm sóc gia đình</option>
                      <option value="healthcare">Bác sĩ / Chuyên gia Dinh dưỡng</option>
                      <option value="diabetes">Người quan tâm chỉ số Đường huyết / Tiền ĐTĐ</option>
                      <option value="fitness">Vận động viên / Người tập Gym &amp; Eat Clean</option>
                    </select>
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-12 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>Đăng ký nhận báo cáo định kỳ</span>
                  </button>
                  <p className="font-body-sm text-body-sm text-outline text-center text-[11px] leading-tight pt-1">
                    Bằng cách đăng ký, bạn đồng ý với tiêu chuẩn bảo mật dữ liệu nghiên cứu y khoa của Banova.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer Callout */}
      <section className="max-w-7xl mx-auto px-gutter w-full pb-space-lg">
        <div className="p-space-md rounded-2xl bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center gap-space-md border border-surface-container">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[22px]">info</span>
          </div>
          <div className="space-y-0.5">
            <div className="font-label-lg text-label-lg text-primary font-bold">
              Khuyến Cáo Chuẩn Y Khoa &amp; Tính Minh Bạch Nghiên Cứu
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tất cả các bài viết, chuyên khảo và công thức trên "Góc Khoa Học Banova" được đối chiếu từ tài liệu PubMed, ScienceDirect và các nghiên cứu lâm sàng về Kháng Tinh Bột RS2 (Resistant Starch). Nội dung mang tính chất phổ biến kiến thức vi sinh đường ruột và dinh dưỡng chuyển hóa, không mang tính chẩn đoán, kê đơn hay thay thế phác đồ điều trị của bác sĩ chuyên khoa.
            </p>
          </div>
        </div>
      </section>

      {/* Khung Khuyến cáo Y Tế Bắt Buộc Chung */}
      <div className="max-w-7xl mx-auto px-gutter pb-space-xl w-full">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
