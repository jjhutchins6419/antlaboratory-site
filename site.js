/* Fills in the links and names from site-config.js. The pages read fine without it. */
(function () {
  var S = window.ANTLAB_SITE || {};
  var all = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  // Apple's App Store badge once the app is live (Apple licenses the badge only for an app on the App Store), "coming soon"
  // in its place until then
  all('[data-store]', function (a) { if (S.appStore) { a.href = S.appStore; a.rel = 'noopener'; a.hidden = false; } else a.hidden = true; });
  all('[data-store-soon]', function (e) { e.hidden = !!S.appStore; });
  all('[data-price]', function (e) { if (S.price) e.textContent = S.price; });
  // the release note says what is on the App Store, so it shows only while there is a link to it
  all('[data-release-note]', function (e) { e.hidden = !S.appStore; });
  // the forum: links appear only when there is one
  all('[data-forum]', function (a) { if (S.forum) { a.href = S.forum; a.hidden = false; a.rel = 'noopener'; } else a.hidden = true; });
  all('[data-forum-only]', function (e) { e.hidden = !S.forum; });
  // the merch shop: its link once it is open, "opens soon" until then
  all('[data-merch]', function (a) { if (S.merch) { a.href = S.merch; a.hidden = false; a.rel = 'noopener'; } else a.hidden = true; });
  all('[data-no-merch]', function (e) { e.hidden = !!S.merch; });
  // other links by their key in site-config.js (data-link="instagram"): its address, or left out when it is empty, and
  // data-no-link shown in its place; a key the file does not have leaves the page as written (an older, cached copy)
  all('[data-link]', function (a) { var u = S[a.dataset.link]; if (u === undefined) return; if (u) { a.href = u; a.hidden = false; a.rel = 'noopener'; } else a.hidden = true; });
  all('[data-no-link]', function (e) { var u = S[e.dataset.noLink]; if (u !== undefined) e.hidden = !!u; });
  // email: a mailto link, or the fallback text next to it
  all('[data-email]', function (a) {
    if (S.supportEmail) { a.href = 'mailto:' + S.supportEmail + (a.dataset.email ? '?subject=' + encodeURIComponent(a.dataset.email) : ''); if (!a.dataset.keep) a.textContent = S.supportEmail; a.hidden = false; }
    else a.hidden = true;
  });
  all('[data-email-only]', function (e) { e.hidden = !S.supportEmail; });
  all('[data-no-email]', function (e) { e.hidden = !!S.supportEmail; });
  all('[data-owner]', function (e) { if (S.owner) e.textContent = S.owner; });
  all('[data-year]', function (e) { e.textContent = String(new Date().getFullYear()); });
  var shots = Array.prototype.slice.call(document.querySelectorAll('[data-shot]'));
  if (shots.length && typeof HTMLDialogElement !== 'undefined') {
    var viewer = document.createElement('dialog'), selected = 0, returnTo = null;
    viewer.className = 'shot-viewer'; viewer.setAttribute('aria-label', 'Game screenshots');
    viewer.innerHTML = '<div class="shot-toolbar"><span aria-live="polite"></span><div class="shot-controls"><button type="button" data-prev aria-label="Previous screenshot">←</button><button type="button" data-next aria-label="Next screenshot">→</button><button type="button" data-close autofocus>Close</button></div></div><figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(viewer);
    var show = function (i) {
      selected = (i + shots.length) % shots.length;
      var link = shots[selected], source = link.querySelector('img'), caption = link.parentElement.querySelector('figcaption'), picture = viewer.querySelector('img');
      picture.src = link.href; picture.alt = source.alt;
      viewer.querySelector('figcaption').textContent = caption ? caption.textContent : source.alt;
      viewer.querySelector('.shot-toolbar span').textContent = 'Picture ' + (selected + 1) + ' of ' + shots.length;
    };
    shots.forEach(function (link, i) { link.addEventListener('click', function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
      e.preventDefault(); returnTo = link; show(i); viewer.showModal(); document.body.classList.add('viewing-shot');
    }); });
    viewer.querySelector('[data-prev]').addEventListener('click', function () { show(selected - 1); });
    viewer.querySelector('[data-next]').addEventListener('click', function () { show(selected + 1); });
    viewer.querySelector('[data-close]').addEventListener('click', function () { viewer.close(); });
    viewer.addEventListener('click', function (e) { if (e.target === viewer) viewer.close(); });
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); show(selected + (e.key === 'ArrowRight' ? 1 : -1)); }
    });
    viewer.addEventListener('close', function () { document.body.classList.remove('viewing-shot'); if (returnTo) returnTo.focus({ preventScroll: true }); });
  }
})();
