import React from "react";
import { GetServerSideProps } from "next";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import ReviewForm from "../../components/ReviewForm";

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
