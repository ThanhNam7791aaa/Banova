import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      toastMessage: null,

      showToast: (msg) => {
        set({ toastMessage: msg });
        setTimeout(() => {
          set((state) => (state.toastMessage === msg ? { toastMessage: null } : {}));
        }, 3200);
      },

      hideToast: () => set({ toastMessage: null }),

      addItem: (product, quantity = 1) => {
        if (!product || !product.id) return;
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
                id: product.id, // Bắt buộc dùng GUID do BE trả về (FE-HANDOVER 5.1)
                name: product.name,
                price: Number(product.price) || 0,
                weight: product.unitInfo || product.servingSize || product.weight || 'Quy chuẩn',
                rsTag: product.rsBadge || 'Chuẩn RS2 Gia Lai',
                description: product.shortDescription || product.description || 'Sản phẩm dinh dưỡng kháng tinh bột RS2',
                quantity: qty,
                image: product.image || product.imageUrl || ''
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
      partialize: (state) => ({ 
        // Lọc bỏ mọi item mock cũ prod-* nếu có trong localStorage từ phiên trước
        cartItems: (state.cartItems || []).filter(item => item.id && !item.id.toString().startsWith('prod-'))
      })
    }
  )
);
