// src/services/mappers.js
const vnd = new Intl.NumberFormat('vi-VN');

export const formatPrice = (amount) => `${vnd.format(amount || 0)}₫`;

/** ProductDto của BE -> shape các component UI đang đọc */
export const mapProduct = (p) => {
  if (!p) return null;
  return {
    ...p,
    image: p.imageUrl ?? '',
    formattedPrice: formatPrice(p.price),
    rsBadge: p.rsContent && p.rsType ? `${p.rsContent}g ${p.rsType}/khẩu phần` : 'Chuẩn RS2 Gia Lai',
    unitInfo: p.unit && p.servingSize ? `${p.unit} ${p.servingSize}` : (p.unit || ''),
    subInfo: p.shortDescription ?? '',
    // UI có đọc nhưng BE không trả -> để undefined để JSX tự bỏ qua
    badge: undefined,
    discount: undefined,
    originalPrice: undefined,
  };
};

/** Kết quả quiz -> shape màn hình kết quả đang dùng */
export const mapQuizResult = (data) => {
  if (!data) return null;
  return {
    score: data.score,
    message: data.message,
    product: data.recommendedProduct ? {
      ...mapProduct(data.recommendedProduct),
      rsTag: `${data.recommendedProduct.rsContent || 0}g ${data.recommendedProduct.rsType || 'RS2'}`,
      whyFitText: data.message,
    } : null,
  };
};


/** ArticleDto của BE -> shape các component UI đang đọc */
export const mapArticle = (a) => {
  if (!a) return null;
  const isScience = a.type === 'SCIENCE';
  const pubDate = a.publishedAt
    ? new Date(a.publishedAt).toLocaleDateString('vi-VN')
    : (a.date || '18/10/2026');
  const readMinutes = Math.max(3, Math.ceil((a.content?.length || 600) / 300));

  return {
    ...a,
    image: a.thumbnail || a.image || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800',
    date: pubDate,
    readTime: `${readMinutes} phút đọc`,
    category: isScience ? 'science' : 'blog',
    categoryLabel: isScience ? 'Nghiên cứu khoa học' : 'Ẩm thực & Dinh dưỡng',
    tags: Array.isArray(a.tags) && a.tags.length > 0
      ? a.tags
      : [isScience ? 'KhoaHocRS2' : 'DinhDuongLanhManh'],
    author: a.author || 'Banova Clinical Nutrition Team',
  };
};
