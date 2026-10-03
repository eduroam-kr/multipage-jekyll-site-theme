// 본문 제목을 모아 오른쪽 목차를 만든다.
//
// 넓은 화면에서는 본문 옆에 붙어 따라오고, 좁으면 접히는 상자가 된다.
// 목차는 쪽마다 다르고 손으로 유지할 거리가 아니라서 화면에서 만든다.
(function () {
  var body = document.querySelector('.doc-body, main .wrap, main');
  var host = document.getElementById('toc');
  if (!host || !body) return;

  var hs = body.querySelectorAll('h2, h3');
  if (hs.length < 3) { host.remove(); return; }

  // 접힘은 CSS 로 다루기 어렵다. details 의 open 을 직접 관리한다.
  // 좁은 화면에서는 접어 두고(본문이 한 화면 넘게 밀리지 않게), 넓어지면 편다.
  // 인쇄 직전에는 무조건 펴서 종이에 목차가 나오게 한다.
  var mq = window.matchMedia('(min-width: 992px)');
  function fit() { if (mq.matches) host.setAttribute('open', ''); else host.removeAttribute('open'); }
  fit();
  if (mq.addEventListener) mq.addEventListener('change', fit);
  window.addEventListener('beforeprint', function () { host.setAttribute('open', ''); });
  window.addEventListener('afterprint', fit);

  var ol = document.createElement('ol');
  var items = [];
  Array.prototype.forEach.call(hs, function (h) {
    if (!h.id) return;
    var li = document.createElement('li');
    li.className = h.tagName === 'H3' ? 'lv3' : 'lv2';
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent.trim();
    li.appendChild(a);
    ol.appendChild(li);
    items.push({ h: h, a: a });
  });
  if (!items.length) { host.remove(); return; }
  host.querySelector('[data-toc-list]').appendChild(ol);

  // 지금 읽고 있는 자리를 표시한다. 화면 위쪽에 들어온 마지막 제목이 기준이다.
  if (!window.IntersectionObserver) return;
  var seen = {};
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { seen[e.target.id] = e.isIntersecting || e.boundingClientRect.top < 0; });
    var on = null;
    items.forEach(function (it) { if (seen[it.h.id]) on = it; });
    items.forEach(function (it) { it.a.classList.toggle('on', it === on); });
  }, { rootMargin: '0px 0px -75% 0px' });
  items.forEach(function (it) { io.observe(it.h); });
})();
