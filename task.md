# BANOVA — DANH SÁCH TASK FRONTEND (NGƯỜI 1: FE KHÁCH HÀNG)

> **Người thực hiện**: FE Developer (Bạn)**Phạm vi sở hữu**: Toàn bộ giao diện khách hàng (`src/app/(public)/**`, `src/components/**`, `src/store/**`, `src/hooks/**`)**Nguyên tắc vàng**:
>
> 1. **Chỉ làm UI & Client State** — Tuyệt đối **KHÔNG chạm Prisma**, không viết query DB.
> 2. **Dùng mock data trước**: Không chờ BE xong API; dựng UI bằng mock, khi BE xong chỉ việc trỏ API URL.
> 3. **Tuân thủ pháp lý y tế**: **CẤM** dùng các từ *"chữa"*, *"điều trị"*, *"thay thuốc"*, *"đặc trị"*. Bắt buộc có **Medical Disclaimer** ở Footer, Chi tiết sản phẩm và Chân bài viết.
> 4. **Nhánh Git làm việc**: `dev1` hoặc nhánh tính năng `feat/fe-<tên-tính-năng>`.

---

## 📅 LỘ TRÌNH THỰC HIỆN 5 NGÀY

```
[T6 16/10] Khung dự án + Layout chung + Trang chủ (Mock)
   │
[T7 17/10] Danh mục + Chi tiết sản phẩm + Góc khoa học/Blog (Nối API thật)
   │
[CN 18/10] Quiz tư vấn + Trang FAQ + Trang Liên hệ
   │
[T2 19/10] Giỏ hàng (Zustand) + Trang Đặt hàng (Nối Order API)
   │
[T3 20/10] SEO (Meta/OG/Sitemap) + Responsive Mobile + Rà soát Disclaimer + Polish UX
   │
[T4 21/10] Tổng duyệt Demo (Rehearse) — Khóa code, không thêm tính năng
```

---

## 🛠️ CHI TIẾT TASK THEO TỪNG GIAI ĐOẠN

### GIAI ĐOẠN 1: KHỞI TẠO KHUNG & COMPONENT DÙNG CHUNG (T6 - 16/10)

- [ ] **1.1. Cấu hình & Design System**

  - [ ] Thiết lập Tailwind CSS, bảng màu nhận diện thương hiệu Banova (tone xanh tự nhiên của chuối / đất / sức khỏe).
  - [ ] Cài đặt các component cơ bản từ `shadcn/ui` (Button, Card, Badge, Dialog, Input, Skeleton, Toast/Sonner).
  - [ ] Cài đặt thư viện icon: `lucide-react`.
- [ ] **1.2. Layout nền tảng (`src/components/layout/**`)**

  - [ ] `Header.tsx` & `Navbar.tsx`: Logo Banova, Menu điều hướng (Trang chủ, Sản phẩm, Góc khoa học, Quiz, Liên hệ), Icon giỏ hàng có Badge đếm số lượng.
  - [ ] `MobileNav.tsx`: Drawer / Hamburger menu trượt mượt mà trên mobile.
  - [ ] `Footer.tsx`: Thông tin thương hiệu, liên kết nhanh, form đăng ký nhận tin (Newsletter), bản quyền.
  - [ ] `MedicalDisclaimer.tsx`: Component cảnh báo y tế chuẩn mực (*"Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh..."*).
- [ ] **1.3. Trang chủ (`src/app/(public)/page.tsx`) - Dùng dữ liệu Mock**

  - [ ] **Hero Section**: Slogan cuốn hút, hình ảnh sản phẩm từ chuối xanh Gia Lai, nút CTA "Khám phá ngay" và "Làm Quiz tư vấn".
  - [ ] **Khối Khoa học Tinh bột kháng (RS Overview)**: Giải thích dễ hiểu RS2, RS3, so sánh chỉ số GI thấp.
  - [ ] **Khối Sản phẩm nổi bật (Featured Products)**: Hiển thị 4 SKU tiêu biểu kèm nút "Thêm vào giỏ".
  - [ ] **Khối Lợi ích sức khỏe (Health Benefits)**: Đường ruột khỏe mạnh, no lâu, kiểm soát đường huyết.
  - [ ] **Khối Banner Quiz**: Kêu gọi người dùng làm bài kiểm tra nhanh 1 phút.
  - [ ] **Khối Đánh giá / Feedback & Cam kết**: Đánh giá từ khách hàng mẫu và chứng nhận xuất xứ.

---

### GIAI ĐOẠN 2: SẢN PHẨM & GÓC KHOA HỌC (T7 - 17/10)

- [ ] **2.1. Danh sách sản phẩm (`/san-pham`)**

  - [ ] `ProductCard.tsx`: Ảnh sản phẩm, tên, danh mục, giá tiền (VND), badge hàm lượng RS (`5.8g RS/khẩu phần`), nút thêm nhanh vào giỏ.
  - [ ] `ProductFilters.tsx`: Lọc theo danh mục (Bột, Bánh, Bữa sáng, Hộp quà), thanh tìm kiếm từ khóa, chọn sắp xếp (Mới nhất, Giá tăng/giảm).
  - [ ] `ProductGrid.tsx` & Phân trang (Pagination).
  - [ ] **Nối API**: `GET /api/products` và `GET /api/categories`.
- [ ] **2.2. Chi tiết sản phẩm (`/san-pham/[slug]`)**

  - [ ] Thư viện ảnh sản phẩm (Image Gallery / Thumbnails).
  - [ ] Thông tin chính: Tên, danh mục, giá, quy cách đóng gói (hũ/gói/ổ/hộp), kích cỡ khẩu phần (`servingSize`).
  - [ ] **Bảng thông số khoa học (Nutrition Card)**:
    - Hàm lượng RS: `rsContent` (gam/khẩu phần) & loại `rsType` (RS2 / RS3).
    - Chỉ số đường huyết: `gi`.
    - Chất xơ: `fiber`.
  - [ ] Khối nội dung chi tiết: Thành phần (`ingredients`), Hướng dẫn sử dụng (`usage`).
  - [ ] Bộ chọn số lượng (Quantity Selector) + Nút "Thêm vào giỏ hàng" + Nút "Mua ngay".
  - [ ] **Gắn `MedicalDisclaimer` bắt buộc ở chân trang chi tiết sản phẩm**.
  - [ ] **Nối API**: `GET /api/products/[slug]`.
- [x] **2.3. Góc Khoa học & Blog (`/khoa-hoc`)**

  - [x] Tab chuyển đổi giữa **Khoa học (SCIENCE)** và **Lối sống/Blog (BLOG)** kèm bộ đếm số lượng.
  - [x] Tìm kiếm thời gian thực & bộ lọc hot tags `#TieuDuong`, `#IBS`, `#ResistantStarch`, `#CongThucSmoothie`.
  - [x] `ArticleCard.tsx`: Thumbnail, tiêu đề, tóm tắt (`excerpt`), tác giả, ngày đăng, thời gian đọc.
  - [x] Bài viết nổi bật (Featured Hero Article) với badge kiểm chứng y sinh và chỉ số kháng Amylase.
  - [x] Hộp đăng ký bản tin y sinh định kỳ (Newsletter) theo vai trò độc giả.
  - [ ] **Nối API**: `GET /api/articles?type=SCIENCE`.
- [x] **2.4. Chi tiết bài viết (`/khoa-hoc/[slug]`)**

  - [x] Thanh tiến trình đọc (Reading Progress Bar) bám theo độ cuộn trang.
  - [x] Mục lục bài viết Sticky (Table of Contents) và bộ công cụ chia sẻ, sao chép liên kết, tải PDF.
  - [x] Trình bày nội dung bài viết định dạng chuẩn y khoa: Mô phỏng chuỗi tinh thể Amylose, bảng đối chiếu sinh hóa với cơm trắng.
  - [x] **Khối Nguồn trích dẫn (References)**: Trích lục 4 công trình nghiên cứu bình duyệt quốc tế & Bộ Y Tế (NFR-09).
  - [x] **Gắn `MedicalDisclaimer` bắt buộc ở cuối bài viết**.
  - [x] Khối sản phẩm tham chiếu trong nghiên cứu kèm nút "Thêm vào giỏ hàng" trực tiếp.
  - [ ] **Nối API**: `GET /api/articles/[slug]`.

---

### GIAI ĐOẠN 3: QUIZ TƯ VẤN, FAQ & LIÊN HỆ (CN - 18/10)

- [x] **3.1. Quiz tư vấn sức khỏe (`/quiz`)**

  - [x] `QuizStep.tsx`: Bộ câu hỏi tương tác mượt mà (4 câu: Mục tiêu sức khỏe, Thói quen ăn sáng, Mức độ làm quen RS2, Độ nhạy cảm tiêu hóa).
  - [x] Thanh tiến trình làm quiz (Progress Bar 25% -> 100%) & hiệu ứng chuyển câu hỏi.
  - [x] `QuizResult.tsx`: Màn hình kết quả sau khi nộp:
    - Lời khuyên cá nhân hóa & tỷ lệ phù hợp y sinh.
    - Sản phẩm được đề xuất riêng (`recommendedProduct`).
    - Nút CTA "Thêm lộ trình gợi ý vào giỏ".
  - [ ] **Nối API**: `POST /api/quiz/submit` với payload `{ answers: [...] }`.
- [ ] **3.2. Trang Hỏi đáp thường gặp (`/faq`)**

  - [ ] Accordion hiển thị các câu hỏi phổ biến: Tinh bột kháng là gì? Ai nên dùng? Dùng vào thời điểm nào tốt nhất? Chính sách giao hàng Quy Nhơn.
- [ ] **3.3. Trang Liên hệ (`/lien-he`)**

  - [ ] Form liên hệ: Họ tên, Email, Số điện thoại, Nội dung tin nhắn.
  - [ ] Thông tin văn phòng/showroom tại Quy Nhơn + Bản đồ Google Maps nhúng.
  - [ ] **Nối API**: `POST /api/contact`.
- [ ] **3.4. Form Đăng ký nhận tin (Footer Newsletter)**

  - [ ] Validate email hợp lệ, xử lý trạng thái gửi thành công / trùng email (`409 CONFLICT`).
  - [ ] **Nối API**: `POST /api/newsletter`.

---

### GIAI ĐOẠN 4: GIỎ HÀNG & ĐẶT HÀNG MÔ PHỎNG (T2 - 19/10) ★ TRỌNG ĐIỂM

- [x] **4.1. Quản lý trạng thái Giỏ hàng (`src/store/cart-store.ts` / App Context)**

  - [x] Quản lý state giỏ hàng liên thông trên toàn bộ ứng dụng.
  - [x] Các hành động:
    - `addItem(product, quantity)`
    - `removeItem(productId)`
    - `updateQuantity(productId, quantity)`
    - `clearCart()`
    - `resetDemoCart()`
    - `getTotalItems()` & `getSubTotal()` (hiển thị badge đếm số lượng trên Header và tổng tiền).
- [x] **4.2. Trang Giỏ hàng (`/gio-hang`)**

  - [x] Bảng danh sách các sản phẩm đã chọn: Ảnh sản phẩm, Tên, Đơn giá, Stepper tăng giảm số lượng [- 1 +], Thành tiền từng món, Nút xóa món.
  - [x] Khối tóm tắt đơn hàng Sticky: Tạm tính, Phí giao hàng (Freeship tài trợ 100%), Nhập mã voucher khuyến mãi (`BANOVAQUI`, `FREESHIP`), Thuế VAT y sinh.
  - [x] Nút "Chuyển sang điền thông tin" dẫn sang Bước 2 đặt hàng.
  - [x] Xử lý trạng thái Giỏ hàng rỗng (Empty State) kèm nút "Khôi phục giỏ hàng mẫu" và "Xem danh mục sản phẩm".
- [x] **4.3. Trang Đặt hàng mô phỏng (`/dat-hang`) - Guest Checkout**

  - [x] Form thông tin giao hàng nhanh: Họ và tên (*), Số điện thoại (*), Email nhận hóa đơn VAT, Địa chỉ chi tiết (*), Ghi chú giao hàng.
  - [x] Chọn phương thức thanh toán: `Thanh toán mô phỏng tức thì (Demo Instant)`, `COD đồng kiểm`, `VietQR Napas 24/7`.
  - [x] Quy tắc bảo mật y sinh: Guest checkout không bắt buộc đăng ký tài khoản, mã hóa SSL 256-bit.
  - [ ] **Nối API**: `POST /api/orders`.
- [x] **4.4. Trang Xác nhận đơn hàng thành công (`/dat-hang/thanh-cong` hoặc Step 3)**

  - [x] Sau khi bấm đặt hàng: Tự động tạo Mã vận đơn y sinh độc nhất (ví dụ: `BNV-20261019-xxx`).
  - [x] Hiển thị quy trình 4 giai đoạn điều phối đơn hàng chuẩn y sinh: Vừa xong -> Dược sĩ thẩm định & đóng gói -> Giao hàng hỏa tốc (2h Quy Nhơn/24-48h toàn quốc) -> Dược sĩ đồng hành 1:1.
  - [x] Thẻ thông tin nhận hàng, phương thức thanh toán đã đối soát sandbox, chi tiết sản phẩm và quà tặng kèm.
  - [x] Nút in biên nhận đơn hàng (`window.print()`), nút chat Zalo với Dược sĩ lâm sàng, nút tải PDF cẩm nang 14 ngày.
  - [ ] Badge trạng thái đơn: `Chờ xử lý (PENDING)`.
  - [ ] **Nối API**: `GET /api/orders/[orderCode]`.

---

### GIAI ĐOẠN 5: TỐI ƯU SEO, RESPONSIVE & POLISH UX (T3 - 20/10)

- [ ] **5.1. Tối ưu SEO & Meta Tags**

  - [ ] Cấu hình Metadata chuẩn trong `layout.tsx` và từng trang con (Title, Meta Description, OpenGraph Image).
  - [ ] Cấu hình `sitemap.ts` và `robots.ts`.
  - [ ] Đảm bảo 100% thẻ `<Image>` có `alt` rõ nghĩa.
- [ ] **5.2. Kiểm tra Responsive & Trải nghiệm người dùng**

  - [ ] Test toàn diện giao diện trên các kích thước màn hình: Mobile (iPhone/Android), Tablet (iPad), Laptop/Desktop.
  - [ ] Kiểm tra trạng thái tải dữ liệu (Loading Skeletons) khi chờ gọi API.
  - [ ] Bắt lỗi thân thiện (Empty state, 404 Not Found, Error Boundary).
  - [ ] Thông báo Toast sinh động khi: Thêm giỏ hàng thành công, gửi liên hệ thành công.
- [ ] **5.3. Rà soát Pháp lý Y tế lần cuối**

  - [ ] Quét toàn bộ text trên UI: Tuyệt đối không còn sót từ *"chữa bệnh"*, *"điều trị"*, *"thay thuốc"*.
  - [ ] Đảm bảo `MedicalDisclaimer` xuất hiện đúng ở: Footer, Chi tiết sản phẩm, Chân bài viết khoa học.

---

### GIAI ĐOẠN 6: REHEARSE DEMO (T4 - 21/10)

- [ ] Khóa code (Code Freeze), không thêm tính năng mới.
- [ ] Chạy thử kịch bản demo cùng Người 2 và Người 3:
  1. Vào Trang chủ ➔ Xem các khối khoa học và sản phẩm.
  2. Bấm vào Sản phẩm ➔ Xem bảng hàm lượng RS ➔ Thêm vào giỏ.
  3. Vào làm Quiz ➔ Nhận sản phẩm gợi ý ➔ Bấm thêm vào giỏ.
  4. Mở Giỏ hàng ➔ Điền form đặt hàng ➔ Nhận mã đơn `BNV-...`.
  5. Xem Admin (Người 3) cập nhật trạng thái đơn sang `Đã xác nhận`.
  6. Xem Admin đăng bài viết mới ➔ Khách hàng F5 trang `/khoa-hoc` thấy bài xuất hiện ngay.

---

## 📋 BẢNG THEO DÕI ENDPOINT API CỦA FE

| Trang FE sử dụng        | Method   | Endpoint                    | Trạng thái API | Dữ liệu gửi đi                                               |
| ------------------------- | -------- | --------------------------- | ---------------- | ---------------------------------------------------------------- |
| Trang chủ, Danh sách SP | `GET`  | `/api/products`           | ⏳ Chờ BE       | Query: `page`, `pageSize`, `category`, `q`, `sort`     |
| Bộ lọc sản phẩm       | `GET`  | `/api/categories`         | ⏳ Chờ BE       | Không                                                           |
| Chi tiết sản phẩm      | `GET`  | `/api/products/[slug]`    | ⏳ Chờ BE       | Slug trên URL                                                   |
| Trang bài viết          | `GET`  | `/api/articles`           | ⏳ Chờ BE       | Query: `type`, `page`, `q`                                 |
| Chi tiết bài viết      | `GET`  | `/api/articles/[slug]`    | ⏳ Chờ BE       | Slug trên URL                                                   |
| Trang Quiz                | `POST` | `/api/quiz/submit`        | ⏳ Chờ BE       | Body: `{ answers: [...] }`                                     |
| Trang Liên hệ           | `POST` | `/api/contact`            | ⏳ Chờ BE       | Body: `{ name, email, phone, message }`                        |
| Footer                    | `POST` | `/api/newsletter`         | ⏳ Chờ BE       | Body: `{ email }`                                              |
| Đặt hàng               | `POST` | `/api/orders`             | ⏳ Chờ BE       | Body: `{ customerName, phone, address, items, paymentMethod }` |
| Xem lại đơn hàng      | `GET`  | `/api/orders/[orderCode]` | ⏳ Chờ BE       | Mã đơn trên URL                                              |

---

## ✅ TIÊU CHUẨN HOÀN THÀNH (DEFINITION OF DONE CHO MỖI TASK)

- [ ] Không có lỗi runtime đỏ ở Console trình duyệt.
- [ ] Chạy mượt mà trên Mobile (độ rộng 375px) và Desktop (1440px).
- [ ] Giao diện hiện đại, hình ảnh không bị méo/bể vỡ, chữ đọc rõ ràng.
- [ ] `npm run lint` và `npm run build` vượt qua 100% không báo lỗi.
