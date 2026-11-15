"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";

import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();

  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return <p>Note not found.</p>;
    }

    return (
      <p>
        Error loading note:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  if (!note) {
    return <p>Note not found.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <article className={css.item}>
          <header className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.tag}>{note.tag}</span>
          </header>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>
        </article>
      </div>
    </main>
  );
}
