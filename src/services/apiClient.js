/**
 * Banova API Client Module
 * Cung cấp tầng HTTP client thống nhất và cơ chế Fallback Mock Data thông minh
 * khi Backend API đang trong quá trình phát triển (Chờ BE).
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
const IS_MOCK_FALLBACK_ENABLED = !API_BASE_URL;

/**
 * Giả lập delay mạng cho Mock data (200ms - 500ms) để trải nghiệm giao diện mượt mà và thực tế
 */
export const simulateNetworkDelay = (ms = 350) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Hàm gọi API tổng quát
 * @param {string} endpoint - Đường dẫn endpoint (ví dụ: '/products')
 * @param {object} options - Fetch options (method, headers, body, ...)
 * @param {*} mockFallback - Dữ liệu fallback nếu BE chưa sẵn sàng hoặc gặp lỗi mạng
 */
export async function apiClient(endpoint, options = {}, mockFallback = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Nếu không có API_BASE_URL hoặc cấu hình Mock
  if (!API_BASE_URL && IS_MOCK_FALLBACK_ENABLED && mockFallback !== null) {
    await simulateNetworkDelay();
    return typeof mockFallback === 'function' ? mockFallback() : mockFallback;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers
      },
      signal: controller.signal,
      ...options
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (err) {
    console.warn(`[Banova API Client] Fetch to ${endpoint} failed, falling back to mock:`, err.message);
    if (IS_MOCK_FALLBACK_ENABLED && mockFallback !== null) {
      await simulateNetworkDelay(200);
      return typeof mockFallback === 'function' ? mockFallback() : mockFallback;
    }
    throw err;
  }
}
