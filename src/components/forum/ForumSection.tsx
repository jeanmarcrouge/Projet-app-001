"use client";

import { FormEvent, useState } from "react";
import { Card } from "@/components/common/Card";
import { useAppContext } from "@/context/AppContext";

export function ForumSection() {
  const { forumPosts, addForumPost, currentUser } = useAppContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !content.trim()) {
      return;
    }

    addForumPost(title.trim(), content.trim());
    setTitle("");
    setContent("");
  };

  return (
    <Card title="Forum" subtitle="Espace d'échange entre entrepreneurs">
      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-5 space-y-3 rounded-xl border border-zinc-200 p-4">
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Titre de votre sujet"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Partagez votre question ou retour d'expérience"
            rows={3}
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm outline-none ring-zinc-800 focus:ring"
          />
          <button
            type="submit"
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-700"
          >
            Publier
          </button>
        </form>
      ) : null}

      <ul className="space-y-3">
        {forumPosts.map((post) => (
          <li key={post.id} className="rounded-xl border border-zinc-200 p-4">
            <div className="mb-1 flex items-center justify-between gap-3">
              <h3 className="font-medium text-zinc-900">{post.title}</h3>
              <span className="text-xs text-zinc-500">{post.likes} likes</span>
            </div>
            <p className="text-sm text-zinc-600">{post.content}</p>
            <p className="mt-2 text-xs text-zinc-500">
              {post.authorName} · {post.authorCompanyType} · {new Date(post.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}
