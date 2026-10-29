/* Project 02: native dialog로 비교 화면 원본을 확대한다. */
(() => {
  const dialog = document.querySelector('.case-lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const enlarged = dialog.querySelector('img');
  const caption = dialog.querySelector('.case-lightbox-caption');
  let scrollBeforeOpen = 0;
  let oldOverflow = '';

  document.querySelectorAll('[data-enlarge]').forEach(button => {
    button.addEventListener('click', () => {
      const source = button.querySelector('img');
      enlarged.src = button.dataset.enlargeSrc || source?.currentSrc || source?.src;
      enlarged.alt = button.dataset.enlargeAlt || source?.alt || '화면 원본';
      caption.textContent = enlarged.alt;
      scrollBeforeOpen = window.scrollY;
      oldOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
      dialog.querySelector('.case-lightbox-scroll').scrollTo(0, 0);
    });
  });
  dialog.querySelector('.case-lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => {
    document.documentElement.style.overflow = oldOverflow;
    window.scrollTo({top: scrollBeforeOpen, behavior:'instant'});
  });
})();

/* Keep each gallery local to its comparison; enlargement reads the current image. */
document.querySelectorAll('[data-case-gallery]').forEach(gallery => {
  const slides = JSON.parse(gallery.dataset.caseGallery);
  const image = gallery.querySelector('[data-gallery-image]');
  const previous = gallery.querySelector('[data-gallery-prev]');
  const next = gallery.querySelector('[data-gallery-next]');
  const counter = gallery.querySelector('[data-gallery-count]');
  const caption = gallery.querySelector('[data-gallery-caption]');
  let index = 0;
  const show = target => {
    index = Math.max(0, Math.min(slides.length - 1, target));
    image.src = slides[index].src;
    image.alt = slides[index].alt;
    counter.textContent = `${index + 1} / ${slides.length}`;
    caption.textContent = slides[index].caption;
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  };
  previous.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));
  gallery.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
});

document.querySelectorAll('[data-hint-demo]').forEach(demo => {
  const toggle = demo.querySelector('.case-hint-toggle');
  const panel = demo.querySelector('.case-hint-demo-panel');
  const original = demo.querySelector('.case-hint-original');
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? '힌트 닫기' : '힌트 보기';
    panel.hidden = !open;
    original.dataset.enlargeSrc = open ? '../Image/PJ2_images/redesign/r_b_hint.png' : '../Image/PJ2_images/redesign/r_b_retry.png';
    original.dataset.enlargeAlt = open ? '책 14쪽을 읽고 답을 다시 생각해 보도록 안내하는 B 힌트 원본 화면' : '문제 카드 오른쪽에 힌트 보기 버튼이 있는 B 재풀이 원본 화면';
  });
});


/* Book-detail state tabs update one image; the existing lightbox uses its current source. */
document.querySelectorAll('[data-state-tabs]').forEach(group => {
  const tabs = [...group.querySelectorAll('[role="tab"]')];
  const panel = group.querySelector('[role="tabpanel"]');
  const image = panel.querySelector('img');
  const description = panel.querySelector('.case-state-description');
  const select = tab => {
    tabs.forEach(item => {
      item.setAttribute('aria-selected', String(item === tab));
      item.tabIndex = item === tab ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', tab.id);
    image.src = tab.dataset.stateSrc;
    image.alt = `${tab.textContent} 상태의 도서 상세`;
    description.textContent = tab.dataset.stateDescription;
  };
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target === undefined) return;
      event.preventDefault();
      select(tabs[target]);
      tabs[target].focus();
    });
  });
});
