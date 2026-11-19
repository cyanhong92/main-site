// 모바일 기준 폭. 스크립트에서 쓰는 값
// CSS의 @media (max-width: 720px)와 같은 값이어야 함 (src/styles/global.css 참고)
export const MOBILE = '(max-width: 720px)';

export const isMobile = () => matchMedia(MOBILE).matches;
