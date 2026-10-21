import React, { useState, useEffect } from 'react';
import { api, mapQuizResult } from '../services';

export default function QuizPage({ 
  onNavigate = () => {},
  onAddToCart = () => {}
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverQuizResult, setServerQuizResult] = useState(null);
  const [catalogProducts, setCatalogProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    api.products.list().then(res => {
      if (isMounted && res?.data) {
        setCatalogProducts(res.data);
      }
    }).catch(() => {});
    return () => { isMounted = false; };
  }, []);

  // Lưu trữ câu trả lời của người dùng theo đúng shape BE quy ước
  const [answers, setAnswers] = useState({
    goal: 'gut-health',
    morning_routine: 'speed',
    rs_experience: 'new',
    sensitivity: 'normal'
  });

  const stepMeta = {
    1: { title: 'Bước 1 / 4', percent: '25% Hoàn thành', width: '25%' },
    2: { title: 'Bước 2 / 4', percent: '50% Hoàn thành', width: '50%' },
    3: { title: 'Bước 3 / 4', percent: '75% Hoàn thành', width: '75%' },
    4: { title: 'Bước 4 / 4', percent: '100% Hoàn thành', width: '100%' }
  };

  const handleSelectOption = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Gọi API nộp câu trả lời quiz lên server BE
      try {
        setIsSubmitting(true);
        const res = await api.quiz.submit(answers);
        if (res && res.data) {
          const mapped = mapQuizResult(res.data);
          setServerQuizResult(mapped);
        }
      } catch (err) {
        console.warn('[QuizPage] Nối API quiz submit lỗi, dùng fallback client:', err);
      } finally {
        setIsSubmitting(false);
        setShowResult(true);
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (step) => {
    setCurrentStep(step);
    setShowResult(false);
  };

  const restartQuiz = () => {
    setCurrentStep(1);
    setShowResult(false);
    setServerQuizResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xác định sản phẩm gợi ý dựa trên câu trả lời
  const getRecommendedProduct = () => {
    if (answers.morning_routine === 'bakery') {
      return {
        id: (catalogProducts.find(p => p.slug.includes('banh'))?.id || catalogProducts[1]?.id || 'prod-04'),
        name: 'Bánh Quy Nguyên Cám Prebiotic Chuối Xanh',
        price: 39000,
        formattedPrice: '39.000 ₫',
        originalPrice: '49.000 ₫',
        discountBadge: '-20% Dùng thử',
        rsTag: '3.2g RS / Gói',
        description: 'Dạng bánh quy giòn xốp thơm lừng yến mạch và chuối xanh, hoàn hảo cho bữa sáng nhẹ nhàng không cần pha chế chất lỏng.',
        whyFitText: 'Bạn thích thưởng thức bữa sáng thực dưỡng tiện lợi kèm trà hoặc cà phê. Bánh quy prebiotic Banova giúp bạn nạp tinh bột kháng ngon miệng, không cần lỉnh kỉnh ly tách!',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZCy2ZlK0WItabDM2N4CEGOK0TkEIQHOIJdCykDBdIJzRxN4QZBIUWJWPqb3-YhbtdG1KduT_AtHiu2_eoYkXcO42jKBhWnTDjuByBk_6wNTZ8C-6Y_JFvEFpZjz33n_G8EO2Llbui6ei7QNudDpmkVDiy-E0OhK3FqedIl7ADWVcZRI-IbUnIAfnj8Ozz7-BmTEydIB60L-8r5cSJ1O10tu_K4J3PWbvyxCXCJ8Q-4zgEFSs5jqEk'
      };
    } else if (answers.goal === 'family-breakfast') {
      return {
        id: (catalogProducts.find(p => p.slug.includes('bua-sang') || p.slug.includes('combo'))?.id || catalogProducts[2]?.id || 'prod-05'),
        name: 'Combo Bữa Sáng Gut-Health (Bột 250g + Bánh quy + Shaker)',
        price: 125000,
        formattedPrice: '125.000 ₫',
        originalPrice: '148.000 ₫',
        discountBadge: '-15% Trọn bộ',
        rsTag: 'Lộ trình 14 ngày',
        description: 'Giải pháp bữa sáng toàn diện cho gia đình: Kết hợp bột chuối xanh nguyên chất, bánh quy prebiotic và bình lắc cao cấp.',
        whyFitText: 'Mục tiêu của bạn là dinh dưỡng tự nhiên lành mạnh cho cả gia đình. Combo này cung cấp đầy đủ cả thức uống lẫn món bánh ăn nhẹ cho bữa sáng cân bằng.',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDjnPRTryhx18_e9BqdcUcQ8KXdTO9CsMARjewr_03cUEZaRMuKWpjZd5WD0XaZcIfnXYrRQqqxmQiMnrt_slOxZiw6Pc9Cg7ZcZUOn2i3YDyMVy3A4lQ_WNu8eJUp7COgFThjZyHWiDp3Uhz-nvWNSG6zP-aJQ7E5HbVAbwReBlBvZ-gZVyybVpfGgm1OC6d0XXG4talRFBLbdxOfwbB9MsSrE2UknK4g1oKl7RQLtVeiD869fGKwn'
      };
    }

    // Mặc định: Hộp 10 gói 15g tiện lợi
    return {
      id: (catalogProducts.find(p => p.slug.includes('goi') || p.slug.includes('hop'))?.id || catalogProducts[0]?.id || 'prod-03'),
      name: 'Bột Tinh Bột Kháng Banova Hộp 10 Gói 15g Tiện Lợi',
      price: 69000,
      formattedPrice: '69.000 ₫',
      originalPrice: '85.000 ₫',
      discountBadge: '-18% Thử nghiệm',
      rsTag: '5.8g RS2 / Gói',
      description: 'Dòng sản phẩm chia liều thông minh chuẩn 15g/gói, thiết kế dành riêng cho người bận rộn cần giải pháp chuẩn bị dưới 60 giây.',
      whyFitText: 'Bạn đã chia sẻ rằng buổi sáng rất vội và hệ tiêu hóa nhạy cảm. Dạng gói chia sẵn giúp bạn kiểm soát chuẩn xác liều lượng 15g mỗi ngày, loại bỏ hoàn toàn việc đong đếm lỉnh kỉnh, hòa tan mượt mà trong bình lắc chỉ với 30 giây!',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBTBII4zXuVm8f6f-QYKgywVDKoZhKTwTcLnFnvGyDM7X8JOGklCESUVjKmrICsif0y1wULKURcV2Ktm23TPVEurwuHrD83vR313RjaxGaBFJtolhLqAdB3b-tA9QSyWEG6KsuCt2X1thWSe_2qpYQ20xLVybKicefG96SbF7g58pqjTb1al811BRth0hW_w1tipDbudD52qG1sBdtilnOy_VRkBP5zm6ujmAxjDkHWsWx3gtgLxHqx'
    };
  };

  const recommendedProduct = serverQuizResult?.product || getRecommendedProduct();
  const quizFeedbackMessage = serverQuizResult?.message || recommendedProduct.whyFitText;

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Ambient Glow Canvas Decor */}
      <div className="relative w-full overflow-hidden pb-space-xl">
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-72 right-10 w-[420px] h-[420px] bg-surface-container-high/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto px-gutter py-space-lg">
          {/* Top Title & Clinical Micro-header */}
          <div className="text-center max-w-2xl mx-auto space-y-space-xs mb-space-lg">
            <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-container/40 text-on-secondary-container border border-secondary-container/30">
              <span className="material-symbols-outlined text-[16px] text-secondary">biotech</span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Hệ Thống Phân Tích Thể Trạng Vi Sinh Banova
              </span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-extrabold">
              Trắc Nghiệm Đánh Giá Hệ Vi Sinh &amp; Lộ Trình RS2
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Dành 60 giây phân tích phản ứng đường ruột và nhịp sinh học cá nhân để lựa chọn giải pháp tinh bột kháng chuối xanh Gia Lai chuẩn hóa khoa học.
            </p>
          </div>

          {/* Main Interactive Assessment Card */}
          <div className="relative rounded-3xl bg-surface-container-lowest shadow-xl p-space-md md:p-space-xl overflow-hidden transition-all duration-300 border border-surface-container">
            {/* Wizard Navigation & Progress Bar */}
            <div className="space-y-space-sm mb-space-xl">
              <div className="flex items-center justify-between">
                <button 
                  type="button"
                  disabled={currentStep === 1}
                  onClick={previousStep}
                  className="inline-flex items-center gap-1.5 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md group disabled:opacity-30 disabled:pointer-events-none"
                >
                  <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-0.5">
                    arrow_back
                  </span>
                  <span>Quay lại câu trước</span>
                </button>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Chuẩn dinh dưỡng y sinh • Bảo mật 100%
                  </span>
                </div>
              </div>

              {/* Animated Progress Rail */}
              <div className="space-y-1">
                <div className="flex items-center justify-between font-label-md text-label-md text-primary">
                  <span className="font-bold">{stepMeta[currentStep].title}</span>
                  <span className="text-secondary font-semibold">{stepMeta[currentStep].percent}</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-surface-container-low overflow-hidden">
                  <div 
                    className="h-full bg-secondary rounded-full transition-all duration-500 ease-out" 
                    style={{ width: stepMeta[currentStep].width }} 
                  />
                </div>
              </div>
            </div>

            {/* Wizard Questions */}
            <div id="quiz-flow-container">
              {/* STEP 1: Health Goal */}
              {currentStep === 1 && (
                <div className="quiz-step space-y-space-lg animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                      Câu hỏi 1 / 4
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary font-bold">
                      Mục tiêu sức khỏe ưu tiên nhất của bạn hiện tại là gì?
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Lựa chọn đúng đích đến giúp cân chỉnh lượng kháng tinh bột (RS2) tối ưu cho đường tiêu hóa.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                    {/* Goal A */}
                    <div 
                      onClick={() => handleSelectOption('goal', 'blood-sugar')}
                      className={`group relative flex flex-col justify-between p-space-lg rounded-2xl transition-all cursor-pointer border ${
                        answers.goal === 'blood-sugar'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[26px]">vital_signs</span>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed/30 text-on-secondary-container font-label-sm text-[11px] font-semibold">
                          Khuyến nghị GI &lt; 45
                        </span>
                      </div>
                      <div className="space-y-1 mt-space-md">
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Ổn định đường huyết</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Hỗ trợ người tiền tiểu đường, tiểu đường Type 2 kiểm soát đỉnh glucose sau ăn.
                        </p>
                      </div>
                      <div className="mt-space-md flex items-center justify-end">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          answers.goal === 'blood-sugar' ? 'bg-primary text-on-primary' : 'bg-surface-container'
                        }`}>
                          {answers.goal === 'blood-sugar' && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Goal B */}
                    <div 
                      onClick={() => handleSelectOption('goal', 'gut-health')}
                      className={`group relative flex flex-col justify-between p-space-lg rounded-2xl transition-all cursor-pointer border ${
                        answers.goal === 'gut-health'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-secondary-container/60 flex items-center justify-center text-secondary">
                          <span className="material-symbols-outlined text-[26px]">shield_with_heart</span>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-container font-label-sm text-[11px] font-semibold">
                          Tối ưu SCFA Butyrate
                        </span>
                      </div>
                      <div className="space-y-1 mt-space-md">
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Cải thiện tiêu hóa &amp; đại tràng</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Giảm táo bón, đầy chướng bụng, phục hồi niêm mạc ruột và hội chứng ruột kích thích.
                        </p>
                      </div>
                      <div className="mt-space-md flex items-center justify-end">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          answers.goal === 'gut-health' ? 'bg-primary text-on-primary' : 'bg-surface-container'
                        }`}>
                          {answers.goal === 'gut-health' && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Goal C */}
                    <div 
                      onClick={() => handleSelectOption('goal', 'weight-control')}
                      className={`group relative flex flex-col justify-between p-space-lg rounded-2xl transition-all cursor-pointer border ${
                        answers.goal === 'weight-control'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[26px]">scale</span>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[11px] font-semibold">
                          Kích hoạt GLP-1 Tự nhiên
                        </span>
                      </div>
                      <div className="space-y-1 mt-space-md">
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">No lâu &amp; Quản lý cân nặng</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Hỗ trợ chế độ Eat Clean, nhịn ăn gián đoạn IF, ngăn cảm giác thèm ăn vặt quá đà.
                        </p>
                      </div>
                      <div className="mt-space-md flex items-center justify-end">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          answers.goal === 'weight-control' ? 'bg-primary text-on-primary' : 'bg-surface-container'
                        }`}>
                          {answers.goal === 'weight-control' && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Goal D */}
                    <div 
                      onClick={() => handleSelectOption('goal', 'family-breakfast')}
                      className={`group relative flex flex-col justify-between p-space-lg rounded-2xl transition-all cursor-pointer border ${
                        answers.goal === 'family-breakfast'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-space-sm">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-[26px]">wb_sunny</span>
                        </div>
                        <span className="px-space-sm py-0.5 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[11px] font-semibold">
                          Thuần tự nhiên 100%
                        </span>
                      </div>
                      <div className="space-y-1 mt-space-md">
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold">Bữa sáng năng lượng lành mạnh</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Giải pháp dinh dưỡng thực vật thay thế bữa sáng tinh bột tinh chế cho cả gia đình.
                        </p>
                      </div>
                      <div className="mt-space-md flex items-center justify-end">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          answers.goal === 'family-breakfast' ? 'bg-primary text-on-primary' : 'bg-surface-container'
                        }`}>
                          {answers.goal === 'family-breakfast' && (
                            <span className="material-symbols-outlined text-[14px]">check</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Morning Routine */}
              {currentStep === 2 && (
                <div className="quiz-step space-y-space-lg animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                      Câu hỏi 2 / 4
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary font-bold">
                      Thói quen chuẩn bị đồ ăn / thức uống buổi sáng của bạn như thế nào?
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Yếu tố then chốt để đảm bảo thói quen duy trì đều đặn mỗi ngày mà không làm đảo lộn lịch trình của bạn.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    {/* Routine 1 */}
                    <div 
                      onClick={() => handleSelectOption('morning_routine', 'speed')}
                      className={`relative flex flex-col justify-between p-space-lg rounded-2xl cursor-pointer transition-all border ${
                        answers.morning_routine === 'speed'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/40 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[24px]">timer</span>
                          </div>
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            answers.morning_routine === 'speed' ? 'bg-secondary text-on-secondary shadow-xs' : 'bg-surface-container'
                          }`}>
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Rất bận rộn, dưới 3 phút</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Cần dạng gói tiện lợi, chỉ cần xé hòa tan nhanh với nước ấm hoặc lắc cùng shaker là có thể mang theo đi làm.
                        </p>
                      </div>
                      <div className="mt-space-md pt-space-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[16px]">bolt</span>
                        <span className="font-label-sm text-label-sm text-secondary font-bold">Tối ưu cho lối sống năng động</span>
                      </div>
                    </div>

                    {/* Routine 2 */}
                    <div 
                      onClick={() => handleSelectOption('morning_routine', 'smoothie')}
                      className={`relative flex flex-col justify-between p-space-lg rounded-2xl cursor-pointer transition-all border ${
                        answers.morning_routine === 'smoothie'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/40 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[24px]">blender</span>
                          </div>
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            answers.morning_routine === 'smoothie' ? 'bg-secondary text-on-secondary shadow-xs' : 'bg-surface-container'
                          }`}>
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Uống sinh tố / ngũ cốc</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Thường xay sinh tố, ăn kèm sữa chua Hy Lạp, yến mạch ngâm qua đêm (overnight oats) hoặc nước ép xanh.
                        </p>
                      </div>
                      <div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">eco</span>
                        <span className="font-label-sm text-label-sm">Kết hợp công thức Eat Clean</span>
                      </div>
                    </div>

                    {/* Routine 3 */}
                    <div 
                      onClick={() => handleSelectOption('morning_routine', 'bakery')}
                      className={`relative flex flex-col justify-between p-space-lg rounded-2xl cursor-pointer transition-all border ${
                        answers.morning_routine === 'bakery'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/40 hover:bg-surface-container-lowest hover:shadow-md border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-space-md">
                          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined text-[24px]">cookie</span>
                          </div>
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center ${
                            answers.morning_routine === 'bakery' ? 'bg-secondary text-on-secondary shadow-xs' : 'bg-surface-container'
                          }`}>
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Bánh thực dưỡng ăn liền</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Thích nhâm nhi đồ ăn nhẹ giòn xốp kèm một tách trà/cà phê, ưu tiên đồ không cần pha chế chất lỏng.
                        </p>
                      </div>
                      <div className="mt-space-md pt-space-sm flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px]">bakery_dining</span>
                        <span className="font-label-sm text-label-sm">Tiện dụng văn phòng</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Prior Experience with Resistant Starch */}
              {currentStep === 3 && (
                <div className="quiz-step space-y-space-lg animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                      Câu hỏi 3 / 4
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary font-bold">
                      Bạn đã từng sử dụng tinh bột kháng (Resistant Starch RS2) trước đây chưa?
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Giúp chuyên gia dinh dưỡng gợi ý liều lượng khởi đầu nhằm thích ứng màng sinh học vi khuẩn đường ruột an toàn.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div 
                      onClick={() => handleSelectOption('rs_experience', 'new')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.rs_experience === 'new'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-space-md text-primary">
                          <span className="material-symbols-outlined text-[20px]">help_outline</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Chưa từng nghe qua</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Đây là lần đầu tiên tôi tìm hiểu về tác dụng của tinh bột kháng tự nhiên.
                        </p>
                      </div>
                      <span className="mt-space-md text-secondary font-label-sm text-label-sm font-semibold">
                        Khuyến nghị lộ trình làm quen 7 ngày
                      </span>
                    </div>

                    <div 
                      onClick={() => handleSelectOption('rs_experience', 'known')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.rs_experience === 'known'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-space-md text-primary">
                          <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Đã biết nhưng chưa thử</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Đã đọc sách báo/nghiên cứu khoa học nhưng chưa tìm được nguồn nguyên liệu tự nhiên chuẩn.
                        </p>
                      </div>
                      <span className="mt-space-md text-secondary font-label-sm text-label-sm font-semibold">
                        Bắt đầu với liều tiêu chuẩn 15g/ngày
                      </span>
                    </div>

                    <div 
                      onClick={() => handleSelectOption('rs_experience', 'experienced')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.rs_experience === 'experienced'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center mb-space-md text-primary">
                          <span className="material-symbols-outlined text-[20px]">task_alt</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Đang dùng thường xuyên</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Đã bổ sung các dòng prebiotic hoặc khoai tây nguội, chuối sấy định kỳ.
                        </p>
                      </div>
                      <span className="mt-space-md text-secondary font-label-sm text-label-sm font-semibold">
                        Tăng cường liều bảo vệ 30g/ngày
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Gut Sensitivity */}
              {currentStep === 4 && (
                <div className="quiz-step space-y-space-lg animate-in fade-in duration-300">
                  <div className="space-y-1">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary font-bold">
                      Câu hỏi 4 / 4
                    </span>
                    <h2 className="font-headline-md text-headline-md text-primary font-bold">
                      Mức độ nhạy cảm của hệ tiêu hóa bạn khi ăn đồ lạ hoặc stress?
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Đánh giá sự đa dạng của hệ vi sinh khuẩn kỵ khí đại tràng để cá nhân hóa chỉ dẫn uống nóng/lạnh.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                    <div 
                      onClick={() => handleSelectOption('sensitivity', 'normal')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.sensitivity === 'normal'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-secondary-container/60 text-secondary flex items-center justify-center mb-space-md">
                          <span className="material-symbols-outlined text-[20px]">sentiment_satisfied</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Bình thường, ổn định</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Hiếm khi đau bụng hay dị ứng thực phẩm thông thường.
                        </p>
                      </div>
                      <span className="mt-space-md text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        Thích hợp mọi cách pha
                      </span>
                    </div>

                    <div 
                      onClick={() => handleSelectOption('sensitivity', 'bloating')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.sensitivity === 'bloating'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-space-md">
                          <span className="material-symbols-outlined text-[20px]">air</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Dễ đầy hơi chướng bụng</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Bụng ậm ạch, nhiều khí gas sau khi dùng sữa tươi hoặc thức ăn nhiều dầu mỡ.
                        </p>
                      </div>
                      <span className="mt-space-md text-secondary font-label-sm text-label-sm font-semibold">
                        Khuyến nghị pha nước ấm &lt; 50°C
                      </span>
                    </div>

                    <div 
                      onClick={() => handleSelectOption('sensitivity', 'ibs')}
                      className={`p-space-lg rounded-2xl cursor-pointer flex flex-col justify-between border transition-all ${
                        answers.sensitivity === 'ibs'
                          ? 'bg-secondary-container/20 border-secondary shadow-md ring-1 ring-secondary'
                          : 'bg-surface-container-low/50 hover:bg-surface-container-lowest border-surface-container'
                      }`}
                    >
                      <div>
                        <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mb-space-md">
                          <span className="material-symbols-outlined text-[20px]">warning_amber</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-1 font-bold">Dễ rối loạn khi stress</h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Có dấu hiệu ruột kích thích, đi ngoài nhiều lần khi lo âu hoặc dậy sớm.
                        </p>
                      </div>
                      <span className="mt-space-md text-secondary font-label-sm text-label-sm font-semibold">
                        Cần bổ sung liều chia nhỏ 1/2 gói
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Wizard Action Bottom Row */}
            <div className="mt-space-xl pt-space-lg border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-md">
              <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm">
                <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
                <span>Kết quả bảo mật &amp; không yêu cầu đăng ký rườm rà</span>
              </div>
              <div className="flex items-center gap-space-sm w-full sm:w-auto">
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full sm:w-auto px-space-xl py-3.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <span>{currentStep === totalSteps ? 'Hoàn tất & Nhận phác đồ' : 'Tiếp tục bước kế tiếp'}</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Step Navigator Pills */}
          <div className="flex flex-wrap items-center justify-center gap-space-xs mt-space-md">
            <button 
              type="button"
              onClick={() => goToStep(1)}
              className={`px-3 py-1 rounded-full text-[11px] font-label-sm transition-all ${
                currentStep === 1 ? 'bg-primary text-on-primary font-bold shadow-xs' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              1. Mục tiêu
            </button>
            <button 
              type="button"
              onClick={() => goToStep(2)}
              className={`px-3 py-1 rounded-full text-[11px] font-label-sm transition-all ${
                currentStep === 2 ? 'bg-primary text-on-primary font-bold shadow-xs' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              2. Thói quen
            </button>
            <button 
              type="button"
              onClick={() => goToStep(3)}
              className={`px-3 py-1 rounded-full text-[11px] font-label-sm transition-all ${
                currentStep === 3 ? 'bg-primary text-on-primary font-bold shadow-xs' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              3. Kinh nghiệm RS
            </button>
            <button 
              type="button"
              onClick={() => goToStep(4)}
              className={`px-3 py-1 rounded-full text-[11px] font-label-sm transition-all ${
                currentStep === 4 ? 'bg-primary text-on-primary font-bold shadow-xs' : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              4. Cơ địa
            </button>
            <button 
              type="button"
              onClick={() => setShowResult(true)}
              className="px-3 py-1 rounded-full text-[11px] font-label-sm transition-all bg-secondary-container text-on-secondary-container hover:bg-secondary-fixed font-bold flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
              <span>Xem kết quả phân tích</span>
            </button>
          </div>

          {/* RESULT SECTION */}
          {showResult && (
            <div className="mt-space-xl space-y-space-lg transition-all duration-500 animate-in fade-in slide-in-from-bottom-6">
              {/* Header Banner: Celebration & Analysis Badge */}
              <div className="rounded-3xl bg-primary text-on-primary p-space-lg md:p-space-xl relative overflow-hidden shadow-lg border border-primary-container">
                <div className="absolute -right-8 -bottom-8 w-60 h-60 rounded-full bg-secondary-container/10 blur-2xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md">
                  <div className="space-y-space-xs">
                    <div className="inline-flex items-center gap-2 px-space-md py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm shadow-xs font-bold">
                      <span className="material-symbols-outlined text-[16px]">celebration</span>
                      <span>Phân tích hoàn tất trong 45 giây</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg font-bold text-on-primary">
                      Hồ Sơ Hệ Vi Sinh &amp; Lộ Trình Đề Xuất Cá Nhân Hóa
                    </h2>
                    <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                      Dựa trên thói quen buổi sáng và nhu cầu cân bằng tiêu hóa của bạn, đây là phác đồ dinh dưỡng kháng tinh bột phù hợp nhất.
                    </p>
                  </div>
                  <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between bg-primary-container/80 p-space-md rounded-2xl border border-primary-fixed/20">
                    <span className="font-label-sm text-label-sm text-secondary-fixed uppercase font-bold">Độ tương thích</span>
                    <span className="font-display-lg-mobile text-display-lg-mobile font-extrabold text-secondary-fixed">
                      98.4%
                    </span>
                    <span className="font-label-sm text-label-sm text-on-primary-container">Chỉ số sinh khả dụng cao</span>
                  </div>
                </div>
              </div>

              {/* Two Column Bento Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                {/* Left Column (5 cols): Biological Gut Insight & Dosage Stepper */}
                <div className="lg:col-span-5 space-y-space-md flex flex-col">
                  {/* Health Insight Box */}
                  <div className="p-space-lg rounded-3xl bg-surface-container-lowest shadow-md space-y-space-md flex-1 border border-surface-container">
                    <div className="flex items-center gap-space-sm text-primary">
                      <div className="w-10 h-10 rounded-xl bg-secondary-container/40 flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[22px]">analytics</span>
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-headline-sm font-bold">Phân Tích Thể Trạng Vi Sinh</h3>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">Microbiome Biomarker Alert</span>
                      </div>
                    </div>
                    <p className="font-body-md text-body-md text-on-surface leading-relaxed">
                      Hệ vi sinh đường ruột của bạn đang thiếu hụt nguồn <strong className="text-primary font-semibold">cơ chất lên men kỵ khí</strong> do chế độ ăn sáng tinh bột tinh chế hấp thu quá nhanh. Bổ sung kháng tinh bột <strong className="text-secondary font-semibold">RS2 tự nhiên từ chuối xanh Gia Lai</strong> sẽ giúp:
                    </p>
                    <div className="space-y-space-sm pt-space-xs font-body-sm text-body-sm text-on-surface-variant">
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">check_circle</span>
                        <span><strong>Kích hoạt Butyrate tự nhiên:</strong> Nuôi dưỡng trực tiếp tế bào biểu mô đại tràng, giảm viêm vi thể và phục hồi niêm mạc ruột.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">check_circle</span>
                        <span><strong>Kéo dài cảm giác no sinh học:</strong> Thúc đẩy giải phóng hormone no GLP-1 &amp; PYY tự thân mà không gây tăng đường huyết đột biến.</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">check_circle</span>
                        <span><strong>Hạn chế tối đa chứng đầy hơi:</strong> Tốc độ lên men chậm đặc trưng của RS2 Banova giúp khí gas sinh ra phân tán êm dịu.</span>
                      </div>
                    </div>
                  </div>

                  {/* Personalized Dosage Stepper */}
                  <div className="p-space-lg rounded-3xl bg-surface-container-low/60 shadow-xs space-y-space-sm border border-surface-container">
                    <h4 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2 font-bold">
                      <span className="material-symbols-outlined text-secondary text-[20px]">schedule</span>
                      <span>Lộ trình uống 3 bước cho bạn</span>
                    </h4>
                    <div className="space-y-space-sm pt-space-xs">
                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                          1
                        </div>
                        <div>
                          <span className="font-label-lg text-label-lg text-primary block font-bold">Tuần đầu làm quen:</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Uống 1/2 liều (7.5g) hòa cùng 150ml nước ấm dưới 50°C vào buổi sáng.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                          2
                        </div>
                        <div>
                          <span className="font-label-lg text-label-lg text-primary block font-bold">Tuần 2 trở đi (Chuẩn hóa):</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Dùng trọn vẹn 1 khẩu phần (15g), có thể lắc nhanh cùng sữa chua hoặc sinh tố.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-space-sm">
                        <div className="w-6 h-6 rounded-full bg-surface-variant text-on-surface flex items-center justify-center font-label-sm text-label-sm font-bold shrink-0 mt-0.5">
                          3
                        </div>
                        <div>
                          <span className="font-label-lg text-label-lg text-primary block font-bold">Ghi nhận tiến trình:</span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">Bụng êm ái, đại tràng hoạt động nhẹ nhàng, tinh thần tỉnh táo sau 10 - 14 ngày.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column (7 cols): Recommended Product Card */}
                <div className="lg:col-span-7 flex flex-col justify-between p-space-lg md:p-space-xl rounded-3xl bg-surface-container-lowest shadow-xl relative overflow-hidden border border-surface-container">
                  {/* Best Match Ribbon */}
                  <div className="flex items-center justify-between gap-2 pb-space-md border-b border-surface-container">
                    <span className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[14px]">stars</span>
                      Sản phẩm gợi ý tối ưu nhất
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
                      Chứng nhận OCOP 4 Sao • Gia Lai
                    </span>
                  </div>

                  {/* Product Visual + Meta */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-space-md items-center py-space-md">
                    <div className="sm:col-span-5 relative flex items-center justify-center p-space-md rounded-2xl bg-surface-container-low/50 border border-surface-container">
                      <img 
                        className="w-full h-48 sm:h-52 object-contain transition-transform hover:scale-105 duration-300" 
                        alt={recommendedProduct.name} 
                        src={recommendedProduct.image} 
                      />
                      <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-primary-container text-on-primary font-label-sm text-[10px] uppercase font-bold tracking-wider">
                        Chuối xanh nguyên chất
                      </div>
                    </div>

                    <div className="sm:col-span-7 space-y-space-xs">
                      <h3 className="font-headline-md text-headline-md text-primary font-bold">
                        {recommendedProduct.name}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {recommendedProduct.description}
                      </p>
                      {/* Micro Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="px-2.5 py-1 rounded-lg bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm font-semibold">
                          {recommendedProduct.rsTag}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Không Đường Bổ Sung
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Thuần Tự Nhiên 100%
                        </span>
                      </div>
                      <div className="pt-space-xs flex items-baseline gap-space-sm">
                        <span className="font-headline-lg text-headline-lg font-extrabold text-primary">
                          {recommendedProduct.formattedPrice}
                        </span>
                        <span className="font-body-sm text-body-sm text-outline line-through">
                          {recommendedProduct.originalPrice}
                        </span>
                        <span className="font-label-sm text-label-sm text-error font-bold">
                          {recommendedProduct.discountBadge}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Why Fits You Callout */}
                  <div className="p-space-md rounded-2xl bg-secondary-container/20 space-y-1 mb-space-md border border-secondary-container/30">
                    <div className="flex items-center gap-2 text-primary font-label-lg text-label-lg font-bold">
                      <span className="material-symbols-outlined text-secondary text-[18px]">psychology</span>
                      <span>Tại sao sản phẩm này là lựa chọn số 1 của bạn?</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {recommendedProduct.whyFitText}
                    </p>
                  </div>

                  {/* Actions & Vouchers */}
                  <div className="space-y-space-sm pt-space-xs">
                    {/* Free perk banner */}
                    <div className="p-space-sm rounded-xl bg-surface-container flex items-center justify-between gap-space-sm border border-surface-container/60">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-[18px]">card_giftcard</span>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          Tặng Ebook: "Cẩm nang 14 ngày phục hồi hệ vi sinh &amp; đại tràng" (PDF)
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-bold shrink-0">
                        MIỄN PHÍ
                      </span>
                    </div>

                    {/* Button CTAs */}
                    <div className="flex flex-col sm:flex-row items-center gap-space-sm pt-space-xs">
                      <button 
                        type="button"
                        onClick={() => onAddToCart(recommendedProduct)}
                        className="w-full sm:flex-1 py-3.5 px-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                      >
                        <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                        <span>Thêm Vào Giỏ Hàng ({recommendedProduct.formattedPrice})</span>
                      </button>
                      <a 
                        className="w-full sm:w-auto py-3.5 px-space-md rounded-xl bg-surface-container text-primary font-label-lg text-label-lg font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 shrink-0 border border-surface-container-high" 
                        href="https://zalo.me" 
                        target="_blank" 
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined text-[18px]">chat</span>
                        <span>Dược sĩ tư vấn Zalo</span>
                      </a>
                    </div>

                    {/* Retake */}
                    <div className="text-center pt-space-xs">
                      <button 
                        type="button"
                        onClick={restartQuiz}
                        className="text-on-surface-variant hover:text-primary transition-colors font-label-sm text-label-sm underline inline-flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-[14px]">restart_alt</span>
                        <span>Làm lại bài khảo sát với mục tiêu khác</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Clinical Disclaimer Callout */}
          <div className="mt-space-lg p-space-md rounded-2xl bg-surface-container-low/50 text-on-surface-variant flex items-center gap-space-sm shadow-xs border border-surface-container">
            <span className="material-symbols-outlined text-outline text-[22px] shrink-0">info</span>
            <p className="font-body-sm text-body-sm leading-relaxed">
              <strong className="text-primary font-semibold">Khuyến cáo y sinh:</strong> Kết quả trắc nghiệm và gợi ý khẩu phần được phát triển dựa trên nguyên lý vi sinh học đường ruột thực nghiệm của tinh bột kháng RS2. Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
