const WEDDING = {
  groom: { name: "[TÊN CHÚ RỂ]", family: "NHÀ TRAI", parents: ["[ÔNG ...]", "[BÀ ...]"] },
  bride: { name: "[TÊN CÔ DÂU]", family: "NHÀ GÁI", parents: ["[ÔNG ...]", "[BÀ ...]"] },
  weddingDate: "2026-12-31T17:00:00",
  ceremony: { dateText: "31.12.2026", weekday: "Thứ Năm", time: "11:00", venueName: "[TƯ GIA NHÀ TRAI]", address: "[ĐỊA CHỈ LỄ CƯỚI]" },
  party:    { dateText: "31.12.2026", weekday: "Thứ Năm", time: "17:00", venueName: "[TRUNG TÂM TIỆC CƯỚI ...]", address: "[ĐỊA CHỈ TIỆC]" },
  timeline: [ { time: "16:30", label: "Đón khách" }, { time: "17:00", label: "Khai tiệc" }, { time: "17:30", label: "Lễ thành hôn" }, { time: "18:00", label: "Tiệc ngọt & chụp ảnh" }, { time: "20:00", label: "Tiễn khách" } ],
  album: ["album-1.jpg","album-2.jpg","album-3.jpg","album-4.jpg","album-5.jpg","album-6.jpg","album-7.jpg","album-8.jpg"],
  maps: "https://maps.google.com/?q=[DIA+DIEM+TIEC]",
  bank: { bankName: "[NGÂN HÀNG]", accountNumber: "[SỐ TÀI KHOẢN]", accountHolder: "[CHỦ TÀI KHOẢN]" },
  defaultGuest: "Quý khách",
  quotes: ["Tình yêu không làm cho thế giới quay tròn. Tình yêu là điều khiến chuyến đi đáng giá.", "Cảm ơn bạn đã chia sẻ niềm vui cùng chúng tôi!"],
  music: "public/img/music.mp3",
  images: { cover: "public/img/cover.jpg", groom: "public/img/groom.jpg", bride: "public/img/bride.jpg" }
};
window.WEDDING = WEDDING;
