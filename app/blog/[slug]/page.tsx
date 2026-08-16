import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { getAllPosts, getPost } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/blog" className="text-sm text-accent hover:underline">
        ← Back
      </Link>
      <p className="mt-6 text-xs text-muted">
        {post.date} · {post.readTime}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{post.title}</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((t) => (
          <span
            key={t}
            className="rounded-full bg-chip px-2 py-0.5 font-mono text-xs text-muted"
          >
            #{t}
          </span>
        ))}
      </div>
      <article className="prose prose-zinc mt-10 max-w-none dark:prose-invert">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </article>
    </main>
  );
}
