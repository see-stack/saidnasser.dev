import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/" className="text-sm text-accent hover:underline">
        ← Back
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Posts</h1>
      <div className="mt-8 space-y-8">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="block">
            <h2 className="font-medium hover:text-accent">{p.title}</h2>
            <p className="mt-1 text-sm text-muted">{p.excerpt}</p>
            <p className="mt-1 text-xs text-muted">
              {p.date} · {p.readTime}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}
