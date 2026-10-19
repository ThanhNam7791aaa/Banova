import { apiClient } from './apiClient';

export const orderService = {
  /**
   * Tạo đơn hàng mới từ giỏ hàng checkout
   */
  async createOrder(orderPayload) {
    return apiClient(
      '/orders',
      {
        method: 'POST',
        body: JSON.stringify(orderPayload)
      },
      () => {
        const orderId = `BNV-${Math.floor(100000 + Math.random() * 900000)}`;
        return {
          success: true,
          message: 'Đặt hàng thành công! Đội ngũ Banova sẽ liên hệ xác nhận trong 15 phút.',
          data: {
            orderCode: orderId,
            createdAt: new Date().toISOString(),
            status: 'CONFIRMED',
            customer: orderPayload.customer,
            items: orderPayload.items,
            totalAmount: orderPayload.totalAmount,
            shippingFee: orderPayload.shippingFee || 0,
            paymentMethod: orderPayload.paymentMethod || 'COD'
          }
        };
      }
    );
  },

  /**
   * Tra cứu tình trạng đơn hàng theo mã
   */
  async getOrderDetails(orderCode) {
    return apiClient(`/orders/${orderCode}`, { method: 'GET' }, () => {
      return {
        success: true,
        data: {
          orderCode,
          status: 'SHIPPING',
          statusText: 'Đang vận chuyển từ Quy Nhơn',
          estimatedDelivery: '1 - 2 ngày tới'
        }
      };
    });
  }
};
