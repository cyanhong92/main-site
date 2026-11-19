// 프로젝트 목록을 언어별로 정리해서 돌려주는 함수
// 폴더 이름이 주소가 됨: src/content/projects/underland/ → /projects/underland
import { getCollection } from 'astro:content';

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
        cover: meta.cover,
        order: meta.order ?? 0,
        entry,
      };
    })
    // 최신 연도부터, 같은 해면 order 작은 것부터, 그래도 같으면 폴더 이름순
    .sort((a, b) => b.year.localeCompare(a.year) || a.order - b.order || a.slug.localeCompare(b.slug));
}
