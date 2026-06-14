# Thiệp cưới online — Design Spec

Ngày: 2026-06-14
Tham khảo: https://www.ewedinvite.online/HAILONG&NGOCTRAM/

## Mục tiêu
Một trang thiệp cưới tĩnh (HTML + CSS + vanilla JS), mở trực tiếp bằng trình duyệt,
không cần build. Phong cách: sang trọng trắng kem + vàng đồng (gold), mobile-first.
Toàn bộ nội dung là mock data đặt trong **một file constants** để chủ nhân tự sửa.
Ảnh do người dùng cung cấp sau vào `public/img/`.

## Cấu trúc thư mục
```
wedding-invite/
├── index.html          # markup tất cả section
├── css/style.css       # style + biến màu (cream + gold)
├── js/data.js          # TẤT CẢ nội dung/mock data — chỉ sửa file này
├── js/main.js          # logic: nhạc, đếm ngược, slider, RSVP, render từ data.js
├── public/img/         # ảnh người dùng bỏ vào sau (tên file cố định)
│   ├── cover.jpg, bride.jpg, groom.jpg
│   ├── album-1.jpg … album-8.jpg
│   └── music.mp3
└── README.md           # hướng dẫn thay ảnh & sửa nội dung
```

## Constants (`js/data.js`)
Global object `WEDDING`:
- `groom`, `bride`: { name, family, parents[] }
- `weddingDate`: ISO string mốc đếm ngược
- `ceremony`, `party`: { dateText, weekday, time, venueName, address }
- `timeline`: [{ time, label }]
- `album`: ["album-1.jpg", …]
- `maps`: URL Google Maps
- `bank`: { bankName, accountNumber, accountHolder }
- `defaultGuest`: text mặc định khi không có `?guest=`
- `quotes`: [string]

## Section (cuộn dọc)
1. Bìa/hero — cover.jpg, tên đôi, ngày cưới, nút cuộn xuống, nút play/pause nhạc (fixed).
2. Lời mời — "Trân trọng kính mời" + tên khách từ `?guest=` (fallback `defaultGuest`), nhà trai / nhà gái.
3. Thông tin lễ — 2 thẻ Lễ cưới & Tiệc (ngày/thứ/giờ + tên & địa chỉ).
4. Đếm ngược — Ngày/Giờ/Phút/Giây realtime tới `weddingDate`.
5. Timeline — các mốc giờ từ `timeline[]`.
6. Album — slider ảnh (prev/next + swipe), render từ `album[]`.
7. Bản đồ — nút mở `maps`.
8. Mừng cưới — thông tin chuyển khoản + nút copy số TK.
9. Footer — lời cảm ơn + quote.

## JavaScript (vanilla)
- Render nội dung động từ `WEDDING`.
- Nhạc nền play/pause (bấm để phát vì autoplay bị chặn).
- Đếm ngược `setInterval` tới `weddingDate`.
- Slider album: prev/next + swipe (touch) + auto-play tùy chọn.
- Cá nhân hóa lời mời từ `?guest=` (decodeURIComponent).
- RSVP Có/Không → thông báo cảm ơn, lưu `localStorage` (tĩnh, không server).
- Copy số TK ra clipboard.
- Fade-in khi cuộn (IntersectionObserver).

## Style
- Biến CSS: `--cream`, `--gold`, `--text`.
- Font: Playfair Display (serif tiêu đề) + Be Vietnam Pro (body, hỗ trợ tiếng Việt) qua Google Fonts.
- Viền/đường kẻ vàng đồng trang trí; responsive mobile-first.

## Ngoài phạm vi (YAGNI)
- Không backend, không gửi RSVP về server (trang tĩnh).
- Không CMS/admin; sửa nội dung trực tiếp trong `js/data.js`.
