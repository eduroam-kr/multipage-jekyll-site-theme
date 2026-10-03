// GitHub 의 경고 블록 문법을 색 상자로 바꾼다.
//
//   > [!WARNING]
//   > 본문
//
// GitHub 은 이 문법을 그대로 렌더하지만 kramdown 은 모른다. 마크다운을 양쪽에서
// 같게 쓰려고, 만들어진 blockquote 의 첫 줄을 보고 여기서 바꾼다.
(function () {
  var LABEL = {
    NOTE: '참고', TIP: '도움말', IMPORTANT: '중요',
    WARNING: '주의', CAUTION: '경고'
  };
  var re = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*/;
  Array.prototype.forEach.call(document.querySelectorAll('blockquote > p:first-child'), function (p) {
    var m = re.exec(p.textContent);
    if (!m) return;
    var kind = m[1];
    p.innerHTML = p.innerHTML.replace(re, '');
    var q = p.parentNode;
    q.classList.add('callout', 'callout-' + kind.toLowerCase());
    var label = document.createElement('span');
    label.className = 'callout-label';
    label.textContent = LABEL[kind];
    q.insertBefore(label, p);
    if (p.textContent.trim() === '' && p.children.length === 0) p.remove();
  });
})();
