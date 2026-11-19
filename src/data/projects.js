// 프로젝트 목록. 위에서부터 순서대로 카드가 놓임
// slug: 상세 페이지 주소 (예: 'underland' → /projects/underland). 영문 소문자·숫자·하이픈만
// image: src/assets/ 안의 이미지를 import해서 넣음 (없으면 null → 회색 빈 칸)
// text: 상세 페이지 본문. 문단은 배열로 나눔
// 예) import underland from '../assets/projects/underland.jpg';
//     {
//       slug: 'underland',
//       title: { ko: '언더랜드', en: 'The Underland' },
//       year: '2024',
//       image: underland,
//       text: { ko: ['첫 문단', '둘째 문단'], en: ['First paragraph'] },
//     },

// 아래 6개는 레이아웃 확인용 임시 카드. 실제 작품을 넣을 때 지우면 됨
const sample = (n, year) => ({
  slug: `sample-${n}`,
  title: { ko: `프로젝트 제목 ${n}`, en: `Project Title ${n}` },
  year,
  image: null,
  text: {
    ko: ['작품 설명이 들어가는 자리.', '문단을 나누려면 배열에 항목을 추가.'],
    en: ['Project description goes here.', 'Add items to the array for more paragraphs.'],
  },
});

export const projects = [
  sample(1, '2025'),
  sample(2, '2025'),
  sample(3, '2024'),
  sample(4, '2024'),
  sample(5, '2023'),
  sample(6, '2023'),
];
