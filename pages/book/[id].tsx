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
          id: true,
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

type ReviewFormProps = {
  book: BookProps;
  userEmail: string;
};

const ReviewForm: React.FC<ReviewFormProps> = (props) => {
  // get user
  const { data, error } = useSWR(`/api/user/${props.userEmail}`, fetcher);
  // when user is fetched, get the user book for this book that is associated with them
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  if (data) {
    const userBook = props.book.user_books.find((user_book) => {
      return user_book.user_id === data.id;
    });
    const userBookId = userBook.id;

    const submitReview = async (e: React.SyntheticEvent) => {
      e.preventDefault();
      try {
        const body = { userBookId, rating, notes };
        await fetch("/api/review", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        await Router.push(`/book/${props.book.id}`);
      } catch (error) {
        console.error(error);
      }
    };
    return (
      <div>
        {userBook.review ? (
          <div>
            <p>Your rating: {userBook.review.rating}</p>
            <p>Your notes: {userBook.review.notes}</p>
          </div>
        ) : (
          ""
        )}
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
      </div>
    );
  } else {
    return <p>Loading...</p>;
  }
};

const Book: React.FC<BookProps> = (book) => {
  const { data: session, status } = useSession();
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
        {session ? (
          <ReviewForm book={book} userEmail={session.user.email} />
        ) : (
          "Loading..."
        )}
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
