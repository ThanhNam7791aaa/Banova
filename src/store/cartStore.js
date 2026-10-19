import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_CART_ITEMS = [
  {
    id: 'prod-01',
    name: 'Bột Tinh Bột Kháng Banova Tự Nhiên 500g',
    price: 159000,
    weight: '500g',
    rsTag: '5.8g RS2/khẩu phần',
    description: 'Hũ thủy tinh trung tính bảo toàn cấu trúc vi sinh RS2',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
  },
  {
    id: 'prod-03',
    name: 'Bột Banova Hộp 10 Gói 15g Tiện Lợi',
    price: 69000,
    weight: '10 Gói',
    rsTag: 'Tiện dụng văn phòng',
    description: 'Gói chia liều lượng chuẩn, hòa tan nhanh với sinh tố hoặc nước ấm',
    quantity: 1,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrMX4CUMxJBtX2NtIrLRHdUr4SobsQ8mCYCaHnfjZ8UanKK5OrshjuWsVRnjxMaxBUr-IJ3wrakzhUf9l5fV0y1LpOKRrEjlj09ZfLJIbFhup7nv8WMe0utTDOcp9eCdANmvN6FI_DHoZhMNsBioZg6JUzhtVYEi1L8bZNb-Wjc_1EHd8lDE8ByONQjmP50pXPh7bKL5atginuEXHXsmfcW-2II5LQyzdzjrMO62nTQ7A8oOeCF0MZ'
  }
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: INITIAL_CART_ITEMS,
      toastMessage: null,

      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          set((state) => (state.toastMessage === msg ? { toastMessage: null } : {}));
        }, 3200);
      },

      hideToast: () => set({ toastMessage: null }),

      addItem: (product, quantity = 1) => {
        const qty = Number(quantity) || 1;
        set((state) => {
          const existingIndex = state.cartItems.findIndex((item) => item.id === product.id);
          let newItems;
          if (existingIndex > -1) {
            newItems = [...state.cartItems];
            newItems[existingIndex] = {
              ...newItems[existingIndex],
              quantity: newItems[existingIndex].quantity + qty
            };
          } else {
            newItems = [
              ...state.cartItems,
              {
                id: product.id || `prod-${Date.now()}`,
                name: product.name,
                price: Number(product.price) || 159000,
                weight: product.weight || product.spec || 'Quy chuẩn',
                rsTag: product.rsTag || product.rsBadge || 'Chuẩn RS2 Gia Lai',
                description: product.description || 'Sản phẩm dinh dưỡng kháng tinh bột RS2',
                quantity: qty,
                image: product.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsLeH_7AMePXKa6uSLLev1jV9T_4loFtxndS9sHFFEDuzsWanDShb-RtfeYBBL0zNt91LmuBghISC7aO3cGDLyBWYhOx3T6cRUIcfW_8fpWsSdjqTxgKnjzRFNYiPP2mBjeqhm6r2HcYCFaqB6uFKI91eTBYOSW5KAHvC9P0qheigZW7iKLeO7IVUBZkD7h4rNXXE97F9cydjSn45kh-cXkUShYz4SMHSL33o-1K6-Rv7qs3MgDBQR'
              }
            ];
          }
          return { cartItems: newItems };
        });
        get().showToast(`Đã thêm ${qty} "${product.name}" vào giỏ hàng!`);
      },

      updateQuantity: (id, delta) => {
        set((state) => ({
          cartItems: state.cartItems
            .map((item) => {
              if (item.id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : null;
              }
              return item;
            })
            .filter(Boolean)
        }));
      },

      removeItem: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== id)
        }));
        get().showToast('Đã xóa sản phẩm khỏi giỏ hàng.');
      },

      clearCart: () => {
        set({ cartItems: [] });
        get().showToast('Đã dọn sạch giỏ hàng.');
      },

      resetDemoCart: () => {
        set({ cartItems: INITIAL_CART_ITEMS });
        get().showToast('Đã khôi phục giỏ hàng mẫu.');
      },

      getTotalCount: () => {
        const { cartItems } = get();
        return cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
      },

      getTotalPrice: () => {
        const { cartItems } = get();
        return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
      }
    }),
    {
      name: 'banova_cart_storage', // Khóa lưu localStorage
      partialize: (state) => ({ cartItems: state.cartItems }) // Chỉ lưu cartItems vào localStorage
    }
  )
);
