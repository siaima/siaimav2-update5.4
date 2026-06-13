# BẢN GHI CHÚ TỔNG HỢP THAY ĐỔI MÃ NGUỒN (28/05 - 29/05)
*Mã nguồn đã được push lên nhánh chính `main` của kho lưu trữ `siaimav2-update5.4`*

---

## 1. Cấu hình Hệ thống & Tối ưu hóa Repository
* **Tệp cấu hình `.gitignore` (Cập nhật)**: Bổ sung cấu hình bỏ qua tự động các thư mục và tệp rác phát sinh khi chạy local:
  * Loại bỏ `node_modules/`, `.DS_Store` (tệp ẩn macOS) và thư mục `reports/` để giữ mã nguồn trên GitHub gọn nhẹ và sạch sẽ.
* **Cơ chế Cache-Busting (Cập nhật)**: Đồng loạt nâng số phiên bản (version query) của các tệp CSS/JS trên tất cả các trang con (ví dụ: `components.css?v=28`, `main.js?v=15`) nhằm ép trình duyệt người dùng cập nhật giao diện mới lập tức, tránh lỗi lưu cache cũ.
* **Quản lý Dependencies**: Bổ sung tệp `package.json` và `package-lock.json` để quản lý các gói thư viện cài đặt.

---

## 2. Chi tiết thay đổi trên từng trang giao diện (Pages)

### 2.1. Trang Chủ (`index.html`)
* **Hệ sinh thái Đối tác (`.home-partners`) (Nâng cấp lớn)**:
  * Tích hợp bộ số liệu thống kê nổi bật (Stats): *50+ Đối tác thương hiệu, 10+ Nền tảng, 20+ Tổ chức, 100K+ Creators, 500+ Chiến dịch, 1M+ Điểm chạm*.
  * Xây dựng **Bức tường logo cuộn động (`.home-partners__logo-wall`)**: Thiết kế dạng 2 cột logo chạy cuộn dọc tự động, hiển thị hình ảnh thực tế từ các thương hiệu lớn đồng hành (Shopee, TikTok, Lazada, Bytedance, Canon, Manulife, Haravan, HUTECH, UEF,...).
* **Cụm Sự kiện mới (`home-event-board`) (Thay đổi cấu trúc)**:
  * Loại bỏ Swiper Timeline dạng trượt cũ.
  * Thay thế bằng cụm bảng hiển thị **5 sự kiện gần nhất** dạng danh sách mini (`.community-event-mini`), hiển thị trực quan thông tin ngày tháng, diễn giả, nhãn phân loại sự kiện và liên kết trực tiếp tới trang cộng đồng.
* **Phần Tin tức/Blog cũ**: Được đặt thuộc tính ẩn (`hidden aria-hidden="true"`) để tối ưu luồng chuyển hướng người dùng trực tiếp sang trang Blog chuyên biệt mới.

### 2.2. Trang Showcase / Dự án (`showcase.html`)
* **Nâng cấp Cơ chế hiển thị & Tìm kiếm**:
  * **Nút bấm tải thêm thủ công (Load More)**: Chuyển đổi cơ chế cuộn tự động (Infinite Scroll) sang nút bấm **"Xem thêm showcase"** sử dụng `Alpine.js` giúp người dùng kiểm soát trạng thái trang tốt hơn.
  * **Bộ đếm tiến trình**: Hiển thị nhãn đếm động trực quan (ví dụ: `Đang hiển thị 9 / 19 showcase`).
  * **Tăng giới hạn tải**: Tăng số lượng dự án mặc định ban đầu và mỗi lượt tải thêm từ `6` lên `9` dự án.
  * **Hiệu ứng & Tìm kiếm**: Thêm hiệu ứng chuyển cảnh mượt mà (`x-transition.opacity.duration.180ms`) khi chọn bộ lọc và bộ chuẩn hóa chuỗi tiếng Việt (`normalize`) giúp tìm kiếm không dấu chính xác.
* **Căn chỉnh bố cục**: Cân đối lại padding và thuộc tính hiển thị (`align-items: start`) ở khu vực chân trang Showcase & Đối tác.

### 2.3. Trang Cộng đồng (`community.html`)
* **Giao diện đầu trang (`community-photo-hero`) (Thiết kế lại)**:
  * Thay đổi phần Page Hero cũ thành giao diện ảnh nền lớn có chiều sâu kèm lớp phủ tối màu (`community-photo-hero__shade`).
  * Thiết kế khối avatar đại diện xếp chồng đè của các thành viên cộng đồng nổi bật.
  * Tối ưu hóa lại nút kêu gọi hành động ("Liên hệ ngay" / "Khám phá thêm").
* **Mốc phát triển Sự kiện**:
  * Bổ sung nhãn phân loại giai đoạn cho chuỗi sự kiện theo năm: **2024** (*Giai đoạn đặt nền*), **2025** (*Giai đoạn mở rộng*), **2026** (*Giai đoạn tăng tốc*).

### 2.4. Trang Tin tức & Kiến thức (`blog.html`) (Đại tu giao diện)
* Thay thế hoàn toàn danh sách bài viết cũ bằng giao diện mới gồm các phân khu chuyên nghiệp:
  * **Blog Hero**: Giao diện tiêu đề tinh gọn, hiện đại.
  * **Highlights**: Nổi bật bài viết đinh kèm ảnh lớn và mô tả tóm tắt.
  * **Insights Grid**: Lưới bài viết chia sẻ kiến thức, mẹo thực tế đi kèm ảnh đại diện sinh động từ kho ảnh hệ thống.
  * **Press & SIA Moment**: Nơi chia sẻ các câu chuyện thương hiệu và bài viết PR báo chí được chọn lọc.
  * **Archive**: Danh sách bài viết cũ dạng danh sách văn bản tối giản kèm ngày tháng, dễ dàng tra cứu nhanh.
  * **Newsletter**: Biểu mẫu đăng ký bản tin *SIA Weekly* được tái cấu trúc gọn gàng hơn.

### 2.5. Trang Chi tiết Sự kiện (`event-detail.html`)
* **Đối tác Đồng hành (`#organizers`)**:
  * Xóa bỏ cấu trúc chia danh mục logo dạng lưới chữ cũ.
  * Thay thế bằng **Bức tường logo dạng thẻ bo góc (`.event-logo-wall` / `.event-logo-card`)**, hiển thị logo đồng bộ của các đơn vị: JCI Vietnam, TREVI Tân, Mắt Bão, đại học Hồng Bàng, Tech Insider, IP Vietnam, Vihat Solutions và SIA Innovation Marketing.

---

## 3. Cập nhật mã Styles (CSS) & Xử lý tương tác (JS)

* **Tệp styles chính (`assets/css/components.css`) (Bổ sung ~2,900 dòng code)**:
  * Thêm toàn bộ các thuộc tính CSS hỗ trợ cho: Bức tường logo cuộn động (`.home-partners__logo-wall`), Thẻ sự kiện mini trang chủ (`.community-event-mini`), Giao diện Hero ảnh của trang Cộng đồng (`.community-photo-hero`), Khối logo đối tác dạng thẻ bo góc sự kiện (`.event-logo-card`), và giao diện các phân khu mới của trang Blog.
* **Tương tác kịch bản (`assets/js/main.js`)**:
  * Dọn dẹp mã nguồn, loại bỏ bộ chọn hiệu ứng `.cta-banner__tile` không dùng đến giúp tối ưu tốc độ phản hồi của trang.
