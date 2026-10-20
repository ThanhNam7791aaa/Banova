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
