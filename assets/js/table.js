// 좁은 화면에서 표를 쌓아 보이게 하려고, 각 칸에 머리글 이름을 붙인다.
//
// CSS 만으로는 칸이 어느 열인지 알 수 없다. 마크다운으로 쓴 표에는 data-label
// 을 적을 자리가 없으니 여기서 넣는다. 쌓는 일 자체는 theme.css 가 한다.
(function () {
  Array.prototype.forEach.call(document.querySelectorAll('.doc-body table'), function (t) {
    var head = t.querySelectorAll('thead th');
    if (!head.length) return;
    var names = Array.prototype.map.call(head, function (th) { return th.textContent.trim(); });
    Array.prototype.forEach.call(t.querySelectorAll('tbody tr'), function (tr) {
      Array.prototype.forEach.call(tr.children, function (td, i) {
        if (names[i]) td.setAttribute('data-label', names[i]);
        // 빈 칸은 쌓았을 때 이름만 남아 거슬린다. 아예 감춘다.
        if (td.textContent.trim() === '') td.setAttribute('data-blank', '');
      });
    });
    t.setAttribute('data-stack', '');
  });
})();
