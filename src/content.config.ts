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
      cover: image().optional(), // 카드·상세 대표 이미지 (4:3으로 잘려 보임)
      order: z.number().optional(), // 같은 해 안에서 순서를 정하고 싶을 때 (작을수록 앞)
      draft: z.boolean().optional(), // true면 사이트에 안 보임
    }),
});

export const collections = { projects };
