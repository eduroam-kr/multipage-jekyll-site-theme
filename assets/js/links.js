// 본문에서 밖으로 나가는 링크는 새 탭에서 연다.
//
// 읽던 쪽을 잃지 않게 하려는 것이다. 대상은 <main> 안의 링크 중 다른 사이트로
// 가는 것과 내려받는 파일(PDF 따위)이다. 같은 사이트 안의 쪽은 그대로 둔다 —
// 오가며 읽는 글이라 탭이 쌓이면 되레 불편하다.
//
// 머리글·바닥글은 건드리지 않는다. 거기 링크는 이미 제 자리에서 target 을
// 정해 두었다.
(function () {
  var FILE = /\.(pdf|xlsx?|pptx?|docx?|zip|csv|png|jpe?g|svg)$/i;
  Array.prototype.forEach.call(document.querySelectorAll('main a[href]'), function (a) {
    if (a.hasAttribute('target')) return;
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return;
    var out = a.host !== window.location.host || FILE.test(a.pathname);
    if (!out) return;
    a.target = '_blank';
    a.rel = a.rel ? a.rel + ' noopener' : 'noopener';
  });
})();
