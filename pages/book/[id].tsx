import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import prisma from "../../lib/prisma";
import Router from "next/router";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useState } from "react";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const book = await prisma.book.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: {
          last_name: true,
          first_name: true,
        },
      },
      genre: {
        select: {
          genre: true,
        },
      },
      user_books: {
        select: {
          user_id: true,
          status: true,
          review: {
            select: {
              rating: true,
              notes: true,
            },
          },
        },
      },
    },
  });
  return {
    props: book,
  };
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const ReviewForm = (book, session) => {
  // get user
  console.log(session);
  const userEmail = session.user.email;
  const { data, error } = useSWR(`/api/user/${userEmail}`, fetcher);
  console.log(data);
  // const userId = data.id;
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");
  const submitReview = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { userBookId, rating, notes };
      await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      await Router.push(`/book/${book.id}`);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={submitReview}>
      <label htmlFor="rating">Rating</label>
      <input
        autoFocus
        required
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        placeholder="Rating"
        type="number"
        value={rating}
      />
      <label htmlFor="notes">Notes</label>
      <input
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Notes"
        type="textarea"
        value={notes}
      />
      <input type="submit" value="Add Review" />
    </form>
  );
};

const Book: React.FC<BookProps> = (book) => {
  const { data: session, status } = useSession();
  console.log(session);
  return (
    <Layout>
      <div>
        <h2>{book.title}</h2>
        <h3>
          {book.author.first_name} {book.author.last_name}
        </h3>
        <small>{book.genre.genre}</small>
        <ul>
          {book.user_books.map((user_book) => {
            <li>{user_book.review?.rating}</li>;
          })}
        </ul>
        {session ? <ReviewForm book={book} session={session} /> : "Loading..."}
      </div>
      <style jsx>{`
        .page {
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  );
};

export default Book;
