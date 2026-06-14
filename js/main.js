/* ================================================
   THIỆP CƯỚI — main.js
   Vanilla JS, đọc từ window.WEDDING
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {
  const W = window.WEDDING;

  /* -----------------------------------------------
     1. CÁ NHÂN HÓA: Lấy tên khách từ URL ?guest=
  ----------------------------------------------- */
  const params = new URLSearchParams(window.location.search);
  const rawGuest = params.get('guest');
  const guestName = rawGuest ? decodeURIComponent(rawGuest) : W.defaultGuest;
  const guestEl = document.getElementById('guest-name');
  if (guestEl) guestEl.textContent = guestName;

  /* -----------------------------------------------
     2. RENDER TÊN ĐÔI & NGÀY CƯỚI (hero)
  ----------------------------------------------- */
  const groomNameEl = document.getElementById('groom-name');
  const brideNameEl = document.getElementById('bride-name');
  const weddingDateDisplay = document.getElementById('wedding-date-display');

  if (groomNameEl) groomNameEl.textContent = W.groom.name;
  if (brideNameEl) brideNameEl.textContent = W.bride.name;
  if (weddingDateDisplay) {
    weddingDateDisplay.textContent = W.ceremony.weekday + ' — ' + W.ceremony.dateText;
  }

  /* -----------------------------------------------
     3. RENDER THÔNG TIN GIA ĐÌNH
  ----------------------------------------------- */
  const groomFamilyEl  = document.getElementById('groom-family');
  const groomParentsEl = document.getElementById('groom-parents');
  const brideFamilyEl  = document.getElementById('bride-family');
  const brideParentsEl = document.getElementById('bride-parents');

  if (groomFamilyEl)  groomFamilyEl.textContent  = W.groom.family;
  if (brideFamilyEl)  brideFamilyEl.textContent   = W.bride.family;
  if (groomParentsEl) groomParentsEl.innerHTML = W.groom.parents.map(function (p) {
    return '<div>' + p + '</div>';
  }).join('');
  if (brideParentsEl) brideParentsEl.innerHTML = W.bride.parents.map(function (p) {
    return '<div>' + p + '</div>';
  }).join('');

  /* -----------------------------------------------
     4. RENDER CARDS LỄ & TIỆC
  ----------------------------------------------- */
  function buildEventCardDetails(data) {
    return [
      '<div class="event-detail-row">',
      '  <span class="event-detail-time">' + data.time + '</span>',
      '</div>',
      '<div class="event-detail-row">',
      '  <span class="event-detail-label">Ngày</span>',
      '  <span class="event-detail-value">' + data.weekday + ', ' + data.dateText + '</span>',
      '</div>',
      '<div class="event-detail-row">',
      '  <span class="event-detail-label">Địa điểm</span>',
      '  <span class="event-detail-value">' + data.venueName + '</span>',
      '</div>',
      '<div class="event-detail-row">',
      '  <span class="event-detail-label">Địa chỉ</span>',
      '  <span class="event-detail-value">' + data.address + '</span>',
      '</div>'
    ].join('\n');
  }

  var ceremonyCardDetails = document.querySelector('#ceremony-card .event-card-details');
  var partyCardDetails    = document.querySelector('#party-card .event-card-details');
  if (ceremonyCardDetails) ceremonyCardDetails.innerHTML = buildEventCardDetails(W.ceremony);
  if (partyCardDetails)    partyCardDetails.innerHTML    = buildEventCardDetails(W.party);

  /* -----------------------------------------------
     5. RENDER TIMELINE
  ----------------------------------------------- */
  var timelineList = document.getElementById('timeline-list');
  if (timelineList && W.timeline.length) {
    timelineList.innerHTML = W.timeline.map(function (item) {
      return [
        '<li class="timeline-item reveal">',
        '  <span class="timeline-time">' + item.time + '</span>',
        '  <span class="timeline-label">' + item.label + '</span>',
        '</li>'
      ].join('\n');
    }).join('\n');
  }

  /* -----------------------------------------------
     6. RENDER ALBUM SLIDER
  ----------------------------------------------- */
  var albumSlider     = document.getElementById('album-slider');
  var albumPrev       = document.getElementById('album-prev');
  var albumNext       = document.getElementById('album-next');
  var albumIndicators = document.getElementById('album-indicators');
  var currentSlide    = 0;
  var autoPlayTimer   = null;
  var totalSlides     = W.album.length;
  var touchStartX     = 0;
  var touchEndX       = 0;

  function renderAlbum() {
    if (!albumSlider || !totalSlides) return;

    // Render slides
    albumSlider.innerHTML = W.album.map(function (filename, idx) {
      return [
        '<div class="album-slide" data-index="' + idx + '">',
        '  <img',
        '    src="public/img/' + filename + '"',
        '    alt="Ảnh cưới ' + (idx + 1) + '"',
        '    loading="lazy"',
        '    onerror="this.style.display=\'none\';this.parentElement.querySelector(\'.slide-placeholder\').style.display=\'flex\';"',
        '  />',
        '  <div class="slide-placeholder" style="display:none;">',
        '    <span class="slide-placeholder-icon">🌸</span>',
        '    <span class="slide-placeholder-text">' + filename + '</span>',
        '  </div>',
        '</div>'
      ].join('\n');
    }).join('\n');

    // Render dots
    if (albumIndicators) {
      albumIndicators.innerHTML = W.album.map(function (_, idx) {
        return '<span class="dot' + (idx === 0 ? ' active' : '') + '" data-idx="' + idx + '"></span>';
      }).join('');

      // Dots click
      albumIndicators.querySelectorAll('.dot').forEach(function (dot) {
        dot.addEventListener('click', function () {
          goToSlide(parseInt(this.dataset.idx));
          resetAutoPlay();
        });
      });
    }
  }

  function goToSlide(idx) {
    if (!albumSlider) return;
    currentSlide = (idx + totalSlides) % totalSlides;
    albumSlider.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';

    // Cập nhật dots
    var dots = albumIndicators ? albumIndicators.querySelectorAll('.dot') : [];
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === currentSlide);
    });
  }

  function nextSlide() { goToSlide(currentSlide + 1); }
  function prevSlide() { goToSlide(currentSlide - 1); }

  function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 4000);
  }

  function resetAutoPlay() {
    clearInterval(autoPlayTimer);
    startAutoPlay();
  }

  if (albumPrev) albumPrev.addEventListener('click', function () { prevSlide(); resetAutoPlay(); });
  if (albumNext) albumNext.addEventListener('click', function () { nextSlide(); resetAutoPlay(); });

  // Swipe touch
  if (albumSlider) {
    albumSlider.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    albumSlider.addEventListener('touchend', function (e) {
      touchEndX = e.changedTouches[0].clientX;
      var deltaX = touchStartX - touchEndX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        resetAutoPlay();
      }
    }, { passive: true });
  }

  renderAlbum();
  startAutoPlay();

  /* -----------------------------------------------
     7. RENDER THÔNG TIN NGÂN HÀNG
  ----------------------------------------------- */
  var bankNameEl   = document.getElementById('bank-name');
  var bankAcctEl   = document.getElementById('bank-account');
  var bankHolderEl = document.getElementById('bank-holder');

  if (bankNameEl)   bankNameEl.textContent   = W.bank.bankName;
  if (bankAcctEl)   bankAcctEl.textContent   = W.bank.accountNumber;
  if (bankHolderEl) bankHolderEl.textContent = W.bank.accountHolder;

  /* -----------------------------------------------
     8. COPY SỐ TÀI KHOẢN
  ----------------------------------------------- */
  var copyBtn   = document.getElementById('copy-btn');
  var copyToast = document.getElementById('copy-toast');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(W.bank.accountNumber).then(function () {
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(function () {
            copyToast.classList.remove('show');
          }, 2000);
        }
      }).catch(function () {
        // Fallback nếu clipboard API không khả dụng
        var tempInput = document.createElement('input');
        tempInput.value = W.bank.accountNumber;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        if (copyToast) {
          copyToast.classList.add('show');
          setTimeout(function () { copyToast.classList.remove('show'); }, 2000);
        }
      });
    });
  }

  /* -----------------------------------------------
     9. RSVP — XÁC NHẬN THAM DỰ
  ----------------------------------------------- */
  var rsvpYesBtn  = document.getElementById('rsvp-yes');
  var rsvpNoBtn   = document.getElementById('rsvp-no');
  var rsvpMessage = document.getElementById('rsvp-message');
  var rsvpBtnsDiv = document.querySelector('.rsvp-btns');

  var MSG_YES = 'Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất vui được đón tiếp bạn.';
  var MSG_NO  = 'Cảm ơn bạn đã phản hồi! Rất tiếc khi bạn không thể tham dự. Chúc bạn mọi điều tốt đẹp!';

  function showRsvpResult(answer) {
    if (!rsvpMessage) return;
    rsvpMessage.textContent = answer === 'yes' ? MSG_YES : MSG_NO;
    rsvpMessage.style.display = 'block';
    if (rsvpBtnsDiv) rsvpBtnsDiv.style.display = 'none';
  }

  // Kiểm tra localStorage khi load
  var savedRsvp = localStorage.getItem('wedding-rsvp');
  if (savedRsvp) {
    showRsvpResult(savedRsvp);
  }

  if (rsvpYesBtn) {
    rsvpYesBtn.addEventListener('click', function () {
      localStorage.setItem('wedding-rsvp', 'yes');
      showRsvpResult('yes');
    });
  }

  if (rsvpNoBtn) {
    rsvpNoBtn.addEventListener('click', function () {
      localStorage.setItem('wedding-rsvp', 'no');
      showRsvpResult('no');
    });
  }

  /* -----------------------------------------------
     10. RENDER FOOTER QUOTE
  ----------------------------------------------- */
  var footerQuoteEl = document.getElementById('footer-quote');
  if (footerQuoteEl && W.quotes.length) {
    footerQuoteEl.textContent = '"' + W.quotes[0] + '"';
  }

  /* -----------------------------------------------
     11. NHẠC NỀN — toggle play/pause
  ----------------------------------------------- */
  var musicBtn  = document.getElementById('music-btn');
  var bgAudio   = document.getElementById('bg-audio');
  var musicIcon = musicBtn ? musicBtn.querySelector('.music-icon') : null;
  var isPlaying = false;

  if (bgAudio) {
    bgAudio.src = W.music;
    bgAudio.volume = 0.5;
  }

  if (musicBtn && bgAudio) {
    musicBtn.addEventListener('click', function () {
      if (isPlaying) {
        bgAudio.pause();
        if (musicIcon) musicIcon.textContent = '▶';
        isPlaying = false;
      } else {
        bgAudio.play().then(function () {
          if (musicIcon) musicIcon.textContent = '⏸';
          isPlaying = true;
        }).catch(function () {
          // Autoplay bị chặn — không làm gì
        });
      }
    });

    bgAudio.addEventListener('ended', function () {
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = '▶';
    });
  }

  /* -----------------------------------------------
     12. HERO COVER: set background-image
  ----------------------------------------------- */
  var heroSection = document.getElementById('hero');
  if (heroSection && W.images.cover) {
    // CSS đã set background-image, nhưng ta set lại bằng JS để đảm bảo
    heroSection.style.backgroundImage = "url('" + W.images.cover + "')";
  }

  /* -----------------------------------------------
     13. NÚT SCROLL DOWN
  ----------------------------------------------- */
  var scrollDownBtn  = document.getElementById('scroll-down');
  var invitationSect = document.getElementById('invitation');

  if (scrollDownBtn && invitationSect) {
    scrollDownBtn.addEventListener('click', function () {
      invitationSect.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* -----------------------------------------------
     14. MAP BUTTON
  ----------------------------------------------- */
  var mapBtn = document.getElementById('map-btn');
  if (mapBtn) {
    mapBtn.addEventListener('click', function () {
      window.open(W.maps, '_blank');
    });
  }

  /* -----------------------------------------------
     15. ĐẾM NGƯỢC
  ----------------------------------------------- */
  var cdDays    = document.getElementById('countdown-days');
  var cdHours   = document.getElementById('countdown-hours');
  var cdMinutes = document.getElementById('countdown-minutes');
  var cdSeconds = document.getElementById('countdown-seconds');
  var cdMessage = document.getElementById('countdown-message');
  var cdGrid    = document.querySelector('.countdown-grid');

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function updateCountdown() {
    var now        = new Date().getTime();
    var target     = new Date(W.weddingDate).getTime();
    var diff       = target - now;

    if (diff <= 0) {
      // Đã qua ngày cưới
      if (cdGrid)    cdGrid.style.display    = 'none';
      if (cdMessage) cdMessage.style.display = 'block';
      clearInterval(countdownTimer);
      return;
    }

    var days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours   = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (cdDays)    cdDays.textContent    = pad(days);
    if (cdHours)   cdHours.textContent   = pad(hours);
    if (cdMinutes) cdMinutes.textContent = pad(minutes);
    if (cdSeconds) cdSeconds.textContent = pad(seconds);
  }

  updateCountdown();
  var countdownTimer = setInterval(updateCountdown, 1000);

  /* -----------------------------------------------
     16. INTERSECTION OBSERVER — fade-in .reveal
  ----------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: hiện tất cả nếu không hỗ trợ IO
    revealEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

}); // end DOMContentLoaded
