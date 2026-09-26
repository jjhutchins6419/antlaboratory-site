/* Fills in the links and names from site-config.js. The pages read fine without it. */
(function () {
  var S = window.ANTLAB_SITE || {};
  var all = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  // the App Store button: a link once the app is live, "coming soon" until then
  all('[data-store]', function (a) {
    var k = a.querySelector('.st-k'), t = a.querySelector('.st-t');
    if (S.appStore) {
      a.href = S.appStore; a.rel = 'noopener';
      if (k) k.textContent = 'Get it on the';
      if (t) t.textContent = 'App Store' + (S.price ? ' · ' + S.price : '');
    } else {
      a.removeAttribute('href');
      if (k) k.textContent = 'Coming soon';
      if (t) t.textContent = 'On the App Store';
    }
  });
  all('[data-price]', function (e) { if (S.price) e.textContent = S.price; });
  // the forum: links appear only when there is one
  all('[data-forum]', function (a) { if (S.forum) { a.href = S.forum; a.hidden = false; a.rel = 'noopener'; } else a.hidden = true; });
  all('[data-forum-only]', function (e) { e.hidden = !S.forum; });
  // email: a mailto link, or the fallback text next to it
  all('[data-email]', function (a) {
    if (S.supportEmail) { a.href = 'mailto:' + S.supportEmail + (a.dataset.email ? '?subject=' + encodeURIComponent(a.dataset.email) : ''); if (!a.dataset.keep) a.textContent = S.supportEmail; a.hidden = false; }
    else a.hidden = true;
  });
  all('[data-email-only]', function (e) { e.hidden = !S.supportEmail; });
  all('[data-no-email]', function (e) { e.hidden = !!S.supportEmail; });
  all('[data-owner]', function (e) { if (S.owner) e.textContent = S.owner; });
  all('[data-year]', function (e) { e.textContent = String(new Date().getFullYear()); });
})();
