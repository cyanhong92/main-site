// 모바일 작품 팝업: 링크를 누르면 페이지를 옮기지 않고 지금 화면 위에 작품 상세를 불러와 띄움
// Projects 목록과 메인 콜라주에서 같이 씀. 팝업 틀은 components/ProjectModal.astro
// 넓은 화면(웹)에서는 가로채지 않고 원래대로 상세 페이지로 이동함
import { isMobile } from './breakpoints.js';

export function setupProjectModal(links, { onDesktopClick } = {}) {
  const overlay = document.querySelector('.pm-overlay');
  if (!overlay) return;
  const box = overlay.querySelector('.pm-panel');
  const pageTitle = document.title;

  async function openModal(href, push) {
    const res = await fetch(href);
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const article = doc.querySelector('.project-article');
    if (!article) return (location.href = href); // 실패하면 그냥 상세 페이지로 이동
    box.innerHTML = article.innerHTML;
    overlay.hidden = false;
    overlay.scrollTop = 0;
    document.documentElement.style.overflow = 'hidden'; // 뒤 화면은 그 자리에 멈춤
    document.title = doc.title;
    if (push) history.pushState({ modal: href }, '', href); // 주소창도 작품 주소로
  }

  function closeModal() {
    overlay.hidden = true;
    box.innerHTML = '';
    document.documentElement.style.overflow = '';
    document.title = pageTitle;
  }

  // ×·배경·Esc → 브라우저 뒤로가기와 같게 처리 (주소도 원래 화면으로 돌아감)
  overlay.querySelector('.pm-close').addEventListener('click', (e) => {
    e.preventDefault();
    history.back();
  });
  overlay.querySelector('.pm-backdrop').addEventListener('click', () => history.back());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) history.back();
  });
  window.addEventListener('popstate', (e) => {
    if (e.state && e.state.modal) openModal(e.state.modal, false);
    else if (!overlay.hidden) closeModal();
  });

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      if (isMobile()) {
        e.preventDefault();
        openModal(link.getAttribute('href'), true);
      } else if (onDesktopClick) {
        onDesktopClick(link);
      }
    });
  });
}
