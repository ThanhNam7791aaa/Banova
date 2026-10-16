# BANOVA — Hợp đồng API (API Contract)

> **Đây là hợp đồng giữa FE và BE. Chốt ở Ngày 0 — mọi thay đổi phải báo cả nhóm.**
> FE code theo file này (dùng mock trước), BE code đúng theo file này. Xong là ghép chạy được ngay.
>
> Phiên bản: 1.0 · Ngày: 16/10/2026 · Base URL: `/api`

---

## 0. Quy ước chung

### 0.1. Định dạng response (bắt buộc giống nhau 100%)

**Thành công:**
```jsonc
{ "data": { /* ... */ } }
```

**Danh sách có phân trang:**
```jsonc
{
  "data": [ /* ... */ ],
  "meta": { "page": 1, "pageSize": 12, "total": 48, "totalPages": 4 }
}
```

**Lỗi:**
```jsonc
{ "error": { "code": "VALIDATION", "message": "Dữ liệu không hợp lệ", "details": {} } }
```

### 0.2. Mã lỗi dùng chung

| code | HTTP | Khi nào |
|---|---|---|
| `VALIDATION` | 400 | Dữ liệu gửi lên sai/thiếu |
| `UNAUTHORIZED` | 401 | Chưa đăng nhập |
| `FORBIDDEN` | 403 | Đã đăng nhập nhưng không đủ quyền |
| `NOT_FOUND` | 404 | Không tìm thấy tài nguyên |
| `CONFLICT` | 409 | Trùng dữ liệu / hết hàng |
| `SERVER_ERROR` | 500 | Lỗi hệ thống |

### 0.3. Xác thực

- Đăng nhập admin → server set **cookie httpOnly** tên `banova_token` (JWT).
- FE **không cần** tự gửi token — cookie tự kèm theo.
- Endpoint ghi `🔒 Admin` = phải đăng nhập bằng tài khoản admin.

### 0.4. Quy ước chung

- Field đặt tên **camelCase** (`rsContent`, không phải `rs_content`).
- Ngày giờ: chuỗi **ISO 8601 UTC** (`"2026-10-16T08:00:00.000Z"`).
- Tiền: **số nguyên VND** (`159000`).
- Phân trang: `?page=1&pageSize=12` (mặc định `pageSize=12`, tối đa `50`).

---

## 1. Kiểu dữ liệu dùng chung (types)

```ts
type Category = {
  id: string;
  name: string;          // "Bột"
  slug: string;          // "bot"
  description: string | null;
  sortOrder: number;
};

type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  category: Category;
  price: number;                 // VND
  unit: string;                  // "hũ" | "gói" | "ổ" | "hộp"
  servingSize: string;           // "15g"
  rsContent: number;             // gam tinh bột kháng / khẩu phần
  rsType: "RS2" | "RS3";
  gi: number | null;             // chỉ số đường huyết
  fiber: number | null;          // gam chất xơ / khẩu phần
  ingredients: string | null;
  usage: string | null;
  imageUrl: string | null;
  stock: number;
  isActive: boolean;
  createdAt: string;
};

type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;               // HTML/Markdown
  thumbnail: string | null;
  type: "SCIENCE" | "BLOG";      // Khoa học | Blog
  references: string | null;     // nguồn trích dẫn (bắt buộc với SCIENCE)
  author: string | null;
  status: "DRAFT" | "PUBLISHED";
  publishedAt: string | null;
  createdAt: string;
};

type OrderItem = {
  id: string;
  productId: string;
  productName: string;           // snapshot tên lúc mua
  unitPrice: number;
  quantity: number;
  subTotal: number;
};

type OrderStatus = "PENDING" | "CONFIRMED" | "DELIVERING" | "COMPLETED" | "CANCELLED";
type Order = {
  id: string;
  orderCode: string;             // "BNV-20261019-001"
  customerName: string;
  phone: string;
  email: string | null;
  address: string;
  note: string | null;
  subTotal: number;
  shippingFee: number;           // demo = 0
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: "COD" | "DEMO";
  items: OrderItem[];
  createdAt: string;
};

type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: "ADMIN" | "CUSTOMER";
};
```

**Nhãn hiển thị trạng thái đơn (FE dùng để dịch ra tiếng Việt):**

| status | Nhãn |
|---|---|
| `PENDING` | Chờ xử lý |
| `CONFIRMED` | Đã xác nhận |
| `DELIVERING` | Đang giao |
| `COMPLETED` | Hoàn thành |
| `CANCELLED` | Đã hủy |

---

## 2. API công khai — Sản phẩm & Danh mục

### 2.1. `GET /api/products` — Danh sách sản phẩm
> Chủ: **Người 2** · Dùng ở: *Trang chủ, Danh sách sản phẩm* · Public

**Query:**
| Tên | Kiểu | Mô tả |
|---|---|---|
| `page` | int | trang (mặc định 1) |
| `pageSize` | int | số/trang (mặc định 12, max 50) |
| `category` | string | lọc theo slug danh mục, vd `bot` |
| `q` | string | tìm theo tên |
| `sort` | string | `newest` (mặc định) \| `price_asc` \| `price_desc` |

**Response 200:**
```json
{
  "data": [ { /* Product */ } ],
  "meta": { "page": 1, "pageSize": 12, "total": 8, "totalPages": 1 }
}
```

### 2.2. `GET /api/products/[slug]` — Chi tiết sản phẩm
> Chủ: **Người 2** · Dùng ở: *Chi tiết sản phẩm* · Public

**Response 200:** `{ "data": { /* Product */ } }`
**Lỗi:** `404 NOT_FOUND`

### 2.3. `GET /api/categories` — Danh mục
> Chủ: **Người 2** · Dùng ở: *Menu, bộ lọc* · Public

**Response 200:** `{ "data": [ /* Category[] */ ] }`

---

## 3. API công khai — Khoa học / Blog

### 3.1. `GET /api/articles` — Danh sách bài viết
> Chủ: **Người 2** · Dùng ở: *Blog, Trang chủ* · Public

**Query:** `page`, `pageSize`, `type` (`SCIENCE`|`BLOG`), `q`
> Chỉ trả bài có `status = PUBLISHED`.

**Response 200:** `{ "data": [ /* Article[] */ ], "meta": {...} }`

### 3.2. `GET /api/articles/[slug]` — Chi tiết bài viết
> Chủ: **Người 2** · Dùng ở: *Chi tiết bài viết* · Public

**Response 200:** `{ "data": { /* Article */ } }`
**Lỗi:** `404 NOT_FOUND`

---

## 4. API công khai — Tư vấn & Marketing

### 4.1. `POST /api/quiz/submit` — Gửi quiz tư vấn
> Chủ: **Người 2** · Dùng ở: *Quiz* · Public

**Body:**
```json
{
  "answers": [
    { "questionId": "goal",    "value": "duong-huyet" },
    { "questionId": "morning", "value": "ban" },
    { "questionId": "diet",    "value": "healthy" }
  ]
}
```

**Response 200:**
```json
{
  "data": {
    "score": 8,
    "message": "Phù hợp nhất với bạn là bột tinh bột kháng Banova.",
    "recommendedProduct": { /* Product */ }
  }
}
```

### 4.2. `POST /api/contact` — Gửi liên hệ
> Chủ: **Người 2** · Dùng ở: *Liên hệ* · Public

**Body:** `{ "name": "...", "email": "...", "phone": "...", "message": "..." }`
**Response 201:** `{ "data": { "id": "..." } }`
**Lỗi:** `400 VALIDATION`

### 4.3. `POST /api/newsletter` — Đăng ký nhận tin
> Chủ: **Người 2** · Dùng ở: *Footer* · Public

**Body:** `{ "email": "abc@gmail.com" }`
**Response 201:** `{ "data": { "id": "...", "email": "abc@gmail.com" } }`
**Lỗi:** `409 CONFLICT` nếu email đã đăng ký.

---

## 5. API Đặt hàng

### 5.1. `POST /api/orders` — Tạo đơn (mô phỏng)
> Chủ: **Người 3** · Dùng ở: *Trang đặt hàng* · Public (Guest checkout)

**Body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "phone": "0905123456",
  "email": "a@gmail.com",
  "address": "123 Lê Lợi, Quy Nhơn",
  "note": "Giao buổi sáng",
  "paymentMethod": "DEMO",
  "items": [
    { "productId": "clx123", "quantity": 2 },
    { "productId": "clx456", "quantity": 1 }
  ]
}
```
> BE tự tính `unitPrice`, `subTotal`, `totalAmount` từ DB — **FE không gửi tiền lên.**

**Response 201:**
```json
{
  "data": {
    "id": "ord_001",
    "orderCode": "BNV-20261019-001",
    "subTotal": 318000,
    "shippingFee": 0,
    "totalAmount": 318000,
    "status": "PENDING"
  }
}
```
**Lỗi:** `400 VALIDATION` · `404 NOT_FOUND` (sản phẩm không tồn tại) · `409 CONFLICT` (hết hàng)

### 5.2. `GET /api/orders/[orderCode]` — Xem lại đơn vừa đặt
> Chủ: **Người 3** · Dùng ở: *Trang xác nhận đơn* · Public (theo mã đơn)

**Response 200:** `{ "data": { /* Order */ } }`
**Lỗi:** `404 NOT_FOUND`

---

## 6. API Xác thực (Admin)

### 6.1. `POST /api/auth/login`
> Chủ: **Người 3** · Dùng ở: *Trang đăng nhập admin* · Public

**Body:** `{ "email": "admin@banova.vn", "password": "••••••" }`
**Response 200:** `{ "data": { "id": "...", "email": "...", "fullName": "...", "role": "ADMIN" } }`
> Server set cookie `banova_token` (httpOnly, sameSite=lax).

**Lỗi:** `401 UNAUTHORIZED` (sai tài khoản/mật khẩu)

### 6.2. `POST /api/auth/logout`
> Chủ: **Người 3** · Admin

**Response 200:** `{ "data": { "success": true } }` (xoá cookie)

### 6.3. `GET /api/auth/me` — Thông tin user hiện tại
> Chủ: **Người 3** · Admin

**Response 200:** `{ "data": { /* AdminUser */ } }`
**Lỗi:** `401 UNAUTHORIZED`

---

## 7. API Quản trị (Admin) — Sản phẩm

> Tất cả 🔒 **Admin**. Chủ: **Người 2** (API) · **Người 3** (UI admin).

### 7.1. `POST /api/admin/products` — Thêm sản phẩm
**Body:** các field của Product (trừ `id`, `createdAt`, `category` → dùng `categoryId`).
**Response 201:** `{ "data": { /* Product */ } }`

### 7.2. `PUT /api/admin/products/[id]` — Sửa sản phẩm
**Body:** như trên (partial cũng được).
**Response 200:** `{ "data": { /* Product */ } }`

### 7.3. `DELETE /api/admin/products/[id]` — Xoá (mềm)
**Response 200:** `{ "data": { "success": true } }`
> Chỉ set `deletedAt`, không xoá khỏi DB.

---

## 8. API Quản trị (Admin) — Bài viết

> Tất cả 🔒 **Admin**. Chủ: **Người 2** (API) · **Người 3** (UI admin).

### 8.1. `POST /api/admin/articles` — Thêm bài viết
**Body:** `{ title, excerpt, content, thumbnail, type, references, author, status }`
**Response 201:** `{ "data": { /* Article */ } }`
> Nếu `status = PUBLISHED` → BE tự set `publishedAt = now`.

### 8.2. `PUT /api/admin/articles/[id]` — Sửa bài viết
**Response 200:** `{ "data": { /* Article */ } }`

### 8.3. `DELETE /api/admin/articles/[id]` — Xoá bài viết
**Response 200:** `{ "data": { "success": true } }`

---

## 9. API Quản trị (Admin) — Đơn hàng

> Tất cả 🔒 **Admin**. Chủ: **Người 3**.

### 9.1. `GET /api/orders` — Danh sách tất cả đơn
**Query:** `page`, `pageSize`, `status` (`PENDING`|…)
**Response 200:** `{ "data": [ /* Order[] */ ], "meta": {...} }`

### 9.2. `PATCH /api/orders/[id]/status` — Đổi trạng thái đơn
**Body:** `{ "status": "CONFIRMED" }`
**Response 200:** `{ "data": { /* Order */ } }`
**Lỗi:** `400 VALIDATION` (trạng thái không hợp lệ)

### 9.3. `GET /api/admin/stats` — Thống kê dashboard *(Should)*
**Response 200:**
```json
{ "data": { "totalOrders": 12, "pendingOrders": 3, "totalProducts": 8, "totalArticles": 4, "totalSubscribers": 21 } }
```

---

## 10. Bảng tổng hợp endpoint

| # | Method | Endpoint | Quyền | Chủ | Dùng ở trang |
|---|---|---|---|---|---|
| 1 | GET | `/api/products` | Public | Người 2 | Trang chủ, Danh sách SP |
| 2 | GET | `/api/products/[slug]` | Public | Người 2 | Chi tiết SP |
| 3 | GET | `/api/categories` | Public | Người 2 | Menu, bộ lọc |
| 4 | GET | `/api/articles` | Public | Người 2 | Blog, Trang chủ |
| 5 | GET | `/api/articles/[slug]` | Public | Người 2 | Chi tiết bài viết |
| 6 | POST | `/api/quiz/submit` | Public | Người 2 | Quiz |
| 7 | POST | `/api/contact` | Public | Người 2 | Liên hệ |
| 8 | POST | `/api/newsletter` | Public | Người 2 | Footer |
| 9 | POST | `/api/orders` | Public | Người 3 | Đặt hàng |
| 10 | GET | `/api/orders/[orderCode]` | Public | Người 3 | Xác nhận đơn |
| 11 | POST | `/api/auth/login` | Public | Người 3 | Đăng nhập admin |
| 12 | POST | `/api/auth/logout` | Admin | Người 3 | Admin |
| 13 | GET | `/api/auth/me` | Admin | Người 3 | Admin |
| 14 | POST | `/api/admin/products` | Admin | Người 2 | Admin — SP |
| 15 | PUT | `/api/admin/products/[id]` | Admin | Người 2 | Admin — SP |
| 16 | DELETE | `/api/admin/products/[id]` | Admin | Người 2 | Admin — SP |
| 17 | POST | `/api/admin/articles` | Admin | Người 2 | Admin — Bài viết |
| 18 | PUT | `/api/admin/articles/[id]` | Admin | Người 2 | Admin — Bài viết |
| 19 | DELETE | `/api/admin/articles/[id]` | Admin | Người 2 | Admin — Bài viết |
| 20 | GET | `/api/orders` | Admin | Người 3 | Admin — Đơn hàng |
| 21 | PATCH | `/api/orders/[id]/status` | Admin | Người 3 | Admin — Đơn hàng |
| 22 | GET | `/api/admin/stats` | Admin | Người 3 | Dashboard *(Should)* |

> **Ưu tiên làm:** 1–2–4–5–6–9–11–14–17–20–21 (đủ cho 6 trang trọng điểm). Phần còn lại làm sau nếu kịp.

---

## 11. Luồng chính (để FE/BE hiểu chung)

### Đặt hàng (Guest checkout)
```
FE: giỏ hàng (localStorage)
    → POST /api/orders { items: [{productId, quantity}] }
BE: kiểm tra sản phẩm active + còn hàng
    → tính tiền từ DB (không tin FE)
    → tạo Order (PENDING) + OrderItem (snapshot tên/giá)
    → trả orderCode
FE: hiện trang xác nhận, xoá giỏ
Admin: GET /api/orders → thấy đơn mới → PATCH status
```

### Quiz tư vấn
```
FE: người dùng trả lời 3–5 câu
    → POST /api/quiz/submit { answers }
BE: tính điểm theo bộ luật đơn giản → chọn sản phẩm phù hợp
    → lưu QuizResult + trả recommendedProduct
FE: hiện kết quả + nút "Thêm vào giỏ"
```

### Admin đăng bài (demo trực tiếp)
```
Admin: POST /api/auth/login → cookie
      → POST /api/admin/articles { status: "PUBLISHED" }
FE (khách): F5 trang /khoa-hoc → bài mới hiện ngay
```

---

## 12. Dữ liệu seed mẫu (Người 2 nạp ở Ngày 0)

**Tài khoản admin:** `admin@banova.vn` / `Banova@123` (mật khẩu hash bcrypt)

**4 danh mục:** Bột (`bot`) · Bánh (`banh`) · Bữa sáng (`bua-sang`) · Hộp quà (`hop-qua`)

**Sản phẩm (8 SKU — giá theo tài liệu chiến lược):**

| Tên | Danh mục | Giá | Đơn vị | RS/khẩu phần |
|---|---|---|---|---|
| Bột tinh bột kháng Banova 250g | Bột | 89.000 | hũ | 5,8g |
| Bột tinh bột kháng Banova 500g | Bột | 159.000 | hũ | 5,8g |
| Bột Banova hộp 10 gói 15g | Bột | 69.000 | hộp | 5,8g |
| Bánh mì nguyên cám Banova | Bánh | 39.000 | ổ | 4,2g |
| Muffin chuối yến mạch | Bánh | 25.000 | cái | 3,5g |
| Cookie hạt ít đường 200g | Bánh | 69.000 | hộp | 2,8g |
| Hộp bữa sáng Banova | Bữa sáng | 49.000 | hộp | 5,8g |
| Hộp quà Quy Nhơn Healthy | Hộp quà | 219.000 | hộp | 5,8g |

**3 bài viết mẫu** (có `references`, `type: SCIENCE`):
1. "Tinh bột kháng là gì và vì sao tốt cho đường huyết?" — dẫn nguồn tỷ lệ đái tháo đường 7,3%, tiền đái tháo đường 17,8%.
2. "Chuối xanh Gia Lai — nguyên liệu vàng cho tinh bột kháng."
3. "Ăn sáng thế nào để no đến trưa mà không tăng đường huyết?"

---

## 13. Checklist trước khi code

- [ ] Cả nhóm đọc và **đồng ý** file này.
- [ ] Người 2 tạo `src/lib/api-response.ts` với `ok()` / `fail()` đúng format mục 0.1.
- [ ] Người 2 chốt `src/lib/constants.ts` chứa các enum + nhãn tiếng Việt mục 1.
- [ ] File này **không sửa lẻ tẻ** — muốn đổi phải báo nhóm.

---

*Thay đổi hợp đồng = thay đổi cả 3 người. Báo trước, không tự ý sửa.*
