import { apiClient } from './apiClient';

export const MOCK_ARTICLES = [
  {
    id: 'art-01',
    slug: 'co-che-rs2-khoa-hoc-microbiome',
    category: 'Nghiên cứu Microbiome',
    categorySlug: 'nghien-cuu',
    title: 'Cơ chế tinh bột kháng RS2 nuôi dưỡng vi khuẩn có lợi và sinh SCFA',
    readTime: '6 phút đọc',
    date: '15/10/2026',
    author: 'Hội đồng Khoa học Banova & Viện Nghiên cứu Dinh dưỡng',
    summary: 'Phân tích con đường sinh hóa khi RS2 vượt qua acid dạ dày xuống đại tràng, trở thành nguồn thức ăn hoàn hảo cho vi khuẩn sinh acid béo chuỗi ngắn Butyrate.',
    content: `Tinh bột kháng loại 2 (RS2) là dạng tinh bột có cấu trúc hạt tinh thể tự nhiên chặt chẽ, kháng lại sự thủy phân của các enzyme tiêu hóa alpha-amylase tại dạ dày và ruột non. Khi di chuyển xuống đại tràng, RS2 trở thành chất nền quý giá được các lợi khuẩn (đặc biệt là Faecalibacterium prausnitzii và Bifidobacterium) lên men yếm khí, sản sinh lượng lớn Axit Béo Chuỗi Ngắn (SCFA) bao gồm Butyrate, Acetate và Propionate.`,
    tags: ['Microbiome', 'RS2 Chuối Xanh', 'Hệ Tiêu Hóa', 'SCFA'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  },
  {
    id: 'art-02',
    slug: 'kiem-soat-duong-huyet-voi-tinh-bot-khang',
    category: 'Chuyển hóa & Đường huyết',
    categorySlug: 'chuyen-hoa',
    title: 'Tinh bột kháng RS2 hỗ trợ ổn định đường huyết sau bữa ăn như thế nào?',
    readTime: '5 phút đọc',
    date: '10/10/2026',
    author: 'TS. Bác sĩ Dinh dưỡng Lâm sàng',
    summary: 'Khám phá hiệu ứng "Second Meal Effect" (Hiệu ứng bữa ăn thứ hai) giúp làm chậm tốc độ hấp thu carbohydrate và cải thiện độ nhạy insulin tự nhiên.',
    content: `Khác với tinh bột nhanh làm tăng vọt glucose máu, RS2 giải phóng năng lượng từ từ và tăng cường tín hiệu hormone no GLP-1 từ đường ruột. Việc bổ sung 10-15g RS2 mỗi ngày giúp giảm biên độ dao động đường huyết sau ăn ở người tiền đái tháo đường một cách an toàn và bền vững.`,
    tags: ['Đường Huyết', 'Tiền Đái Tháo Đường', 'Insulin', 'Dinh Dưỡng Dự Phòng'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
  },
  {
    id: 'art-03',
    slug: 'giai-phap-cho-hoi-chung-ruot-kich-thich-ibs',
    category: 'Sức khỏe Tiêu hóa',
    categorySlug: 'suckhoe',
    title: 'Chăm sóc đại tràng nhạy cảm và hội chứng ruột kích thích (IBS) bằng RS2',
    readTime: '7 phút đọc',
    date: '02/10/2026',
    author: 'Dược sĩ Chuyên khoa Tiêu hóa',
    summary: 'Cách dùng tinh bột kháng từng bước thích nghi để giảm thiểu đầy hơi, tái tạo lớp niêm mạc nhầy bảo vệ thành ruột.',
    content: `Hội chứng ruột kích thích gây rối loạn co bóp và mất cân bằng hệ vi khuẩn. Nhờ bổ sung RS2 với liều lượng tăng dần (từ 5g lên 15g/ngày), cơ thể phục hồi hàng rào biểu mô ruột, giảm tính thấm thành ruột và làm dịu các cơn co thắt khó chịu.`,
    tags: ['IBS', 'Đại Tràng', 'Táo Bón', 'Niêm Mạc Ruột'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  }
];

export const articleService = {
  /**
   * Lấy danh sách bài viết
   */
  async getAllArticles(category = 'all') {
    return apiClient('/articles', { method: 'GET' }, () => {
      let items = [...MOCK_ARTICLES];
      if (category && category !== 'all') {
        items = items.filter((a) => a.categorySlug === category);
      }
      return {
        success: true,
        data: items,
        total: items.length
      };
    });
  },

  /**
   * Lấy chi tiết bài viết theo slug
   */
  async getArticleBySlug(slug) {
    return apiClient(`/articles/${slug}`, { method: 'GET' }, () => {
      const art = MOCK_ARTICLES.find((a) => a.slug === slug || a.id === slug) || MOCK_ARTICLES[0];
      return {
        success: true,
        data: art
      };
    });
  }
};
