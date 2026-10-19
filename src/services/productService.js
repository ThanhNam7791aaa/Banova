import { apiClient } from './apiClient';

export const MOCK_PRODUCTS = [
  {
    id: 'prod-01',
    slug: 'bot-chuoi-xanh-nguyen-chat-500g',
    name: 'Bột Chuối Xanh Gia Lai Nguyên Chất 500g',
    category: 'bot-nguyen-chat',
    categoryName: 'Bột Nguyên Chất',
    price: 159000,
    originalPrice: 195000,
    spec: 'Hũ 500g',
    rsBadge: '5.8g RS2/khẩu phần',
    rating: 4.9,
    reviewCount: 342,
    salesCount: '1.2k+ đã bán',
    badge: 'Bán Chạy Nhất',
    description: 'Chứa hàm lượng tinh bột kháng RS2 tự nhiên cao nhất, sản xuất từ chuối xanh thu hoạch chuẩn độ già tại vùng đất đỏ bazan Gia Lai.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
  },
  {
    id: 'prod-02',
    slug: 'combo-2-hu-bot-chuoi-xanh-tiet-kiem',
    name: 'Combo 2 Hũ Bột Chuối Xanh Kháng Tinh Bột (1kg)',
    category: 'combo-lieu-trinh',
    categoryName: 'Combo Liệu Trình',
    price: 295000,
    originalPrice: 390000,
    spec: 'Combo 2 Hũ (1kg)',
    rsBadge: 'Liệu trình 60 ngày',
    rating: 5.0,
    reviewCount: 520,
    salesCount: '850+ đã bán',
    badge: 'Tiết Kiệm 95k',
    description: 'Liệu trình chuyên sâu 60 ngày hỗ trợ cải thiện hệ vi sinh đường ruột và ổn định chỉ số đường huyết sau bữa ăn.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
  },
  {
    id: 'prod-03',
    slug: 'bot-chuoi-xanh-hop-10-goi-tien-loi',
    name: 'Bột Chuối Xanh Banova Hộp 10 Gói Tiện Lợi (150g)',
    category: 'bot-nguyen-chat',
    categoryName: 'Dạng Gói Nhỏ',
    price: 69000,
    originalPrice: 85000,
    spec: 'Hộp 10 gói x 15g',
    rsBadge: 'Dành cho văn phòng',
    rating: 4.8,
    reviewCount: 189,
    salesCount: '2.1k+ đã bán',
    badge: 'Tiện Lợi',
    description: 'Thiết kế gói chia sẵn định lượng chuẩn y khoa, dễ dàng mang theo khi đi làm, công tác hoặc đi du lịch.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  },
  {
    id: 'prod-04',
    slug: 'banh-quy-dinh-duong-prebiotic-banova',
    name: 'Bánh Quy Yến Mạch & Bột Kháng Chuối Xanh Banova',
    category: 'banh-dinh-duong',
    categoryName: 'Bánh Ăn Kiêng',
    price: 89000,
    originalPrice: 110000,
    spec: 'Hộp 250g',
    rsBadge: 'Ăn vặt lành mạnh',
    rating: 4.9,
    reviewCount: 145,
    salesCount: '620+ đã bán',
    badge: 'Mới Ra Mắt',
    description: 'Không đường tinh luyện, giàu chất xơ hòa tan và tinh bột kháng, món ăn xế hoàn hảo cho người theo chế độ ăn sạch và kiểm soát cân nặng.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  }
];

export const productService = {
  /**
   * Lấy danh sách toàn bộ sản phẩm
   */
  async getAllProducts(params = {}) {
    return apiClient('/products', { method: 'GET' }, () => {
      let result = [...MOCK_PRODUCTS];
      if (params.category && params.category !== 'all') {
        result = result.filter((p) => p.category === params.category);
      }
      return {
        success: true,
        data: result,
        total: result.length
      };
    });
  },

  /**
   * Lấy chi tiết sản phẩm theo slug hoặc id
   */
  async getProductBySlug(slug) {
    return apiClient(`/products/${slug}`, { method: 'GET' }, () => {
      const product = MOCK_PRODUCTS.find((p) => p.slug === slug || p.id === slug) || MOCK_PRODUCTS[0];
      return {
        success: true,
        data: product
      };
    });
  }
};
