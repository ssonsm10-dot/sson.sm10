(() => {
 const dialog = document.querySelector('.pj5-lightbox');
 if (!dialog) return;
 const image = dialog.querySelector('img');
 let trigger;
 document.querySelectorAll('[data-pj5-enlarge]').forEach(button => button.addEventListener('click', () => {
  trigger = button;
  const source = button.querySelector('img');
  image.src = source.src; image.alt = source.alt;
  document.getElementById('pj5-lightbox-title').textContent = source.alt;
  dialog.showModal(); document.body.classList.add('pj5-modal-open');
  dialog.querySelector('.pj5-lightbox-scroll').scrollTop = 0;
 }));
 dialog.querySelector('.pj5-lightbox-close').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => { if(event.target === dialog) dialog.close(); });
 dialog.addEventListener('close', () => { document.body.classList.remove('pj5-modal-open'); trigger?.focus(); });
})();

document.querySelector('.pj5-home-enlarge')?.addEventListener('click', event => { event.currentTarget.closest('figure').querySelector('[data-pj5-enlarge]').click(); });
