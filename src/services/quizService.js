import { apiClient } from './apiClient';

export const quizService = {
  /**
   * Nộp kết quả bài Quiz khảo sát sức khỏe tiêu hóa & nhận phác đồ gợi ý
   */
  async submitQuiz(answers) {
    return apiClient(
      '/quiz/evaluate',
      {
        method: 'POST',
        body: JSON.stringify(answers)
      },
      () => {
        // Phân tích logic giả lập theo câu trả lời
        const isConstipation = answers.digestiveIssues?.includes('constipation');
        const isBloodSugar = answers.primaryGoal === 'bloodsugar';

        return {
          success: true,
          recommendation: {
            profileType: isBloodSugar
              ? 'Nhóm Ổn Định Chuyển Hóa & Đường Huyết'
              : isConstipation
              ? 'Nhóm Cải Thiện Nhu Động Đại Tràng & Hệ Vi Sinh'
              : 'Nhóm Phục Hồi Microbiome Toàn Diện',
            dailyRsTarget: isBloodSugar ? '12 - 15g RS2' : '10g RS2',
            startingProtocol: 'Bắt đầu 1 thìa cà phê (5g) pha nước ấm vào buổi sáng trong 5 ngày đầu để hệ vi sinh thích nghi êm dịu.',
            suggestedProductSlug: 'combo-2-hu-bot-chuoi-xanh-tiet-kiem',
            suggestedProductName: 'Combo 2 Hũ Bột Chuối Xanh Kháng Tinh Bột (1kg)'
          }
        };
      }
    );
  }
};
