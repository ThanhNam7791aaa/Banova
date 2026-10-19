import { apiClient } from './apiClient';

export const contactService = {
  /**
   * Gửi form liên hệ / yêu cầu tư vấn 1:1
   */
  async submitContact(formData) {
    return apiClient(
      '/contact',
      {
        method: 'POST',
        body: JSON.stringify(formData)
      },
      () => ({
        success: true,
        message: 'Cảm ơn quý khách! Dược sĩ chuyên môn Banova sẽ liên hệ trong vòng 30 phút làm việc.'
      })
    );
  },

  /**
   * Đăng ký nhận bản tin cẩm nang sức khỏe & nghiên cứu mới
   */
  async subscribeNewsletter(email) {
    return apiClient(
      '/newsletter/subscribe',
      {
        method: 'POST',
        body: JSON.stringify({ email })
      },
      () => ({
        success: true,
        message: 'Đăng ký nhận bản tin thành công!'
      })
    );
  }
};
