import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  excerpt: string;
  tags: string[];
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(postsDirectory);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const { data } = matter(
        fs.readFileSync(path.join(postsDirectory, f), "utf8"),
      );
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        readTime: data.readTime as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) || [],
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post & { content: string } {
  const file = path.join(postsDirectory, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    readTime: data.readTime as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    content,
  };
}
