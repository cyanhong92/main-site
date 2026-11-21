// 콘텐츠 설정: src/content/projects/ 안의 마크다운 파일을 '프로젝트'로 읽음
// 작품 하나 = 폴더 하나. 폴더 안에 ko.md(한글), en.md(영문), 이미지 파일
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // 아래 항목은 ko.md에만 쓰면 됨 (en.md는 title만)
      year: z.coerce.string().optional(),
      // 분류: work(작업) · collaboration(협업) · research(연구) · teaching(교육)
      category: z.enum(['work', 'collaboration', 'research', 'teaching']).optional(),
      cover: image().optional(), // 카드(16:9로 잘림)·상세 대표 이미지
      coverMotion: image().optional(), // 상세 페이지에서만 커버 대신 보여줄 움직이는 이미지 (gif)
      quote: z.string().optional(), // 메인 콜라주에 뜨는 한 줄 (ko.md·en.md 각각)
      order: z.number().optional(), // 같은 해 안에서 순서 (작을수록 앞)
      draft: z.boolean().optional(), // true면 사이트에 안 보임
    }),
});

export const collections = { projects };
