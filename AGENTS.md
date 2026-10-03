# multipage-jekyll-site-theme 작업 규약

[eduroam-kr-nro-web](https://github.com/eduroam-kr/eduroam-kr-nro-web) 과 [eduroam-kr-wiki](https://github.com/eduroam-kr/eduroam-kr-wiki) 가 `remote_theme` 으로 끌어다 쓰는 껍데기다. **여기를 고치면 두 사이트가 같이 바뀐다.**

## 태그로 고정한다

사이트는 `@v1` 처럼 태그를 붙여 쓴다. 태그를 올리는 것이 곧 "개편 적용" 이다. 태그 없이 쓰면 테마를 고치는 순간 두 사이트가 예고 없이 바뀐다.

고친 뒤에는 두 사이트를 모두 빌드해 확인하고 태그를 찍는다.

**태그를 옮기지 말고 새 태그를 찍는다.** `jekyll-remote-theme` 은 태그 이름으로 받아 둔 것을 다시 쓴다. 같은 이름으로 강제로 옮기면 사이트가 옛 테마를 계속 쓰고, 왜 안 바뀌는지 찾느라 시간을 버린다.

## 테마는 사이트를 모른다

사이트마다 다른 것은 테마가 아니라 사이트가 정한다.

| 무엇 | 어디서 |
|---|---|
| 메뉴 항목 | 사이트 `_data/nav.yml` — 항목에 `children` 을 두면 드롭다운이 된다 |
| 사이트 이름·브랜드 | 사이트 `_config.yml` 의 `title`, `brand`, `brand_en` |
| 국·영문 두 벌 여부 | 사이트 `_config.yml` 의 `bilingual` |
| 쪽마다 다른 head·script | 사이트가 `_includes/head-extra.html`, `_includes/body-end.html` 를 두어 덮어쓴다 |
| 사이트 고유 스타일 | 사이트 `assets/css/site.css` (테마 css 뒤에 실린다). **사이트마다 반드시 둔다** — 테마는 이 파일을 들고 있지 않다 |
| 틀 너비 | 사이트 `_config.yml` 의 `wrap`, `wrap_wide` (기본 56rem / 72rem) |

테마에 `if site.title == ...` 같은 분기를 넣지 않는다. 분기가 필요하면 설정 항목을 하나 만든다.

## front matter 로 켜는 것

| 키 | 기본 | 뜻 |
|---|---|---|
| `toc` | 없음 | 참이면 오른쪽 목차. 좁은 화면에서는 접힌다 |
| `print` | `full` | `clean` 이면 인쇄에서 머리글·바닥글을 뺀다 |
| `print_toc` | `true` | `false` 면 인쇄에서 목차를 뺀다 |

## 색을 직접 정하지 않는다

Bootstrap 5.3 기본 팔레트를 그대로 쓴다. `assets/css/theme.css` 에 hex 값을 넣지 않는다. 지금 예외는 없다 — 사진 위 글자처럼 테마와 무관하게 색이 정해져야 하는 것은 사이트 css 에 둔다.

## 권리 고지 문구

`_includes/footer.html` 의 `BEGIN/END eduroam-KR notice` 사이는 NRO 가 정한 공통 문구다. 한 글자도 바꾸지 않는다. [onepage-html-site-theme](https://github.com/eduroam-kr/onepage-html-site-theme) 의 같은 문구와 글자까지 같아야 하므로, 고칠 일이 생기면 두 저장소를 같이 고친다.

## 커밋

```text
<type>: <무엇을 왜 했는지>
```

`feat` 새 기능 · `fix` 고침 · `docs` 문구 · `chore` 설정·도구. `Claude-Session` 은 기재하지 않는다 (public 저장소).

## 문서

하드 랩 금지 — 문단·목록 항목을 각각 한 줄로 쓰고 줄바꿈은 렌더러에 맡긴다.
