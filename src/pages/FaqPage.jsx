import React, { useState } from 'react';

const FAQ_DATA = [
  {
    id: 'faq-01',
    category: 'co-che-rs2',
    question: 'Kháng tinh bột (Resistant Starch RS2) là gì và khác gì so với tinh bột thông thường?',
    answer: 'Tinh bột thông thường (như cơm trắng, bánh mì) sẽ nhanh chóng bị enzyme tiêu hóa tại dạ dày và ruột non phân giải thành glucose đi vào máu. Ngược lại, Tinh Bột Kháng RS2 từ chuối xanh tự nhiên có cấu trúc hạt tinh thể bền vững, không bị thủy phân tại ruột non mà đi thẳng xuống đại tràng. Tại đây, RS2 đóng vai trò là prebiotic đặc hiệu nuôi dưỡng hệ vi sinh vật có lợi, lên men tạo ra các axit béo chuỗi ngắn (SCFA như Butyrate) giúp bảo vệ lớp niêm mạc đại tràng và hỗ trợ chuyển hóa.'
  },
  {
    id: 'faq-02',
    category: 'co-che-rs2',
    question: 'Tại sao lại chọn chuối xanh Gia Lai làm nguồn cung cấp tinh bột kháng?',
    answer: 'Vùng đất đỏ bazan Gia Lai với thổ nhưỡng màu mỡ và biên độ nhiệt ngày đêm lý tưởng giúp quả chuối tích tụ hàm lượng tinh bột kháng RS2 cao vượt trội. Banova thu hoạch chuối ở độ già chuẩn khoa học (trước khi chín chuyển hóa thành đường đơn) và áp dụng công nghệ sấy nhiệt độ thấp bảo toàn 100% hoạt tính sinh học của RS2.'
  },
  {
    id: 'faq-03',
    category: 'lieu-dung',
    question: 'Nên uống bột tinh bột kháng Banova vào thời điểm nào và cách pha như thế nào?',
    answer: 'Thời điểm lý tưởng nhất là uống vào buổi sáng trước bữa ăn 30 phút hoặc dùng xen kẽ giữa các bữa ăn. Pha 1 - 2 thìa cà phê (khoảng 10-15g) với 150 - 200ml nước ấm (dưới 50°C), sữa hạt, sữa chua hoặc xay cùng sinh tố. Lưu ý quan trọng: KHÔNG pha với nước sôi trên 60°C vì nhiệt độ cao sẽ làm hồ hóa và mất đi cấu trúc kháng tiêu hóa RS2.'
  },
  {
    id: 'faq-04',
    category: 'thich-nghi',
    question: 'Mới uống có bị đầy bụng, xì hơi không và cách xử lý thế nào?',
    answer: 'Đây là hiện tượng hoàn toàn tự nhiên gọi là "hiệu ứng thích nghi của hệ vi sinh" (Microbiome Adaptation). Khi lợi khuẩn đường ruột bắt đầu được tiếp nhận nguồn thức ăn dồi dào, quá trình lên men sinh học ban đầu có thể sinh một ít khí tự nhiên. Để cơ thể làm quen êm dịu nhất: Hãy bắt đầu với 1 thìa nhỏ (5g/ngày) trong 3 - 5 ngày đầu, sau đó tăng dần lên 10 - 15g/ngày khi đường ruột đã quen nhịp.'
  },
  {
    id: 'faq-05',
    category: 'co-che-rs2',
    question: 'Người tiền đái tháo đường hoặc tiểu đường tuýp 2 có sử dụng được Banova không?',
    answer: 'Rất phù hợp! Tinh bột kháng RS2 có chỉ số đường huyết (GI) rất thấp và không làm tăng vọt glucose máu sau ăn. Nhiều nghiên cứu lâm sàng quốc tế đã chứng minh RS2 hỗ trợ cải thiện độ nhạy insulin tự nhiên và kiểm soát chỉ số HbA1c thông qua cơ chế kích thích tiết hormone GLP-1 từ thành ruột.'
  },
  {
    id: 'faq-06',
    category: 'don-hang',
    question: 'Thời gian giao hàng tại Quy Nhơn và các tỉnh thành khác là bao lâu?',
    answer: 'Đối với khu vực nội thành TP. Quy Nhơn, Banova hỗ trợ giao hàng hỏa tốc trong 2 - 4 giờ làm việc. Đối với các tỉnh thành khác trên toàn quốc, thời gian giao hàng tiêu chuẩn là 1 - 3 ngày làm việc thông qua các đơn vị chuyển phát uy tín. Đơn hàng từ 300.000đ được miễn phí vận chuyển toàn quốc.'
  },
  {
    id: 'faq-07',
    category: 'thich-nghi',
    question: 'Sản phẩm có thể dùng thay thế thuốc chữa bệnh dạ dày hoặc đại tràng không?',
    answer: 'Không. Tinh bột kháng Banova là thực phẩm bổ sung dinh dưỡng tự nhiên từ chuối xanh, hỗ trợ nuôi dưỡng hệ vi sinh và cải thiện sức khỏe đường tiêu hóa. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Quý khách đang hỗ trợ cải thiện y khoa nên tham khảo ý kiến bác sĩ hỗ trợ cải thiện để kết hợp chế độ ăn tối ưu.'
  }
];

export const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openId, setOpenId] = useState('faq-01');

  const categories = [
    { id: 'all', label: 'Tất cả câu hỏi' },
    { id: 'co-che-rs2', label: 'Cơ chế RS2 & Hệ vi sinh' },
    { id: 'lieu-dung', label: 'Cách pha & Liều dùng' },
    { id: 'thich-nghi', label: 'Thích nghi & Tiêu hóa' },
    { id: 'don-hang', label: 'Đơn hàng & Giao tại Quy Nhơn' }
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full bg-surface py-space-xl">
      <div className="max-w-4xl mx-auto px-gutter space-y-space-xl">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary-container/40 text-on-secondary-container font-label-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-[16px]">quiz</span>
            Hỏi Đáp Chuyên Sâu Cùng Chuyên Gia
          </div>
          <h1 className="font-headline-xl text-headline-xl text-primary font-bold">
            Câu Hỏi Thường Gặp Về Tinh Bột Kháng RS2
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Tổng hợp các giải đáp khoa học về cơ chế vi sinh đường ruột, phương pháp sử dụng và chính sách vận chuyển của Banova.
          </p>
        </div>

        {/* Tab lọc câu hỏi */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl font-label-md transition-all ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Danh sách Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-surface-container bg-surface-container-lowest overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full p-space-lg text-left flex items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors"
                >
                  <span className="font-headline-sm text-[17px] text-primary font-semibold leading-snug">
                    {faq.question}
                  </span>
                  <span
                    className={`material-symbols-outlined text-secondary transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    expand_more
                  </span>
                </button>
                {isOpen && (
                  <div className="px-space-lg pb-space-lg pt-1 border-t border-surface-container/40 font-body-md text-on-surface-variant leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Banner hỗ trợ dược sĩ 1:1 */}
        <div className="p-space-lg md:p-space-xl rounded-3xl bg-secondary-container/30 border border-secondary-container flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">
              Chưa tìm thấy câu hỏi của bạn?
            </h3>
            <p className="font-body-md text-on-surface-variant">
              Kết nối trực tiếp với đội ngũ dược sĩ Banova để nhận tư vấn phác đồ riêng cho cơ địa của bạn.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="tel:19006822"
              className="inline-flex items-center gap-2 px-space-md py-3 rounded-xl bg-primary text-on-primary font-label-md font-bold shadow-sm hover:bg-primary-container transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              Hotline 1900 6822
            </a>
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-space-md py-3 rounded-xl bg-surface-container-lowest text-secondary font-label-md font-bold border border-secondary shadow-xs hover:bg-secondary hover:text-on-secondary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat Zalo Dược Sĩ
            </a>
          </div>
        </div>

        {/* Disclaimer y tế đã render tập trung ở MainLayout */}
      </div>
    </div>
  );
};

export default FaqPage;
