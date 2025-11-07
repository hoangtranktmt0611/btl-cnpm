This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Module Sinh Viên (Student Portal)

Module quản lý giao diện và luồng hoạt động của **Sinh Viên** trong hệ thống Tutor Support System.

## Cấu trúc thư mục

Toàn bộ luồng được quản lý thông qua *route group* `app/Sinhvien/`.
## Chức năng & Components chính
app/
└── Sinhvien/
    ├── layout.tsx          (Khung chung: Sidebar + Header)
    ├── page.tsx            (Trang mặc định, ví dụ: trang chào mừng?)
    ├── dashboard/
    │   └── page.tsx        
    ├── schedule/
    │   └── page.tsx        
    ├── my-classes/
    │   ├── page.tsx        
    │   └── [classId]/
    │       └── page.tsx    
    ├── tin-nhan/
    │   ├── layout.tsx      
    │   ├── page.tsx        
    │   └── [peopleId]/
    │       └── page.tsx    
    ├── tim-tutor/
    │   └── page.tsx        
    └── dang-ky/
        └── page.tsx

* **Layout Chung (`/layout.tsx`)**
    * **Chức năng:** Cung cấp khung (Sidebar + Header) nhất quán cho toàn bộ module. Tự động highlight mục menu và hiển thị tiêu đề trang.
    * **Components:** `Sidebar`, `AccountDropdown`, `NotificationDropdown`.

* **Bảng điều khiển (`/dashboard`)**
    * **Chức năng:** Trang chủ, hiển thị các thẻ thống kê nhanh và lịch học hôm nay.

* **Đăng ký (`/dang-ky`)**
    * **Chức năng:** Form cho phép sinh viên đăng ký tham gia chương trình. Hiển thị popup khi gửi thành công.
    * **Components:** `RegistrationForm`, `SuccessModal`.

* **Tìm Tutor (`/tim-tutor`)**
    * **Chức năng:** Bố cục 2 cột cho phép tìm kiếm và lọc danh sách Tutor.
    * **Components:** `TutorList`, `TutorCriteriaForm`.

* **Lịch học (`/schedule`)**
    * **Chức năng:** Hiển thị lịch học cá nhân đầy đủ (Tháng/Tuần/Ngày).
    * **Components:** Tích hợp thư viện `@fullcalendar/react`.

* **Lớp học của tôi (`/my-classes`)**
    * **Chức năng:** Hiển thị danh sách các lớp học đã tham gia dưới dạng lưới (grid).

* **Chi tiết Lớp học (`/my-classes/[classId]`)**
    * **Chức năng:** Trang chi tiết động, hiển thị nội dung lớp học (Bài giảng, Bài kiểm tra, Lịch hẹn) theo dạng Tab.

* **Tin nhắn (`/tin-nhan`)**
    * **Chức năng:** Hệ thống chat 2 cột (dynamic route).
    * **`layout.tsx`**: Chứa `ChatSidebar` (danh sách hội thoại).
    * **`/[peopleId]/page.tsx`**: Chứa `ChatWindow` (khung chat chi tiết) và các modal chức năng.
    * **Components:** `UserProfileModal`.

    # Module Tutor (Tutor Portal)

Module quản lý giao diện và luồng hoạt động của **Tutor (Giảng viên)** trong hệ thống Tutor Support System. Luồng này tập trung vào việc quản lý, tạo lập và giám sát các lớp học.

## Cấu trúc thư mục

Toàn bộ luồng của Tutor được quản lý thông qua *route group* `app/Tutor/`.

## Chức năng & Components chính

app/ 
└── Tutor/  ├── layout.tsx (Khung chung: Sidebar Header)       
            ├── page.tsx (Trang mặc định, ví dụ: /Tutor) 
            ├── dashboard/ 
            │       └── page.tsx
            ├── schedule/ 
            │       └── page.tsx
            ├── my-classes/ 
            │       ├── page.tsx
            │       └── [classId]/ 
            │               └── page.tsx
            ├── register-class/ 
            │           ├── page.tsx
            │           └── [classId]/ 
            │                   └── page.tsx    
            └── tin-nhan/ 
                    ├── layout.tsx
                    ├── page.tsx
                    └── [peopleId]/ 
                            └── page.tsx

* **Layout Chung (`/layout.tsx`)**
    * **Chức năng:** Cung cấp khung (Sidebar + Header) nhất quán cho toàn bộ module.
    * **Components:** `SidebarTutor`, `AccountDropdown`, `NotificationDropdown`.

* **Bảng điều khiển (`/dashboard`)**
    * **Chức năng:** Trang chủ, hiển thị thống kê (Tổng học sinh, Giờ dạy,...), lịch dạy hôm nay, và mục "Cần xử lý" (phê duyệt yêu cầu).

* **Đăng ký lớp học (`/register-class`)**
    * **Chức năng:** Hiển thị danh sách các lớp học đang quản lý và cho phép tạo lớp học mới thông qua một modal.
    * **Components:** `CreateClassModal`.

* **Tạo lịch học (`/register-class/[classId]`)**
    * **Chức năng:** Trang form chi tiết (dynamic route) để tạo một buổi học/buổi tư vấn mới cho một lớp học cụ thể.

* **Lịch dạy (`/schedule`)**
    * **Chức năng:** Hiển thị lịch dạy cá nhân đầy đủ (Tháng/Tuần/Ngày).
    * **Components:** Tích hợp thư viện `@fullcalendar/react`.

* **Lớp học của tôi (`/my-classes`)**
    * **Chức năng:** Hiển thị danh sách các lớp học (grid view) mà Tutor phụ trách.

* **Chi tiết Lớp học (`/my-classes/[classId]`)**
    * **Chức năng:** Trung tâm quản lý chính. Trang chi tiết động với giao diện Tab (Bài giảng, Bài kiểm tra, Lịch hẹn, Danh sách Sinh viên).
    * **Các chức năng quản lý (Modal):**
        * "Hành động nhanh" ở sidebar bên phải.
        * Các nút "Thêm mới" trong từng tab.
    * **Components:** `AddLectureModal`, `AddScheduleModal`, `SendNotificationModal`, `ManageMaterialsModal`.

* **Tin nhắn (`/tin-nhan`)**
    * **Chức năng:** Hệ thống chat 2 cột (dynamic route), tái sử dụng hoàn toàn logic của module Sinh viên.
    * **Components:** `UserProfileModal`.
