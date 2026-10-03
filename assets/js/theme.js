// 밝게 / 어둡게 / 시스템 셋 중에서 고른다. Bootstrap 5.3 의 색 모드를 그대로
// 쓰므로 색 값을 직접 정하지 않는다.
//
// Bootstrap 은 [data-bs-theme] 이 없으면 밝은 화면으로 둘 뿐, OS 설정을 보지
// 않는다. 그래서 "시스템" 은 여기서 matchMedia 로 읽어 값을 채워 넣는다.
(function () {
  var icon = { auto: '◐', light: '☀', dark: '☾' };
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;
  var span = btn.querySelector('[data-theme-icon]');
  var items = document.querySelectorAll('[data-theme-set]');
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

  function read() {
    var v;
    try { v = localStorage.getItem('theme'); } catch (e) {}
    return v === 'light' || v === 'dark' ? v : 'auto';
  }

  function apply(v) {
    document.documentElement.dataset.bsTheme =
      v === 'auto' ? (mq && mq.matches ? 'dark' : 'light') : v;
    if (span) span.textContent = icon[v];
    Array.prototype.forEach.call(items, function (el) {
      var on = el.dataset.themeSet === v;
      el.classList.toggle('active', on);
      if (on) el.setAttribute('aria-current', 'true');
      else el.removeAttribute('aria-current');
    });
  }

  apply(read());

  Array.prototype.forEach.call(items, function (el) {
    el.addEventListener('click', function () {
      var v = el.dataset.themeSet;
      try { localStorage.setItem('theme', v); } catch (e) {}
      apply(v);
    });
  });

  // 시스템을 고른 상태에서 OS 설정이 바뀌면 따라간다.
  if (mq && mq.addEventListener) {
    mq.addEventListener('change', function () { if (read() === 'auto') apply('auto'); });
  }
})();
