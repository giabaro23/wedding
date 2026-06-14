# Thiệp Cưới Online

## Cách mở

**Cách 1 — Khuyến nghị** (audio + `?guest=` hoạt động tốt nhất):
```bash
cd /home/claude/projects/wedding-invite
python3 -m http.server 8000
```
Rồi mở trình duyệt vào `http://localhost:8000`.

**Cách 2 — Mở trực tiếp:**
Mở file `index.html` bằng trình duyệt. Một số tính năng (nhạc nền, tham số URL) có thể bị giới hạn do chính sách CORS.

---

## Cá nhân hóa lời mời

Gửi link kèm tên khách:
```
http://localhost:8000/index.html?guest=Nguyen+Van+A
http://localhost:8000/index.html?guest=Ch%E1%BB%8B+H%C3%B2a
```
Tên khách sẽ hiển thị trong phần lời mời: *"Kính mời **Nguyễn Văn A**"*.

---

## Chỉnh nội dung

Chỉ cần sửa file `js/data.js` để cập nhật toàn bộ nội dung: tên đôi, ngày cưới, địa điểm, thông tin ngân hàng, v.v.

---

## Ảnh & nhạc cần bỏ vào `public/img/`

| Tên file | Kích thước gợi ý | Mô tả |
|---|---|---|
| `cover.jpg` | 1920×1080 | Ảnh bìa hero (ngang) |
| `groom.jpg` | 600×800 | Ảnh chú rể (dọc) |
| `bride.jpg` | 600×800 | Ảnh cô dâu (dọc) |
| `album-1.jpg` … `album-8.jpg` | 1200×800 hoặc 800×1200 | Ảnh album (ngang hoặc dọc đều được) |
| `music.mp3` | — | Nhạc nền |

> Nếu chưa có ảnh, trang sẽ hiển thị placeholder màu kem/vàng nhạt thay thế — không bị vỡ layout.
