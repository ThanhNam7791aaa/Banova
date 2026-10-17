import React, { useState, useEffect } from 'react';
import MedicalDisclaimer from '../components/layout/MedicalDisclaimer';

export default function ArticleDetailPage({
  article,
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  const [readingProgress, setReadingProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setReadingProgress(Math.min(100, Math.max(0, scrolled)));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }).catch(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    });
  };

  const handleAddReferencedProduct = () => {
    onAddToCart({
      id: 'prod-01',
      name: 'Bột Tinh Bột Kháng Banova Tự Nhiên 500g',
      price: 159000,
      weight: '500g',
      rsTag: '5.8g RS2/khẩu phần',
      description: 'Hũ thủy tinh trung tính bảo toàn cấu trúc vi sinh RS2',
      quantity: 1,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDQj_RMbr6_87DusbAUxgAh1IqZElkqfccvrz-Ea8P3IHTHaPfjj-W1wzzchA_R3_maCEWmwnCPjA81Tj64gM2oIl52Qs0sB898TgKELWHGR8eiUgr-EI8nO0waXfKy8PhkaEXwWgBDvvcKlByXMyyNXYeD7R72yL4jA9uglEV_ty9m2nqzvlhLFhTWYpCoXKgkyF8rWhQbLqLpOaYpsjle680t7XBULYcDEahmwBhlFSGPv_VpYCPU'
    });
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-80px)]">
      {/* 1. Reading Progress Bar (Fixed Top Accent) */}
      <div className="sticky top-20 z-40 w-full h-1 bg-surface-container-high/60">
        <div 
          className="h-full bg-secondary transition-all duration-150" 
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* 2. Breadcrumbs & Scientific Context Banner */}
      <section className="w-full bg-surface-container-lowest py-space-md shadow-sm border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="flex flex-wrap items-center justify-between gap-space-sm text-body-sm text-on-surface-variant">
            <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-space-xs font-label-md">
              <button 
                type="button"
                onClick={() => onNavigate('trang-chu')}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Trang chủ
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <button 
                type="button"
                onClick={() => onNavigate('goc-khoa-hoc')}
                className="hover:text-primary transition-colors cursor-pointer"
              >
                Góc khoa học
              </button>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-secondary font-semibold">Nghiên cứu lâm sàng</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-primary font-bold truncate max-w-xs sm:max-w-md">
                {article?.title || 'Tinh bột kháng & Tiền đái tháo đường'}
              </span>
            </nav>
            <div className="flex items-center gap-space-sm">
              <span className="inline-flex items-center gap-1 px-space-sm py-0.5 rounded-full bg-surface-container text-secondary font-label-sm">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  biotech
                </span>
                Hệ Tiêu Hóa &amp; Nội Tiết
              </span>
              <span className="text-label-sm text-outline hidden md:inline">• Mã hồ sơ: BNV-RES-2026-09</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Main Article Content Container */}
      <div className="w-full py-space-xl bg-surface">
        <div className="max-w-7xl mx-auto px-gutter">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-start">
            
            {/* Cột Trái: Sticky Table of Contents & Tools (Col 3) */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 space-y-space-lg">
              <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md border border-surface-container">
                <div className="flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm">
                  <span className="material-symbols-outlined text-secondary text-[20px]">list_alt</span>
                  <span className="font-bold">Mục lục bài viết</span>
                </div>
                <nav className="space-y-space-sm font-body-sm text-on-surface-variant">
                  <a className="block pl-3 border-l-2 border-secondary text-primary font-medium hover:text-primary transition-colors" href="#phan-1-ban-chat">
                    1. Bản chất sinh học của RS2
                  </a>
                  <a className="block pl-3 border-l-2 border-transparent hover:border-secondary hover:text-primary transition-colors" href="#phan-so-sanh">
                    • Bảng đối chiếu RS2 vs Cơm trắng
                  </a>
                  <a className="block pl-3 border-l-2 border-transparent hover:border-secondary hover:text-primary transition-colors" href="#phan-2-co-che-glp1">
                    2. Cơ chế điều hòa đường huyết &amp; GLP-1
                  </a>
                  <a className="block pl-3 border-l-2 border-transparent hover:border-secondary hover:text-primary transition-colors" href="#phan-3-huong-dan">
                    3. Hướng dẫn dung nạp RS2 an toàn
                  </a>
                  <a className="block pl-3 border-l-2 border-transparent hover:border-secondary hover:text-primary transition-colors" href="#tai-lieu-tham-khao">
                    4. Tài liệu tham khảo chuẩn y sinh
                  </a>
                </nav>
              </div>

              {/* Quick Action: Share & PDF */}
              <div className="p-space-md rounded-xl bg-surface-container-low space-y-space-sm border border-surface-container">
                <span className="font-label-sm uppercase tracking-wider text-outline block font-semibold">
                  Công cụ chia sẻ &amp; Tài liệu
                </span>
                <div className="flex items-center gap-space-xs">
                  <button 
                    type="button"
                    aria-label="Chia sẻ Facebook" 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                  <button 
                    type="button"
                    aria-label="Sao chép liên kết" 
                    onClick={handleCopyLink}
                    className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center hover:bg-secondary hover:text-on-secondary transition-all shadow-sm cursor-pointer" 
                  >
                    <span className="material-symbols-outlined text-[18px]">link</span>
                  </button>
                  <button 
                    type="button"
                    onClick={() => alert('Bản tóm tắt nghiên cứu lâm sàng BNV-RES-2026-09 (PDF 1.4MB) đang được tải về máy của bạn...')}
                    className="flex-1 h-9 px-space-sm rounded-lg bg-primary-container text-on-primary font-label-md flex items-center justify-center gap-1 hover:bg-primary transition-colors shadow-sm cursor-pointer font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Tải PDF (1.4MB)</span>
                  </button>
                </div>
                {copiedLink && (
                  <div className="text-center text-secondary font-label-sm py-1 bg-secondary-container/40 rounded-lg animate-in fade-in duration-200">
                    Đã sao chép liên kết bài viết!
                  </div>
                )}
              </div>

              {/* Microbiome Micro-Data Widget */}
              <div className="p-space-md rounded-xl bg-primary text-on-primary space-y-space-xs shadow-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-secondary-fixed">Chỉ số GI trung bình</span>
                  <span className="font-label-sm font-bold bg-secondary/40 text-on-secondary px-2 py-0.5 rounded-full">
                    Dưới 45
                  </span>
                </div>
                <p className="font-headline-lg font-bold text-on-primary leading-tight">5.8g RS2</p>
                <p className="font-body-sm text-on-primary-container text-[12px] leading-relaxed">
                  Mỗi khẩu phần chuẩn hóa Banova cung cấp lượng tinh bột kháng Type-2 tối ưu cho quá trình lên men kỵ khí đại tràng 24h.
                </p>
              </div>
            </aside>

            {/* Cột Phải: Nội dung bài viết chi tiết (Col 9) */}
            <article className="lg:col-span-9 max-w-3xl mx-auto space-y-space-xl min-w-0">
              {/* Article Header */}
              <header className="space-y-space-md pb-space-lg bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-surface-container">
                <div className="flex flex-wrap items-center gap-space-xs">
                  <span className="px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm uppercase tracking-wider font-bold">
                    Nghiên cứu khoa học • Lâm sàng
                  </span>
                  <span className="px-space-sm py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                    Chuẩn Y Sinh NFR-09
                  </span>
                  <span className="text-label-sm text-outline ml-auto hidden sm:inline">Phân loại: Prebiotic Thể Rắn</span>
                </div>

                <h1 className="font-display-lg-mobile md:font-headline-xl text-primary font-bold tracking-tight">
                  {article?.title || 'Tinh bột kháng là gì và vì sao tốt cho người tiền đái tháo đường?'}
                </h1>

                <p className="font-body-xl text-on-surface-variant leading-relaxed">
                  {article?.excerpt || 'Khám phá cơ chế sinh học phân tử khi tinh bột kháng RS2 từ chuối xanh tự nhiên Gia Lai làm chậm hấp thu đường, cải thiện độ nhạy insulin và phục hồi hệ vi sinh đường ruột.'}
                </p>

                {/* Meta Author & Medical Reviewer Bar */}
                <div className="pt-space-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md bg-surface-container-low p-space-md rounded-xl border border-surface-container">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container shrink-0 shadow-xs border border-surface-container-highest">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqJtULaCBHoO9RN-R2oNCIviMfKbK1cmilS0VHXePb0ROSw01FLsueZ6ZacLxEmeLK6h_EnhvVQAoawWwqN-83jdzJWkMWcPcG-KMdwDEm6oT4bSe8ZIbYjgI41CM9t8UXAjCZ6H5F9gl2OgEmWXZjH_QzYGQxK1kbZSsyWGmtCL4CZyWwKc4PTeZwSRZC5yrGoTbnhMeppnwPi1wmcktEf8DJ6kHgAVARGXLL86MEHT_JzPqC86Jz" 
                        alt="TS. Dược học Lê Minh Tuấn" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-lg text-primary font-bold">Banova Clinical Nutrition Team</span>
                        <span className="material-symbols-outlined text-secondary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          verified
                        </span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant">
                        Hiệu đính y khoa: <strong className="text-on-surface font-semibold">TS. Dược học Lê Minh Tuấn</strong>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-md font-body-sm text-outline text-right">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      <span>5 phút đọc</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                      <span>18 Tháng 10, 2026</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Action Bar */}
                <div className="lg:hidden flex items-center justify-between pt-space-xs">
                  <span className="font-label-sm text-outline">Chia sẻ bài viết:</span>
                  <div className="flex items-center gap-space-xs">
                    <button 
                      type="button"
                      onClick={handleCopyLink}
                      className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                    </button>
                    <button 
                      type="button"
                      onClick={() => alert('Đang tải PDF...')}
                      className="w-8 h-8 rounded-lg bg-surface-container text-primary flex items-center justify-center cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px]">download</span>
                    </button>
                  </div>
                </div>
              </header>

              {/* Lead Paragraph */}
              <div className="space-y-space-md">
                <p className="font-body-xl text-on-surface font-medium leading-relaxed bg-surface-container-lowest p-space-lg rounded-xl shadow-xs border border-surface-container">
                  <span className="font-display-lg text-secondary float-left leading-none pr-3 pt-1 font-bold">T</span>
                  ại Việt Nam, theo báo cáo dịch tễ học của Bộ Y Tế, tỷ lệ người trưởng thành mắc tiền đái tháo đường đang tăng với tốc độ báo động, gấp đôi số ca đái tháo đường thực thể. Đây là giai đoạn “vàng” mang tính bước ngoặt sinh học: tình trạng kháng insulin hoàn toàn có thể đảo ngược nếu can thiệp kịp thời vào chế độ dinh dưỡng và sự cân bằng trục vi sinh vật - đường ruột - nội tiết (Gut-Endocrine Axis).
                </p>
              </div>

              {/* Section 1: Bản chất sinh học */}
              <section className="space-y-space-md" id="phan-1-ban-chat">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-8 bg-secondary rounded-full" />
                  <h2 className="font-headline-lg text-primary font-bold">
                    1. Bản chất sinh học: Tinh bột kháng (Resistant Starch Type 2) là gì?
                  </h2>
                </div>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  Thông thường, tinh bột trong ngũ cốc chín (cơm trắng, bột mì tinh chế) thuộc dạng <em className="text-on-surface font-medium">Rapidly Digestible Starch (RDS)</em>. Dưới tác động tức thì của enzyme <code className="bg-surface-container px-1 py-0.5 rounded text-primary text-body-sm font-semibold">alpha-amylase</code> trong nước bọt và dịch tụy, chuỗi amylose và amylopectin sẽ bị phân cắt thành các đơn vị glucose tự do chỉ trong vòng 20 phút đầu tại ruột non, gây ra các cơn "vọt đỉnh" đường huyết đột ngột sau ăn.
                </p>

                {/* Infographic Mô phỏng Chuỗi Tinh Thể */}
                <div className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm space-y-space-md border border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="font-label-lg text-primary font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary">science</span>
                      Mô phỏng cấu trúc chuỗi Amylose đậm đặc (Kháng Thủy Phân)
                    </span>
                    <span className="font-label-sm text-outline">Kháng 100% Amylase Ruột Non</span>
                  </div>

                  <div className="w-full bg-surface-container-low p-space-md rounded-xl flex flex-col md:flex-row items-center justify-around gap-space-md border border-surface-container">
                    <div className="text-center space-y-1">
                      <div className="w-16 h-16 mx-auto rounded-full bg-error-container/40 flex items-center justify-center text-error shadow-sm">
                        <span className="material-symbols-outlined text-[32px]">cookie</span>
                      </div>
                      <p className="font-label-md font-bold text-primary">Tinh Bột Thường (RDS)</p>
                      <p className="font-body-sm text-on-surface-variant text-[11px]">Cấu trúc xoắn lỏng lẻo</p>
                      <span className="inline-block text-[11px] font-bold text-error bg-error-container/30 px-2 py-0.5 rounded-full">
                        Thủy phân tại Ruột Non (0-20m)
                      </span>
                    </div>

                    <div className="flex items-center text-secondary">
                      <span className="material-symbols-outlined text-[28px] rotate-90 md:rotate-0">trending_flat</span>
                    </div>

                    <div className="text-center space-y-1">
                      <div className="w-16 h-16 mx-auto rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-sm">
                        <span className="material-symbols-outlined text-[32px]">eco</span>
                      </div>
                      <p className="font-label-md font-bold text-primary">RS2 Chuối Xanh Gia Lai</p>
                      <p className="font-body-sm text-on-surface-variant text-[11px]">Bó tinh thể nén chặt B-type</p>
                      <span className="inline-block text-[11px] font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded-full">
                        Lên men tại Đại Tràng (12-24h)
                      </span>
                    </div>
                  </div>

                  <p className="font-body-sm text-on-surface-variant leading-relaxed">
                    Ngược lại, <strong>Tinh bột kháng RS2 (Resistant Starch Type 2)</strong> từ giống chuối xanh trồng trên thổ nhưỡng bazan Gia Lai sở hữu cấu trúc mạng lưới tinh thể hình học chặt chẽ. Enzyme amylase người hoàn toàn không thể bẻ gãy các liên kết này. Do đó, 100% RS2 di chuyển an toàn qua dạ dày và ruột non nguyên vẹn, tiếp cận đại tràng như một nguồn thức ăn sinh học quý giá nuôi dưỡng hệ vi sinh.
                  </p>
                </div>
              </section>

              {/* Bảng đối chiếu so sánh */}
              <section className="space-y-space-md" id="phan-so-sanh">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h3 className="font-headline-md text-primary font-bold">
                    Bảng đối chiếu cơ chế chuyển hóa sinh hóa
                  </h3>
                  <span className="font-label-sm text-secondary bg-secondary-container/30 px-space-sm py-1 rounded-full font-semibold">
                    Dữ liệu phân tích lâm sàng in-vivo
                  </span>
                </div>

                <div className="w-full overflow-x-auto rounded-xl shadow-sm bg-surface-container-lowest border border-surface-container">
                  <table className="w-full text-left text-body-sm">
                    <thead>
                      <tr className="bg-surface-container-low text-primary font-headline-sm text-label-lg">
                        <th className="p-space-md font-bold">Tiêu chí so sánh</th>
                        <th className="p-space-md font-bold text-on-surface-variant">
                          Tinh bột thông thường<br />
                          <span className="font-body-sm text-[11px] font-normal text-outline">(Cơm trắng, bánh mì trắng)</span>
                        </th>
                        <th className="p-space-md font-bold text-secondary bg-secondary-container/20">
                          Tinh bột kháng RS2 Banova<br />
                          <span className="font-body-sm text-[11px] font-normal text-secondary">(Chuối xanh Gia Lai)</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-container">
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-semibold text-primary">Vị trí hấp thụ &amp; phân giải</td>
                        <td className="p-space-md text-on-surface-variant">Dạ dày và ruột non</td>
                        <td className="p-space-md font-semibold text-primary bg-secondary-container/10">Đại tràng (Ruột già)</td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-semibold text-primary">Tốc độ giải phóng Glucose</td>
                        <td className="p-space-md text-error flex items-center gap-1 font-medium">
                          <span className="material-symbols-outlined text-[16px]">bolt</span>
                          Rất nhanh (GI &gt; 75), vọt đỉnh đường huyết
                        </td>
                        <td className="p-space-md text-secondary font-semibold bg-secondary-container/10">
                          Không giải phóng đột ngột (GI &lt; 45)
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-semibold text-primary">Sản phẩm chuyển hóa chính</td>
                        <td className="p-space-md text-on-surface-variant">Glucose đơn phân &amp; tích trữ glycogen/mỡ thừa</td>
                        <td className="p-space-md text-primary font-semibold bg-secondary-container/10">
                          SCFA: Butyrate, Acetate, Propionate
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-semibold text-primary">Tác động lên thụ thể Insulin</td>
                        <td className="p-space-md text-on-surface-variant">Ép tụy tiết ồ ạt, tăng đề kháng insulin ngoại vi</td>
                        <td className="p-space-md text-primary font-semibold bg-secondary-container/10">
                          Tăng độ nhạy thụ thể insulin tế bào cơ &amp; gan
                        </td>
                      </tr>
                      <tr className="hover:bg-surface-container-low/40 transition-colors">
                        <td className="p-space-md font-semibold text-primary">Kích thích Incretin GLP-1</td>
                        <td className="p-space-md text-outline">Tác động mờ nhạt hoặc gây ức chế ngược</td>
                        <td className="p-space-md text-secondary font-bold bg-secondary-container/10">
                          Kích hoạt tế bào L-cells giải phóng GLP-1 &amp; PYY
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 2: GLP-1 & Đường huyết */}
              <section className="space-y-space-md" id="phan-2-co-che-glp1">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-8 bg-secondary rounded-full" />
                  <h2 className="font-headline-lg text-primary font-bold">
                    2. Cơ chế điều hòa đường huyết và tác động lên hormone GLP-1
                  </h2>
                </div>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  Khi tinh bột kháng RS2 chuối xanh đến đại tràng, các chủng lợi khuẩn đường ruột chủ chốt như <em>Faecalibacterium prausnitzii</em> và <em>Bifidobacterium adolescentis</em> sẽ thực hiện quá trình lên men yếm khí. Phản ứng sinh hóa này chuyển hóa RS2 thành các axit béo chuỗi ngắn (<strong className="text-on-surface">SCFA - Short Chain Fatty Acids</strong>), trong đó nồng độ <span className="text-secondary font-bold">Butyrate</span> chiếm ưu thế tuyệt đối.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-xs border border-surface-container">
                    <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                      <span className="material-symbols-outlined text-[20px]">timer</span>
                    </div>
                    <h4 className="font-headline-sm text-primary font-bold">Làm chậm làm rỗng dạ dày</h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      SCFA gắn vào thụ thể FFAR2 và FFAR3 kích hoạt các tế bào thần kinh ruột phóng thích GLP-1 nội sinh, làm chậm quá trình tháo rỗng thức ăn tại môn vị, triệt tiêu cảm giác cồn cào thèm ngọt.
                    </p>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-sm space-y-space-xs border border-surface-container">
                    <div className="w-8 h-8 rounded-lg bg-primary-container flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-[20px]">fitness_center</span>
                    </div>
                    <h4 className="font-headline-sm text-primary font-bold">Phục hồi độ nhạy Insulin</h4>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      Butyrate ức chế histone deacetylase (HDAC), giúp tế bào biểu mô cơ xương tăng biểu hiện kênh vận chuyển GLUT4, cho phép tế bào dễ dàng thu nạp glucose trong máu mà không cần lượng insulin cao từ tuyến tụy.
                    </p>
                  </div>
                </div>

                {/* Scientific Pull-quote Callout Box */}
                <figure className="my-space-lg p-space-lg rounded-xl bg-primary text-on-primary shadow-md relative overflow-hidden">
                  <span className="material-symbols-outlined absolute -bottom-6 -right-6 text-[140px] text-on-primary/5 select-none pointer-events-none">
                    format_quote
                  </span>
                  <div className="relative z-10 space-y-space-sm">
                    <div className="flex items-center gap-2 text-secondary-fixed font-label-md uppercase tracking-wider font-semibold">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                      Điểm nhấn nghiên cứu y sinh
                    </div>
                    <blockquote className="font-headline-md italic font-medium leading-snug text-on-primary">
                      “Khác với chất xơ hòa tan thông thường, tinh bột kháng tự nhiên RS2 là cơ chất vàng để nuôi dưỡng nhóm vi khuẩn có ích sản sinh Butyrate, đóng vai trò như chìa khóa then chốt đảo ngược tình trạng kháng insulin ở người tiền đái tháo đường.”
                    </blockquote>
                    <figcaption className="font-body-sm text-on-primary-container flex items-center gap-2 pt-space-xs">
                      <span className="w-5 h-[1.5px] bg-secondary-fixed" />
                      Trích luận văn công bố trên Tạp chí Nội tiết &amp; Chuyển hóa Lâm sàng Hoa Kỳ
                    </figcaption>
                  </div>
                </figure>
              </section>

              {/* Section 3: Hướng dẫn dung nạp RS2 an toàn */}
              <section className="space-y-space-md" id="phan-3-huong-dan">
                <div className="flex items-center gap-space-xs">
                  <span className="w-2.5 h-8 bg-secondary rounded-full" />
                  <h2 className="font-headline-lg text-primary font-bold">
                    3. Hướng dẫn dung nạp RS2 an toàn cho người đường huyết không ổn định
                  </h2>
                </div>
                <p className="font-body-lg text-on-surface-variant leading-relaxed">
                  Đối với người có tiền sử nhạy cảm đường ruột hoặc tiền đái tháo đường đang làm quen với chế độ giàu chất xơ prebiotic, việc bổ sung cần tuân thủ nguyên tắc tăng dần (titration protocol) để hệ vi sinh thích nghi sinh sản SCFA mà không gây chướng bụng nhẹ.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md pt-space-xs">
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs space-y-space-sm border border-surface-container">
                    <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold font-headline-sm">
                      1
                    </div>
                    <h4 className="font-label-lg text-primary font-bold">Tuần 1: Khởi động</h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Dùng <strong className="text-primary">7.5g</strong> (khoảng 1 muỗng gạt) mỗi sáng trước khi ăn 30 phút. Giúp hệ vi khuẩn thích ứng nhẹ nhàng.
                    </p>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs space-y-space-sm border border-surface-container">
                    <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold font-headline-sm">
                      2
                    </div>
                    <h4 className="font-label-lg text-primary font-bold">Tuần 2 trở đi: Ổn định</h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Nâng lên khẩu phần chuẩn <strong className="text-primary">15g/ngày</strong>. Thời điểm lý tưởng: trước bữa ăn chính có chứa carbohydrate.
                    </p>
                  </div>
                  <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-xs space-y-space-sm border border-surface-container">
                    <div className="w-8 h-8 rounded-full bg-surface-container text-secondary flex items-center justify-center font-bold font-headline-sm">
                      !
                    </div>
                    <h4 className="font-label-lg text-primary font-bold">Quy tắc vàng &lt; 50°C</h4>
                    <p className="font-body-sm text-on-surface-variant">
                      Pha bột Banova với nước ấm <strong className="text-primary">dưới 50°C</strong> hoặc sinh tố nguội để bảo toàn cấu trúc tinh thể liên kết RS2 không bị hồ hóa.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4: Sản phẩm tham chiếu trong nghiên cứu */}
              <section className="p-space-lg rounded-xl bg-gradient-to-br from-surface-container-lowest via-surface-container-low/40 to-surface-container-lowest shadow-md space-y-space-md border border-secondary/20">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-[22px]">medication_liquid</span>
                    <span className="font-label-lg text-primary uppercase tracking-wider font-bold">
                      Sản phẩm tham chiếu trong nghiên cứu
                    </span>
                  </div>
                  <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold">
                    OCOP 4 Sao Gia Lai
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-space-lg">
                  <div className="w-full sm:w-44 h-44 rounded-xl bg-surface-container-lowest overflow-hidden shrink-0 shadow-sm flex items-center justify-center border border-surface-container">
                    <img 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQj_RMbr6_87DusbAUxgAh1IqZElkqfccvrz-Ea8P3IHTHaPfjj-W1wzzchA_R3_maCEWmwnCPjA81Tj64gM2oIl52Qs0sB898TgKELWHGR8eiUgr-EI8nO0waXfKy8PhkaEXwWgBDvvcKlByXMyyNXYeD7R72yL4jA9uglEV_ty9m2nqzvlhLFhTWYpCoXKgkyF8rWhQbLqLpOaYpsjle680t7XBULYcDEahmwBhlFSGPv_VpYCPU" 
                      alt="Bột Tinh Bột Kháng Banova Tự Nhiên (500g)" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-space-sm text-center sm:text-left">
                    <h3 className="font-headline-md text-primary font-bold">
                      Bột Tinh Bột Kháng Banova Tự Nhiên (500g)
                    </h3>
                    <p className="font-body-sm text-on-surface-variant leading-relaxed">
                      Chiết xuất từ chuối tiêu xanh nguyên bản Gia Lai qua công nghệ sấy thăng hoa lạnh bảo tồn 100% tinh thể RS2 tự nhiên. Hỗ trợ điều hòa chỉ số đường huyết sau ăn và tái sinh hàng rào biểu mô ruột.
                    </p>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-space-sm py-1">
                      <span className="font-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold">
                        ✓ 5.8g RS2 / Khẩu phần
                      </span>
                      <span className="font-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold">
                        ✓ Chỉ số GI &lt; 45
                      </span>
                      <span className="font-label-sm px-2.5 py-1 rounded-full bg-surface-container text-primary font-semibold">
                        ✓ Không phụ gia hóa dược
                      </span>
                    </div>
                    <div className="flex items-center justify-between flex-wrap gap-space-sm pt-space-xs">
                      <div>
                        <span className="font-body-sm text-outline line-through mr-2">195.000 ₫</span>
                        <span className="font-headline-md text-primary font-bold">159.000 ₫</span>
                      </div>
                      <button 
                        type="button"
                        onClick={handleAddReferencedProduct}
                        className="px-space-lg py-space-sm rounded-xl bg-primary-container text-on-primary font-label-lg font-bold hover:bg-primary transition-all shadow-xs inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>Thêm vào giỏ hàng</span>
                        <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5: Tài liệu tham khảo chuẩn y khoa NFR-09 */}
              <section className="p-space-lg rounded-xl bg-surface-container-low shadow-sm space-y-space-md border border-surface-container" id="tai-lieu-tham-khao">
                <div className="flex items-center gap-space-xs text-primary">
                  <span className="material-symbols-outlined text-secondary text-[24px]">menu_book</span>
                  <h3 className="font-headline-sm font-bold">Tài liệu tham khảo &amp; Dẫn chứng y khoa</h3>
                </div>
                <p className="font-body-sm text-on-surface-variant">
                  Tất cả các cơ chế và số liệu trong bài viết được trích lục từ các công trình nghiên cứu bình duyệt (Peer-reviewed) trên các tạp chí y khoa quốc tế và báo cáo dịch tễ học quốc gia:
                </p>
                <ol className="space-y-space-sm font-body-sm text-on-surface-variant list-decimal list-inside leading-relaxed">
                  <li className="pl-1">
                    <strong className="text-on-surface">Bộ Y Tế Việt Nam (2021).</strong> Báo cáo điều tra quốc gia các yếu tố nguy cơ của bệnh không lây nhiễm (STEPS). Tỷ lệ đái tháo đường và tiền đái tháo đường tăng gấp 2 lần trong thập kỷ qua.
                  </li>
                  <li className="pl-1">
                    <strong className="text-on-surface">Birt DF, et al. (2013).</strong> <em>Resistant starch: promise for improving human health.</em> Advances in Nutrition, 4(6), 587–601. Phân loại cấu trúc và tác động sinh học của tinh bột kháng thể RS2.
                  </li>
                  <li className="pl-1">
                    <strong className="text-on-surface">Bindels LB, et al. (2020).</strong> <em>Gut microbiota-derived short-chain fatty acids in metabolic health and diabetes.</em> Nature Reviews Endocrinology, 16(11), 600-618. Vai trò của Butyrate và kích thích GLP-1.
                  </li>
                  <li className="pl-1">
                    <strong className="text-on-surface">Maki KC, et al. (2012).</strong> <em>Resistant starch from high-amylose maize increases insulin sensitivity in overweight and obese men.</em> Journal of Nutrition, 142(4), 717–723. Cải thiện độ nhạy insulin ngoại vi qua nghiệm pháp dung nạp glucose.
                  </li>
                </ol>
              </section>

              {/* Section 6: Medical Disclaimer Note */}
              <section className="p-space-md rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed space-y-space-xs shadow-xs border border-tertiary-fixed">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-on-tertiary-fixed text-[20px]">warning</span>
                  <span className="font-label-lg font-bold uppercase tracking-wider text-on-tertiary-fixed">
                    Khuyến cáo miễn trừ trách nhiệm y khoa
                  </span>
                </div>
                <p className="font-body-sm text-on-tertiary-fixed/90 leading-relaxed">
                  Thông tin đăng tải trong bài viết nhằm mục đích giáo dục kiến thức dinh dưỡng y học và sinh học phân tử hệ vi sinh đường ruột. Tinh bột kháng Banova là thực phẩm bổ sung tự nhiên giàu dinh dưỡng, không phải là thuốc và không thay thế thuốc điều trị hạ đường huyết hoặc phác đồ insulin do bác sĩ chuyên khoa nội tiết chỉ định. Vui lòng tham khảo ý kiến chuyên gia y tế trước khi thực hiện các thay đổi lớn trong chế độ ăn kiểm soát đái tháo đường.
                </p>
              </section>

              {/* Section 7: Next & Previous Article Navigation */}
              <nav aria-label="Điều hướng bài viết" className="pt-space-md grid grid-cols-1 md:grid-cols-2 gap-space-md">
                <button 
                  type="button"
                  onClick={() => alert('Chuyển sang bài viết: Chuỗi Axit Béo Ngắn (SCFA)...')}
                  className="p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors shadow-sm flex items-start gap-space-sm group border border-surface-container cursor-pointer text-left"
                >
                  <span className="material-symbols-outlined text-secondary text-[24px] mt-1 group-hover:-translate-x-1 transition-transform">
                    arrow_back
                  </span>
                  <div className="space-y-1">
                    <span className="font-label-sm text-outline uppercase tracking-wider block">Bài viết trước</span>
                    <span className="font-headline-sm text-label-lg text-primary font-bold line-clamp-2">
                      Chuỗi Axit Béo Ngắn (SCFA): Lá chắn bảo vệ hàng rào niêm mạc đại tràng
                    </span>
                  </div>
                </button>

                <button 
                  type="button"
                  onClick={() => alert('Chuyển sang bài viết: So sánh 4 loại tinh bột kháng RS1 - RS4...')}
                  className="p-space-md rounded-xl bg-surface-container-lowest hover:bg-surface-container-low transition-colors shadow-sm flex items-start justify-between gap-space-sm text-right group border border-surface-container cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="font-label-sm text-outline uppercase tracking-wider block">Bài viết tiếp theo</span>
                    <span className="font-headline-sm text-label-lg text-primary font-bold line-clamp-2">
                      So sánh 4 loại tinh bột kháng RS1, RS2, RS3 và RS4 trong chế độ ăn
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-secondary text-[24px] mt-1 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </nav>

              {/* Return to Hub Button */}
              <div className="text-center pt-space-md">
                <button 
                  type="button"
                  onClick={() => onNavigate('goc-khoa-hoc')}
                  className="inline-flex items-center gap-2 px-space-xl py-space-sm rounded-xl bg-surface-container-lowest text-primary font-label-lg font-bold hover:bg-surface-container-high transition-colors shadow-sm border border-surface-container cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_view</span>
                  <span>Quay lại Thư viện Nghiên cứu Banova</span>
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* 4. Khung Khuyến cáo Y Tế Bắt Buộc (Medical Disclaimer chuẩn với khiên y tế xanh) */}
      <div className="max-w-7xl mx-auto px-gutter pb-space-xl w-full">
        <MedicalDisclaimer />
      </div>
    </div>
  );
}
