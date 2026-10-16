# BANOVA — TÀI LIỆU YÊU CẦU DỰ ÁN (PROJECT REQUIREMENTS)

> **Dự án**: Website Thương mại & Truyền thông Dinh dưỡng **Banova**  
> **Thời gian thực hiện**: 16/10/2026 – 21/10/2026 (Chạy nước rút 5 ngày)  
> **Mục tiêu**: Demo hoàn chỉnh luồng nghiệp vụ end-to-end vào Thứ 4, 21/10/2026  
> **Phiên bản tài liệu**: 1.0  

---

## 1. TỔNG QUAN DỰ ÁN & BÀI TOÁN KINH DOANH

### 1.1. Định vị thương hiệu & Sản phẩm
- **Thương hiệu**: **Banova** — Tiên phong trong giải pháp dinh dưỡng từ **Tinh bột kháng (Resistant Starch - RS)** tự nhiên chiết xuất từ chuối xanh Gia Lai.
- **Giá trị cốt lõi**:
  - Dinh dưỡng dựa trên cơ sở khoa học (Evidence-based Nutrition).
  - Kiểm soát đường huyết, hỗ trợ hệ vi sinh đường ruột (Prebiotic), kéo dài cảm giác no tự nhiên.
  - Tận dụng nguồn nông sản bản địa chất lượng cao của Việt Nam.
- **Thị trường mục tiêu**: 
  - Người tiền đái tháo đường, đái tháo đường cần kiểm soát chỉ số GI.
  - Người gặp vấn đề tiêu hóa (đại tràng, táo bón, hội chứng ruột kích thích IBS).
  - Người theo đuổi lối sống lành mạnh, eat clean, kiểm soát cân nặng.
  - Thị trường triển khai bước đầu: TP. Quy Nhơn và mở rộng toàn quốc qua kênh trực tuyến.

### 1.2. Danh mục sản phẩm (4 Nhóm - 8 SKU mẫu)
1. **Nhóm Bột tinh bột kháng**:
   - Bột tinh bột kháng Banova 250g (89.000 VNĐ - 5.8g RS/khẩu phần).
   - Bột tinh bột kháng Banova 500g (159.000 VNĐ - 5.8g RS/khẩu phần).
   - Bột Banova hộp 10 gói tiện lợi 15g (69.000 VNĐ - 5.8g RS/khẩu phần).
2. **Nhóm Bánh dinh dưỡng**:
   - Bánh mì nguyên cám Banova (39.000 VNĐ/ổ - 4.2g RS).
   - Muffin chuối yến mạch (25.000 VNĐ/cái - 3.5g RS).
   - Cookie hạt ít đường 200g (69.000 VNĐ/hộp - 2.8g RS).
3. **Nhóm Bữa sáng tiện lợi**:
   - Hộp bữa sáng dinh dưỡng Banova (49.000 VNĐ/hộp).
4. **Nhóm Hộp quà tặng**:
   - Hộp quà sức khỏe Quy Nhơn Healthy (219.000 VNĐ/hộp).

---

## 2. KIẾN TRÚC HỆ THỐNG & CÔNG NGHỆ CHỐT

### 2.1. Công nghệ sử dụng (Fullstack Next.js)
| Hạng mục | Công nghệ lựa chọn | Ghi chú kỹ thuật |
|---|---|---|
| **Kiến trúc** | **Next.js Fullstack (App Router)** | Tối ưu tiến độ 5 ngày, kết hợp UI + Server-side + API trong 1 repo |
| **Ngôn ngữ** | **TypeScript** | Bắt buộc `strict: true`, không dùng kiểu `any` |
| **Framework** | **Next.js 15** | Server Components, Route Handlers, SEO SSR/SSG |
| **Giao diện** | **Tailwind CSS + shadcn/ui** | Design system hiện đại, tối ưu UX, hỗ trợ Dark/Light mode |
| **Database & ORM** | **PostgreSQL + Prisma ORM** | Schema chặt chẽ, hỗ trợ Migration, Seed data tự động |
| **Quản lý State** | **Zustand + localStorage** | Quản lý giỏ hàng phía Client mượt mà |
| **Validate dữ liệu** | **Zod** | Xác thực 100% dữ liệu Form và Payload API |
| **Xác thực (Auth)** | **JWT (thư viện `jose`)** | Lưu trong `httpOnly cookie` (an toàn trước XSS) |

### 2.2. Quy tắc luồng dữ liệu kiến trúc (BFF Pattern)
```
[ Khách hàng / Admin ]
        │ HTTPS
        ▼
[ Next.js App Router ]
   ├── src/app/(public)/**    (Server/Client Component)
   ├── src/app/admin/**       (Trang quản trị bảo mật)
   └── src/app/api/**         (Route Handlers - REST API)
        │
        ▼
[ src/services/*.service.ts ]  <--- RANH GIỚI NGHIỆP VỤ (SEAM)
        │                          (Chỉ tầng này mới được gọi Prisma)
        ▼
   Prisma Client
        │
        ▼
  [ PostgreSQL ]
```

**Nguyên tắc vàng:**
- Server Component gọi trực tiếp các hàm trong `src/services/`.
- Client Component gọi API qua `/api/*` hoặc quản lý qua Zustand store.
- Route Handlers chỉ làm nhiệm vụ: Validate (Zod) -> Gọi `services/` -> Trả JSON chuẩn qua `ok()` / `fail()`.
- **CẤM** import Prisma Client trong bất kỳ Component hay Page nào.

---

## 3. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS - FR)

### 3.1. Phân hệ Khách hàng (Public User Portal)

* **FR-01: Trang chủ (Homepage)**
  - Banner Hero giới thiệu thương hiệu và thông điệp cốt lõi từ chuối xanh Gia Lai.
  - Khối khám phá khoa học: Giải thích trực quan Tinh bột kháng (RS2/RS3) là gì.
  - Danh sách sản phẩm tiêu biểu (Featured Products).
  - Lợi ích dinh dưỡng & So sánh chỉ số GI (Glycemic Index).
  - Call-to-Action (CTA) dẫn vào Quiz trắc nghiệm sức khỏe.
  - Đánh giá khách hàng & Cam kết chất lượng.

* **FR-02: Danh mục & Chi tiết sản phẩm**
  - **Danh sách sản phẩm (`/san-pham`)**: Bộ lọc danh mục (Bột, Bánh, Bữa sáng, Hộp quà), sắp xếp giá, tìm kiếm từ khóa, phân trang.
  - **Chi tiết sản phẩm (`/san-pham/[slug]`)**: 
    - Thư viện ảnh sản phẩm, thông tin giá, quy cách đóng gói.
    - **Bảng dinh dưỡng chi tiết**: Nêu rõ hàm lượng RS (g/khẩu phần), loại RS (RS2/RS3), GI, chất xơ.
    - Hướng dẫn sử dụng & bảo quản.
    - Disclaimer y tế bắt buộc ở chân trang chi tiết.
    - Nút chọn số lượng và "Thêm vào giỏ hàng".

* **FR-03: Góc khoa học & Blog (`/khoa-hoc`)**
  - Danh sách bài viết được phân loại: **Khoa học (SCIENCE)** và **Lối sống/Blog (BLOG)**.
  - Chi tiết bài viết (`/khoa-hoc/[slug]`): Nội dung chuyên sâu, bố cục rõ ràng, bảng biểu khoa học.
  - **Bắt buộc**: Mục **"Nguồn trích dẫn / References"** ở cuối các bài viết khoa học.
  - Disclaimer y tế miễn trừ trách nhiệm.

* **FR-04: Quiz tư vấn cá nhân hóa (`/quiz`)**
  - Bài trắc nghiệm ngắn (3–5 câu) về mục tiêu sức khỏe (đường huyết, cân nặng, tiêu hóa, thói quen ăn sáng).
  - Tự động chấm điểm và đề xuất sản phẩm phù hợp nhất (Recommended SKU) kèm nút "Mua ngay".
  - Lưu kết quả vào hệ thống để thống kê thị hiếu người dùng.

* **FR-05: Giỏ hàng & Đặt hàng mô phỏng (Guest Checkout)**
  - **Giỏ hàng (`/gio-hang`)**: Xem danh sách món, tăng/giảm số lượng, xóa món, lưu trạng thái qua `localStorage`.
  - **Đặt hàng (`/dat-hang`)**: 
    - Khách hàng không cần đăng nhập (Guest Checkout).
    - Điền thông tin: Họ tên, Số điện thoại, Email, Địa chỉ giao hàng, Ghi chú.
    - Phương thức thanh toán: COD hoặc DEMO.
    - Backend tự động tính tiền từ DB (không tin giá gửi từ client).
    - Tạo mã đơn hàng chuẩn: `BNV-YYYYMMDD-XXX`.
  - **Xác nhận đơn hàng**: Hiển thị thông tin đơn vừa tạo và trạng thái đơn hàng.

* **FR-06: Tương tác & Hỗ trợ**
  - Trang Câu hỏi thường gặp (`/faq`): Giải đáp thắc mắc về tinh bột kháng, cách dùng, giao nhận.
  - Trang Liên hệ (`/lien-he`): Form gửi tin nhắn hỗ trợ đến hệ thống.
  - Đăng ký nhận tin (Newsletter): Form đăng ký email ở chân trang (Footer).

---

### 3.2. Phân hệ Quản trị (Admin Portal - `/admin`)

* **FR-07: Xác thực & Phân quyền Admin**
  - Trang đăng nhập `/admin/dang-nhap`.
  - Cơ chế kiểm soát truy cập (Middleware Guard): Chặn mọi truy cập vào `/admin/*` nếu chưa có token JWT hợp lệ trong cookie `banova_token`.
  - Chức năng Đăng xuất an toàn.

* **FR-08: Quản lý Sản phẩm (Admin Catalog)**
  - Danh sách sản phẩm kèm ảnh, giá, tồn kho, trạng thái.
  - Thêm mới sản phẩm đầy đủ thông số kỹ thuật (RS content, RS type, GI, thành phần).
  - Chỉnh sửa thông tin sản phẩm.
  - Xóa mềm (Soft Delete - cập nhật `deletedAt`, không xóa vật lý khỏi DB).

* **FR-09: Quản lý Bài viết (Admin CMS)**
  - Danh sách bài viết khoa học/blog.
  - Viết bài, chỉnh sửa bài, quản lý trạng thái (`DRAFT` / `PUBLISHED`).
  - Quản lý mục trích dẫn nguồn tài liệu tham khảo.

* **FR-10: Quản lý Đơn hàng (Admin Orders)**
  - Danh sách đơn hàng đặt từ khách hàng, lọc theo trạng thái.
  - Xem chi tiết đơn hàng (thông tin người nhận, danh sách sản phẩm, số lượng, giá lúc mua).
  - Chuyển đổi trạng thái đơn hàng: `PENDING` ➔ `CONFIRMED` ➔ `DELIVERING` ➔ `COMPLETED` / `CANCELLED`.

* **FR-11: Dashboard thống kê cơ bản**
  - Tổng số đơn hàng, đơn chờ xử lý.
  - Tổng số sản phẩm đang kinh doanh.
  - Số lượng bài viết, lượt đăng ký nhận tin.

---

## 4. YÊU CẦU PHI CHỨC NĂNG (NON-FUNCTIONAL REQUIREMENTS - NFR)

### 4.1. Quy chuẩn Pháp lý & Y tế (Legal & Healthcare Compliance) - BẮT BUỘC
- **NFR-01 (Cấm từ ngữ y khoa sai lệch)**: Tuyệt đối **KHÔNG ĐƯỢC** sử dụng các từ ngữ mang tính điều trị y khoa như: *"chữa bệnh"*, *"điều trị"*, *"thay thế thuốc"*, *"đặc trị"*.
- **NFR-02 (Disclaimer y tế)**: Phải hiển thị tuyên bố từ chối trách nhiệm y tế rõ ràng tại: Footer toàn trang, Trang chi tiết sản phẩm, và Chân bài viết khoa học.
  > *Nội dung mẫu: "Sản phẩm không phải là thuốc và không có tác dụng thay thế thuốc chữa bệnh. Các thông tin trên website mang tính chất tham khảo kiến thức dinh dưỡng khoa học."*
- **NFR-03 (Tính xác thực số liệu - NFR-09)**: Mọi con số thống kê (%RS, GI, tỷ lệ bệnh lý) bắt buộc phải có nguồn dẫn chứng khoa học rõ ràng.

### 4.2. Hiệu năng & SEO
- **NFR-04**: Tối ưu SSR (Server-Side Rendering) cho trang chủ, chi tiết sản phẩm và bài viết để đạt điểm SEO cao.
- **NFR-05**: Có sẵn `sitemap.ts`, `robots.ts`, và đầy đủ thẻ Meta OpenGraph cho việc chia sẻ mạng xã hội.
- **NFR-06**: Sử dụng `next/image` với `alt` text đầy đủ, tối ưu tải ảnh lười (lazy loading).

### 4.3. Bảo mật & Toàn vẹn dữ liệu
- **NFR-07**: Không lưu trữ mật khẩu dạng plain-text; 100% mật khẩu được hash bằng thuật toán an toàn (Bcrypt).
- **NFR-08**: Token xác thực lưu trong `httpOnly` cookie để phòng chống tấn công XSS.
- **NFR-09**: Chống gian lận đơn hàng: Client không được phép tự tính toán hoặc gửi giá tiền khi tạo đơn hàng. Server chịu trách nhiệm tra cứu giá từ DB và tính toán toàn bộ chi phí.
- **NFR-10**: Snapshot giá: `OrderItem` lưu trữ giá bán và tên sản phẩm tại thời điểm mua, tránh trường hợp giá sản phẩm thay đổi trong tương lai làm sai lệch doanh thu lịch sử.

---

## 5. MÔ HÌNH DỮ LIỆU CỐT LÕI (DATABASE SCHEMAS & ENUMS)

### Các Enum cốt lõi:
- `Role`: `ADMIN`, `CUSTOMER`
- `ArticleType`: `SCIENCE` (Khoa học), `BLOG` (Lối sống/Ẩm thực)
- `PublishState`: `DRAFT`, `PUBLISHED`
- `OrderStatus`: `PENDING`, `CONFIRMED`, `DELIVERING`, `COMPLETED`, `CANCELLED`
- `PaymentMethod`: `COD`, `DEMO`

### Danh sách các bảng chính:
1. `User`: Tài khoản quản trị viên.
2. `Category`: Danh mục sản phẩm (slug duy nhất).
3. `Product`: Thông tin sản phẩm, thông số RS, GI, soft-delete.
4. `Article`: Bài viết, phân loại, nguồn trích dẫn, trạng thái xuất bản.
5. `Order`: Đơn đặt hàng, thông tin khách hàng, tổng tiền, trạng thái đơn.
6. `OrderItem`: Chi tiết từng món trong đơn (snapshot giá & tên).
7. `QuizResult`: Lưu trữ kết quả trắc nghiệm tư vấn.
8. `ContactMessage`: Lưu tin nhắn khách hàng gửi qua trang Liên hệ.
9. `NewsletterSubscriber`: Danh sách email đăng ký nhận tin.

---

## 6. QUY CHUẨN GIAO TIẾP API (API CONTRACT SUMMARY)

Tất cả các Endpoint tuân thủ Base URL: `/api` và cấu trúc response:
- **Thành công**: `{ "data": { ... } }`
- **Danh sách có phân trang**: `{ "data": [ ... ], "meta": { "page", "pageSize", "total", "totalPages" } }`
- **Lỗi**: `{ "error": { "code": "VALIDATION|UNAUTHORIZED|NOT_FOUND|CONFLICT|SERVER_ERROR", "message": "...", "details": { ... } } }`

---

## 7. MA TRẬN PHÂN CÔNG & TIẾN ĐỘ 5 NGÀY (3 THÀNH VIÊN)

### 7.1. Phân chia trách nhiệm theo vùng sở hữu thư mục
* **Người 1 — Frontend (Khách hàng)**:
  - Phạm vi: `src/app/(public)/**`, `src/components/**`, `src/store/**` (Zustand).
  - Trách nhiệm: Xây dựng toàn bộ giao diện người dùng, giỏ hàng, responsive, SEO, kết nối API.
* **Người 2 — Backend Catalog & Content**:
  - Phạm vi: `prisma/**`, `src/services/product.service.ts`, `article.service.ts`, `quiz.service.ts`, `src/app/api/products/**`, `articles/**`, `quiz/**`.
  - Trách nhiệm: Thiết kế schema, seed data, viết nghiệp vụ & API cho sản phẩm, bài viết, quiz, liên hệ.
* **Người 3 — Backend Hệ thống & Quản trị (Admin)**:
  - Phạm vi: `src/lib/auth.ts`, `src/middleware.ts`, `src/services/order.service.ts`, `auth.service.ts`, `src/app/api/orders/**`, `src/app/admin/**`.
  - Trách nhiệm: Hệ thống xác thực JWT, bảo vệ route, luồng xử lý đơn hàng, toàn bộ giao diện quản trị Admin.

### 7.2. Lộ trình kiểm soát đường găng (Milestones)
- **Hết T6 (16/10)**: Hoàn tất khởi tạo DB, Seed data chuẩn, chốt API Contract, xong khung UI trang chủ.
- **Hết T7 (17/10)**: Hiển thị sản phẩm & bài viết lấy từ DB thật; hoàn thành Login Admin & CRUD Sản phẩm.
- **Hết CN (18/10)**: Xong giao diện Quiz + FAQ + Liên hệ; hoàn thành CRUD Bài viết cho Admin.
- **Hết T2 (19/10)**: **Luồng đặt hàng hoàn tất end-to-end** (Khách đặt -> Lưu DB -> Admin xem và duyệt đơn).
- **Hết T3 (20/10)**: Tối ưu SEO, responsive, rà soát disclaimer y tế, deploy lên môi trường demo.
- **T4 (21/10)**: Demo trực tiếp trước hội đồng.

---

## 8. ĐỊNH NGHĨA HOÀN THÀNH (DEFINITION OF DONE - DOD)

Một chức năng chỉ được coi là hoàn thành khi đáp ứng đủ các tiêu chí:
1. Chạy thông suốt trên máy local, không có cảnh báo/lỗi ở Browser Console và Server Terminal.
2. Giao diện đáp ứng tốt trên cả thiết bị di động (Mobile) và máy tính (Desktop).
3. 100% dữ liệu đầu vào được validate qua schema Zod; API trả đúng chuẩn format.
4. Tuyệt đối không import Prisma Client bên ngoài tầng `src/services/`.
5. Lệnh `npm run lint` và `npm run build` chạy thành công không có lỗi.
6. Tuân thủ nghiêm ngặt quy định không dùng từ chữa bệnh và có disclaimer y tế đầy đủ.
