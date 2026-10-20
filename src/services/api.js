// src/services/api.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5252/api';

if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('[api] Thiếu VITE_API_BASE_URL trong .env, sử dụng mặc định: http://localhost:5252/api');
}

function toQuery(params = {}) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') search.append(key, value);
  });
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  let response;

  try {
    response = await fetch(url, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
  } catch (err) {
    const exception = new Error('Không thể kết nối đến máy chủ BE (' + BASE_URL + '). Vui lòng kiểm tra xem BE đã khởi động chưa.');
    exception.code = 'NETWORK_ERROR';
    exception.status = 0;
    throw exception;
  }

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = body?.error ?? { code: 'SERVER_ERROR', message: 'Máy chủ phản hồi lỗi' };
    const exception = new Error(error.message);
    exception.code = error.code;      // 'VALIDATION' | 'NOT_FOUND' | 'CONFLICT' | ...
    exception.details = error.details;
    exception.status = response.status;
    throw exception;
  }

  return body; // { data } hoặc { data, meta }
}

export const api = {
  products: {
    list: (params = {}) => request(`/products${toQuery(params)}`),
    detail: (slug) => request(`/products/${encodeURIComponent(slug)}`),
  },
  categories: {
    list: () => request('/categories'),
  },
  articles: {
    list: (params = {}) => request(`/articles${toQuery(params)}`),
    detail: (slug) => request(`/articles/${encodeURIComponent(slug)}`),
  },
  quiz: {
    // BE nhận đúng shape FE đang có: { goal, morning_routine, rs_experience, sensitivity }
    submit: (answers) => request('/quiz/submit', { method: 'POST', body: JSON.stringify({ answers }) }),
  },
  orders: {
    create: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
    detail: (orderCode) => request(`/orders/${encodeURIComponent(orderCode)}`),
  },
  newsletter: {
    subscribe: (email) => request('/newsletter', { method: 'POST', body: JSON.stringify({ email }) }),
  },
  contact: {
    send: (payload) => request('/contact', { method: 'POST', body: JSON.stringify(payload) }),
  },
};
