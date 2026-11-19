// 프로젝트 목록을 언어별로 정리해서 돌려주는 함수
// 폴더 이름이 주소가 됨: src/content/projects/underland/ → /projects/underland
import { getCollection } from 'astro:content';

// 분류 이름 (ko.md의 category 값 → 화면에 보이는 글자)
const CATEGORY_LABELS = {
  ko: { work: '작업', collaboration: '협업', research: '연구', teaching: '교육' },
  en: { work: 'Artwork', collaboration: 'Collaboration', research: 'Research', teaching: 'Teaching' },
};

export async function getProjects(lang = 'ko') {
  const all = await getCollection('projects');

  // 'underland/ko' → 폴더 'underland', 언어 'ko'
  const bySlug = {};
  for (const entry of all) {
    const [slug, file] = entry.id.split('/');
    bySlug[slug] ??= {};
    bySlug[slug][file] = entry;
  }

  return Object.entries(bySlug)
    .filter(([, files]) => files.ko && !files.ko.data.draft)
    .map(([slug, files]) => {
      const meta = files.ko.data; // 연도·이미지·순서는 ko.md에서 가져옴
      const entry = files[lang] ?? files.ko; // 영문 파일이 없으면 한글로 대신 보여줌
      return {
        slug,
        title: entry.data.title,
        year: meta.year ?? '',
        category: meta.category ? CATEGORY_LABELS[lang][meta.category] : '',
        // 카드·상세에 보이는 줄: '2025 · 작업'
        meta: [meta.year, meta.category && CATEGORY_LABELS[lang][meta.category]].filter(Boolean).join(' · '),
        cover: meta.cover,
        coverMotion: meta.coverMotion, // 있으면 상세 페이지 첫 이미지로 씀
        order: meta.order ?? 999,
        entry,
      };
    })
    // 최신 연도부터 ('2023–2025'처럼 기간이면 끝 연도 기준), 같은 해면 order 작은 것부터 (CV 순서)
    .sort((a, b) => endYear(b.year) - endYear(a.year) || a.order - b.order || a.slug.localeCompare(b.slug));
}

// '2023–2025' → 2025, '2024' → 2024
function endYear(year) {
  const years = String(year).match(/\d{4}/g);
  return years ? Number(years[years.length - 1]) : 0;
}
