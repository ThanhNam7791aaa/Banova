# BANOVA — Quy tắc code & Cấu trúc dự án

> Tài liệu nội bộ nhóm. Mọi thành viên phải đọc trước khi viết dòng code đầu tiên.
> Phiên bản: 1.0 · Ngày: 16/10/2026 · Buổi demo: Thứ 4, 21/10/2026

---

## 0. Chốt kỹ thuật (đọc trước)

| Hạng mục | Quyết định |
|---|---|
| Tên thương hiệu | **Banova** |
| Kiến trúc | **Next.js fullstack** (App Router) — 1 stack cho kịp demo |
| Ngôn ngữ | **TypeScript** (bắt buộc, `strict: true`) |
| Framework | **Next.js 15** (App Router) |
| Database | **PostgreSQL** |
| ORM | **Prisma** |
| Giao diện | **Tailwind CSS + shadcn/ui** |
| Xác thực | **JWT (thư viện `jose`) lưu trong httpOnly cookie** |
| Validate dữ liệu | **Zod** |
| State giỏ hàng | **Zustand + localStorage** |
| Danh mục sản phẩm | Bột · Bánh · Bữa sáng · Hộp quà |

**Giả định đã chốt (có thể chỉnh nếu nhóm đổi ý):**
- **Bỏ đăng nhập khách hàng** → dùng **Guest checkout** (đặt hàng không cần tài khoản).
- **Chỉ giữ đăng nhập Admin** để vào trang quản trị.

### Vì sao chọn 1 stack (ghi vào báo cáo)
SRS gốc chọn Next.js + ASP.NET Core (C#). Nhóm chuyển sang **Next.js fullstack** để kịp demo với 3 người trong 5 ngày. Kiến trúc vẫn giữ **BFF pattern**: tầng `services/` là ranh giới nghiệp vụ, nên về sau có thể **tách ra backend C# riêng mà không phải viết lại giao diện** — chỉ đổi nơi cài đặt của tầng service.

---

## 1. Kiến trúc tổng thể

```
Người dùng
   │ HTTPS
   ▼
Next.js (App Router)
   ├── (public)  → trang khách hàng   ─┐
   ├── admin     → trang quản trị      ├─ mọi thứ đi qua services/
   └── api/*     → Route Handlers     ─┘
   │
   ▼
services/*.service.ts   ← RANH GIỚI NGHIỆP VỤ (seam để tách backend sau này)
   │
   ▼
Prisma Client
   │
   ▼
PostgreSQL
```

### Luật vàng về luồng dữ liệu (BẮT BUỘC)

```
✅ Server Component  →  services/  (gọi trực tiếp, chạy phía server)
✅ Client Component  →  /api/*     (Route Handler)
✅ Route Handler     →  services/  (không tự viết truy vấn dài)

❌ Component/Page KHÔNG BAO GIỜ import Prisma Client
❌ Component/Page KHÔNG viết truy vấn database
❌ Route Handler KHÔNG chứa nghiệp vụ phức tạp (đẩy xuống service)
```

> Nhớ một câu: **"Ai cũng gọi service, không ai chạm Prisma ngoài service."**

---

## 2. Cấu trúc thư mục

```
banova/
├─ prisma/
│  ├─ schema.prisma              # định nghĩa bảng
│  ├─ seed.ts                    # dữ liệu mẫu (BẮT BUỘC có)
│  └─ migrations/
│
├─ public/
│  └─ images/                    # ảnh sản phẩm, blog, logo
│
├─ src/
│  ├─ app/
│  │  ├─ (public)/               # nhóm route khách hàng
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx                    # Trang chủ
│  │  │  ├─ san-pham/
│  │  │  │  ├─ page.tsx                 # Danh sách sản phẩm
│  │  │  │  └─ [slug]/page.tsx          # Chi tiết sản phẩm
│  │  │  ├─ khoa-hoc/
│  │  │  │  ├─ page.tsx                 # Danh sách bài viết
│  │  │  │  └─ [slug]/page.tsx          # Chi tiết bài viết
│  │  │  ├─ quiz/page.tsx               # Quiz tư vấn
│  │  │  ├─ faq/page.tsx
│  │  │  ├─ lien-he/page.tsx
│  │  │  ├─ gio-hang/page.tsx           # Giỏ hàng
│  │  │  └─ dat-hang/page.tsx           # Đặt hàng mô phỏng
│  │  │
│  │  ├─ admin/                         # khu vực quản trị (có guard)
│  │  │  ├─ layout.tsx
│  │  │  ├─ page.tsx                    # Dashboard
│  │  │  ├─ dang-nhap/page.tsx          # Login admin
│  │  │  ├─ san-pham/                   # CRUD sản phẩm
│  │  │  ├─ bai-viet/                   # CRUD bài viết
│  │  │  └─ don-hang/                   # Xem & đổi trạng thái đơn
│  │  │
│  │  ├─ api/                           # Route Handlers (REST)
│  │  │  ├─ auth/
│  │  │  │  ├─ login/route.ts
│  │  │  │  └─ logout/route.ts
│  │  │  ├─ products/
│  │  │  │  ├─ route.ts                 # GET list, POST create
│  │  │  │  └─ [id]/route.ts            # GET/PUT/DELETE
│  │  │  ├─ articles/
│  │  │  │  ├─ route.ts
│  │  │  │  └─ [id]/route.ts
│  │  │  ├─ orders/
│  │  │  │  ├─ route.ts                 # POST tạo đơn
│  │  │  │  └─ [id]/status/route.ts     # PATCH đổi trạng thái
│  │  │  ├─ quiz/submit/route.ts
│  │  │  ├─ contact/route.ts
│  │  │  └─ newsletter/route.ts
│  │  │
│  │  ├─ layout.tsx
│  │  ├─ sitemap.ts                     # SEO
│  │  ├─ robots.ts
│  │  ├─ not-found.tsx
│  │  └─ error.tsx
│  │
│  ├─ components/
│  │  ├─ ui/                     # component nền (shadcn)
│  │  ├─ layout/                 # Header, Footer, Nav, Disclaimer
│  │  ├─ product/                # ProductCard, ProductGrid, NutritionTable
│  │  ├─ article/                # ArticleCard, ArticleContent, References
│  │  └─ quiz/                   # QuizStep, QuizResult
│  │
│  ├─ services/                  # ★ NGHIỆP VỤ — chỉ nơi này chạm Prisma
│  │  ├─ product.service.ts
│  │  ├─ article.service.ts
│  │  ├─ order.service.ts
│  │  ├─ quiz.service.ts
│  │  ├─ auth.service.ts
│  │  └─ contact.service.ts
│  │
│  ├─ schemas/                   # Zod schemas (validate input)
│  │  ├─ product.schema.ts
│  │  ├─ article.schema.ts
│  │  ├─ order.schema.ts
│  │  └─ quiz.schema.ts
│  │
│  ├─ lib/
│  │  ├─ prisma.ts               # singleton Prisma Client
│  │  ├─ auth.ts                 # ký/kiểm tra JWT
│  │  ├─ api-response.ts         # helper trả response chuẩn
│  │  ├─ slug.ts                 # tạo slug từ tiếng Việt
│  │  ├─ env.ts                  # validate biến môi trường
│  │  └─ constants.ts            # enum, nhãn trạng thái, cấu hình
│  │
│  ├─ hooks/                     # custom React hooks
│  ├─ store/                     # zustand (cart-store.ts)
│  ├─ types/                     # type dùng chung
│  └─ middleware.ts              # chặn /admin nếu chưa đăng nhập
│
├─ docs/
│  ├─ CODE-STANDARDS.md          # file này
│  ├─ API.md                     # hợp đồng API
│  └─ DEMO-SCRIPT.md             # kịch bản demo
│
├─ .env.example                  # mẫu biến môi trường (được commit)
├─ .env                          # (KHÔNG commit)
├─ .eslintrc.json
├─ .prettierrc
├─ README.md
└─ package.json
```

---

## 3. Quy tắc đặt tên

| Loại | Quy tắc | Ví dụ |
|---|---|---|
| Route (URL) | kebab-case, tiếng Việt không dấu | `san-pham`, `khoa-hoc`, `dat-hang` |
| File component | PascalCase `.tsx` | `ProductCard.tsx` |
| File service/lib | kebab-case + hậu tố | `product.service.ts`, `api-response.ts` |
| Biến / hàm | camelCase | `getProductBySlug()`, `cartItems` |
| Type / Interface | PascalCase | `Product`, `OrderPayload` |
| Hằng số | UPPER_SNAKE_CASE | `MAX_QUANTITY`, `ORDER_STATUS` |
| Model Prisma | PascalCase (số ít) | `Product`, `Article`, `OrderItem` |
| Cột DB | snake_case (qua `@map`) | `rs_content`, `created_at` |
| API endpoint | kebab, danh từ số nhiều | `/api/products`, `/api/articles` |

---

## 4. Quy tắc viết code

### 4.1. TypeScript
- `strict: true`, **không dùng `any`**. Cần type rộng thì dùng `unknown` rồi thu hẹp.
- Ưu tiên `type` cho shape dữ liệu, `interface` cho props component.
- Không `@ts-ignore`. Nếu bí quá thì `@ts-expect-error` kèm lý do.

### 4.2. Component
- Mặc định là **Server Component**. Chỉ thêm `"use client"` khi thật cần (state, event, `useEffect`).
- **Named export**, tránh `export default` (trừ page/layout theo yêu cầu Next.js).
- Component chỉ lo hiển thị. **Không chứa nghiệp vụ, không gọi Prisma.**
- File component > ~200 dòng → tách nhỏ.
- Ảnh dùng `next/image`, luôn có `alt`.

### 4.3. Service (tầng nghiệp vụ)
- Mỗi domain 1 file service. Hàm đặt tên rõ việc: `listProducts()`, `createOrder()`.
- Service nhận **dữ liệu đã validate**, chịu trách nhiệm truy vấn + logic.
- Ném lỗi bằng type lỗi chuẩn, route handler bắt và trả HTTP status.

```ts
// src/services/product.service.ts
import { prisma } from "@/lib/prisma";

export async function listProducts({ page = 1, pageSize = 12 } = {}) {
  const [items, total] = await Promise.all([
    prisma.product.findMany({
      where: { isActive: true, deletedAt: null },
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.product.count({ where: { isActive: true, deletedAt: null } }),
  ]);
  return { items, total, page, pageSize };
}
```

### 4.4. Route Handler (API)
- **Mỏng**: validate → gọi service → trả response. Không nhồi nghiệp vụ.
- Luôn validate input bằng Zod trước khi gọi service.
- Luôn `try/catch`, trả JSON đúng chuẩn.

```ts
// src/app/api/products/route.ts
import { NextResponse } from "next/server";
import { productSchema } from "@/schemas/product.schema";
import { createProduct } from "@/services/product.service";
import { ok, fail } from "@/lib/api-response";
import { requireAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  const admin = await requireAdmin(req);
  if (!admin) return fail("UNAUTHORIZED", "Cần quyền quản trị", 401);

  const body = await req.json();
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) return fail("VALIDATION", "Dữ liệu không hợp lệ", 400, parsed.error);

  const product = await createProduct(parsed.data);
  return ok(product, 201);
}
```

### 4.5. Validate (Zod)
- Mọi input từ người dùng **phải** qua Zod: form, query, body API.
- Schema đặt trong `src/schemas/`, export cả schema và type suy ra (`z.infer`).

### 4.6. Xử lý lỗi
- Dùng helper `ok()` / `fail()` cho mọi API → format thống nhất.
- Lỗi không lộ chi tiết hệ thống ra ngoài; log ở server.
- Có `not-found.tsx` và `error.tsx` thân thiện.

### 4.7. Biến môi trường & bảo mật
- Không hardcode secret. Đọc qua `process.env`, validate trong `lib/env.ts`.
- `.env` **không commit**; `.env.example` có commit (ghi tên biến, giá trị mẫu).
- Mật khẩu hash bằng **bcrypt**, không log ra console.
- Mọi endpoint admin phải gọi `requireAdmin()`.

### 4.8. Tiền tệ & thời gian
- Tiền VND lưu bằng **số nguyên** (`Int`), đơn vị đồng. Không dùng số thực cho tiền.
- Thời gian lưu UTC (`DateTime`); hiển thị theo `vi-VN`.

### 4.9. Comment
- Comment giải thích **vì sao**, không giải thích **cái gì**.
- Tiếng Việt hoặc tiếng Anh đều được, miễn nhất quán trong cùng file.

---

## 5. Quy tắc API

**Format response thống nhất:**

```jsonc
// Thành công
{ "data": { /* ... */ } }

// Danh sách có phân trang
{ "data": [ /* ... */ ], "meta": { "page": 1, "pageSize": 12, "total": 48, "totalPages": 4 } }

// Lỗi
{ "error": { "code": "VALIDATION", "message": "Dữ liệu không hợp lệ", "details": {} } }
```

**Mã lỗi dùng chung:** `VALIDATION` (400) · `UNAUTHORIZED` (401) · `FORBIDDEN` (403) · `NOT_FOUND` (404) · `CONFLICT` (409) · `SERVER_ERROR` (500).

**Danh sách endpoint:** xem chi tiết tại `docs/API.md` (đối chiếu mục 9 của SRS, bỏ phần auth khách hàng).

**Quy ước:** phân trang `?page=1&pageSize=12`; lọc `?category=bột`; tìm kiếm `?q=...`.

---

## 6. Quy tắc Database (Prisma)

### 6.1. Quy ước
- Model PascalCase, field camelCase, cột DB snake_case qua `@map`/`@@map`.
- Mọi bảng có `id` (cuid), `createdAt`, `updatedAt`.
- Sản phẩm & bài viết có **`deletedAt` (soft delete)** — không xoá cứng.
- Trạng thái lưu bằng **enum** trong Prisma, không lưu chuỗi tự do.
- **`slug` là UNIQUE** (Product, Article, Category); `email` UNIQUE (User, Newsletter).
- Seed data là **bắt buộc** (`prisma/seed.ts`): 1 admin, 4 danh mục, ~8 sản phẩm, 3–4 bài viết.
- Đổi schema → tạo migration (`prisma migrate dev`), **không sửa tay DB**.

### 6.2. Enum cần chốt trước
```prisma
enum Role         { ADMIN, CUSTOMER }
enum ArticleType  { SCIENCE, BLOG }        // Khoa học | Blog
enum PublishState { DRAFT, PUBLISHED }
enum OrderStatus  { PENDING, CONFIRMED, DELIVERING, COMPLETED, CANCELLED }
enum PaymentMethod{ COD, DEMO }
```

### 6.3. Schema rút gọn (đầy đủ trong `prisma/schema.prisma`)
```prisma
model Product {
  id               String     @id @default(cuid())
  name             String
  slug             String     @unique
  shortDescription String?
  description      String
  categoryId       String
  category         Category   @relation(fields: [categoryId], references: [id])
  price            Int                       // VND
  unit             String                    // hũ | gói | ổ | hộp
  servingSize      String                    // vd "15g"
  rsContent        Decimal    @map("rs_content")
  rsType           String                    // RS2 | RS3
  gi               Int?
  fiber            Decimal?
  ingredients      String?
  usage            String?
  imageUrl         String?
  stock            Int        @default(0)
  isActive         Boolean    @default(true)
  createdAt        DateTime   @default(now())
  updatedAt        DateTime   @updatedAt
  deletedAt        DateTime?

  reviews    Review[]
  orderItems OrderItem[]
}

model Article {
  id          String        @id @default(cuid())
  title       String
  slug        String        @unique
  excerpt     String?
  content     String
  thumbnail   String?
  type        ArticleType   @default(SCIENCE)
  references  String?       // trích dẫn nguồn (NFR-09)
  author      String?
  status      PublishState  @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

model Order {
  id            String        @id @default(cuid())
  orderCode     String        @unique
  customerName  String
  phone         String
  email         String?
  address       String
  note          String?
  subTotal      Int
  shippingFee   Int           @default(0)
  totalAmount   Int
  status        OrderStatus   @default(PENDING)
  paymentMethod PaymentMethod @default(DEMO)
  items         OrderItem[]
  createdAt     DateTime      @default(now())
  updatedAt     DateTime      @updatedAt
}

model OrderItem {
  id          String  @id @default(cuid())
  orderId     String
  order       Order   @relation(fields: [orderId], references: [id])
  productId   String
  product     Product @relation(fields: [productId], references: [id])
  productName String                 // snapshot tại thời điểm mua
  unitPrice   Int
  quantity    Int
  subTotal    Int
}
```

> Các bảng còn lại (`User`, `Category`, `QuizResult`, `Review`, `NewsletterSubscriber`, `ContactMessage`) theo mục 8 của SRS, đã bổ sung field còn thiếu như đã review.

---

## 7. Quy tắc nội dung (bắt buộc — liên quan pháp lý)

- **CẤM** dùng các từ: "chữa", "điều trị", "thay thuốc", "đặc trị".
- Mọi con số (GI, %RS, thống kê) **phải có nguồn**; bài khoa học bắt buộc có mục "Nguồn tham khảo".
- **Disclaimer y tế** phải xuất hiện ở: footer, trang chi tiết sản phẩm, cuối bài khoa học.
- Nội dung phải khớp tài liệu chiến lược (Banova, chuối xanh Gia Lai, thị trường Quy Nhơn).

---

## 8. Quy tắc Git

**Nhánh:**
```
main                    # luôn chạy được, không push trực tiếp
feat/<mô-tả>            # feat/trang-chi-tiet-san-pham
fix/<mô-tả>             # fix/loi-gio-hang
docs/<mô-tả>            # docs/api
chore/<mô-tả>           # chore/cau-hinh-eslint
```

**Commit (Conventional Commits):**
```
feat(cart): thêm nút xoá sản phẩm trong giỏ
fix(order): sửa lỗi tính sai tổng tiền
docs(readme): cập nhật hướng dẫn chạy
chore: cấu hình prettier
```

**Luồng làm việc:**
1. Tạo nhánh từ `main`.
2. Code + chạy `npm run lint` và `npm run build` cho tới khi sạch.
3. Mở Pull Request, ghi rõ đã làm gì.
4. **1 người khác review** (không tự merge PR của mình).
5. Merge xong xoá nhánh.

**Tuyệt đối không commit:** `.env`, `node_modules/`, file build, ảnh nặng chưa nén.

---

## 9. Definition of Done (một việc chỉ "xong" khi)

- [ ] Chạy được ở máy local, không lỗi console.
- [ ] Responsive: hiển thị tốt trên mobile **và** desktop.
- [ ] Input đã validate (Zod); API trả đúng format ở mục 5.
- [ ] Không import Prisma ngoài tầng `services/`.
- [ ] `npm run lint` và `npm run build` đều pass.
- [ ] Có dữ liệu mẫu để bấm thử.
- [ ] Tuân thủ quy tắc nội dung (mục 7).

---

## 10. Quy trình làm việc nhóm

- **Board** (GitHub Projects / Trello): `Todo → Doing → Review → Done`.
- **Sync 15 phút mỗi sáng**: hôm qua làm gì, hôm nay làm gì, đang vướng gì.
- **Ưu tiên tuyệt đối**: làm hết Layer 1 (6 trang trọng điểm) trước, mới tới phần khác.
- **Nguyên tắc đường găng**: hết ngày **Thứ 3 20/10 phải có bản chạy end-to-end**. Thứ 4 **chỉ demo, không thêm tính năng**.

---

## 11. Lệnh thường dùng

```bash
npm run dev          # chạy dev
npm run build        # kiểm tra build (phải pass trước khi PR)
npm run lint         # kiểm tra lint

npx prisma migrate dev --name <ten>   # tạo migration sau khi sửa schema
npx prisma generate                   # sinh Prisma Client
npx prisma studio                     # xem DB trực quan
npx prisma db seed                    # nạp dữ liệu mẫu
```

### Biến môi trường (`.env.example`)
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/banova"
JWT_SECRET="doi_thanh_chuoi_bi_mat_dai"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

---

## 12. Phân công 3 người (1 FE · 2 BE)

> Chia theo **vùng sở hữu thư mục** để không ai đụng file của ai → hạn chế conflict khi merge.

### 12.1. Vai trò

| | Người 1 — FE (khách hàng) | Người 2 — BE Catalog & Content | Người 3 — BE Hệ thống & Admin |
|---|---|---|---|
| **Trách nhiệm** | Toàn bộ giao diện khách hàng nhìn thấy | Dữ liệu + API + nghiệp vụ danh mục/nội dung/quiz | Xác thực, đơn hàng, và trang quản trị |
| **Nguyên tắc** | Chỉ UI, **cấm chạm Prisma** | Không làm UI | Không làm UI khách hàng |
| **Bàn giao** | 6 trang khách hàng chạy thật, responsive, SEO | DB + seed + API công khai + API admin CRUD | Login admin + luồng đặt hàng + admin quản trị |

### 12.2. Vùng sở hữu (ai được sửa gì)

**Người 1 — FE khách hàng**
```
src/app/(public)/**              # tất cả trang khách hàng
src/components/layout/**         # Header, Footer, Nav, Disclaimer
src/components/product/**
src/components/article/**
src/components/quiz/**
src/store/**                     # giỏ hàng (zustand)
src/hooks/**
```

**Người 2 — BE Catalog & Content**
```
prisma/schema.prisma             # ★ định nghĩa toàn bộ bảng
prisma/seed.ts
src/lib/prisma.ts
src/lib/slug.ts
src/lib/api-response.ts
src/lib/constants.ts
src/services/product.service.ts
src/services/article.service.ts
src/services/quiz.service.ts
src/services/contact.service.ts
src/app/api/products/**
src/app/api/articles/**
src/app/api/quiz/**
src/app/api/contact/**
src/app/api/newsletter/**
src/schemas/product.schema.ts
src/schemas/article.schema.ts
src/schemas/quiz.schema.ts
```

**Người 3 — BE Hệ thống & Admin**
```
src/lib/auth.ts                  # ký/kiểm tra JWT
src/lib/env.ts
src/middleware.ts                # guard /admin
src/services/auth.service.ts
src/services/order.service.ts
src/app/api/auth/**
src/app/api/orders/**
src/schemas/order.schema.ts
src/app/admin/**                 # TOÀN BỘ trang quản trị
```

### 12.3. File dùng chung (khoá ở Ngày 0)

Các file này **Người 2 tạo xong trong Ngày 0**, sau đó **muốn sửa phải báo cả nhóm**:
`prisma/schema.prisma` · `src/lib/constants.ts` · `src/lib/api-response.ts` · `src/types/**` · `package.json` · `tailwind.config` · `src/app/layout.tsx`.

> Đổi schema DB = sự kiện toàn nhóm. Ai cần thêm field → nhắn Người 2, không tự sửa.

### 12.4. Hợp đồng làm việc song song

1. **Ngày 0 chốt `docs/API.md`** (danh sách endpoint + shape request/response). Đây là hợp đồng giữa Người 1 và 2/3.
2. **Người 1 không chờ API**: dựng UI bằng dữ liệu mock trước, khi API sẵn sàng chỉ việc đổi nguồn dữ liệu.
3. **Người 2 và 3 dùng chung** `api-response.ts`, `constants.ts`, `prisma.ts` → đảm bảo API trả format giống nhau.
4. Mọi API phải xuất hiện trong `docs/API.md` **trước khi code**.

### 12.5. Timeline 5 ngày

| Ngày | Người 1 (FE) | Người 2 (BE Catalog) | Người 3 (BE Hệ thống + Admin) |
|---|---|---|---|
| **T6 16/10** | Dựng Next.js, Tailwind + shadcn, Header/Footer/Disclaimer, **trang chủ (mock)** | Prisma schema + migrate + **seed** + `lib/*` + chốt `docs/API.md` | Auth skeleton (JWT), `middleware.ts`, `order.schema.ts` |
| **T7 17/10** | Danh sách + chi tiết sản phẩm, blog list/detail (**nối API thật**) | API + service: Product (list/detail), Article (list/detail) | Login admin + guard + admin layout + **CRUD sản phẩm** |
| **CN 18/10** | Quiz UI + FAQ + Liên hệ | API: Quiz, Contact, Newsletter, admin CRUD Article | **CRUD bài viết** (admin) |
| **T2 19/10** | Giỏ hàng + **đặt hàng mô phỏng** (nối Order API) | Hỗ trợ fix API, bổ sung ảnh/nội dung seed | Order service + API + **admin danh sách đơn & đổi trạng thái** |
| **T3 20/10** | SEO (meta/sitemap/OG), responsive, disclaimer, polish | Tối ưu query, rà phân quyền, fix bug tích hợp | Admin dashboard nhẹ, **deploy**, test end-to-end |
| **T4 21/10** | Cả 3: chỉ fix lỗi nhỏ + **rehearse demo** — không thêm tính năng | | |

### 12.6. Mốc kiểm tra (đường găng)

- **Hết T6:** DB có dữ liệu seed, `docs/API.md` được chốt → cả nhóm chạy song song được.
- **Hết T7:** xem được sản phẩm + bài viết lấy **từ DB thật**.
- **Hết T2:** luồng **đặt hàng mô phỏng chạy end-to-end**.
- **Hết T3:** đạt mục 14 (Acceptance) của SRS, bản deploy chạy được.
- **T4:** chỉ demo.

### 12.7. Quy tắc phối hợp

- **Nhánh Git theo người**: Ng1 `feat/fe-*`, Ng2 `feat/be-*`, Ng3 `feat/order-*` và `feat/admin-*`.
- **Không sửa file ngoài vùng sở hữu** — cần thì báo người sở hữu.
- **Người 1 là người dùng API đầu tiên** → phát hiện API lệch contract thì báo ngay cho Người 2/3, không tự sửa API.
- **Nếu trễ tiến độ** → cắt theo thứ tự: FAQ/Liên hệ → quiz → admin dashboard; **không cắt** trang chủ, chi tiết sản phẩm, blog, giỏ hàng/đặt hàng, admin CRUD.

---

*Mọi thắc mắc về quy tắc → hỏi trực tiếp trong nhóm trước khi tự ý làm khác.*
