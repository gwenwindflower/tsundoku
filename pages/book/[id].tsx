import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import { BookProps } from "../../components/Book";
import prisma from "../../lib/prisma";

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
    },
  });
  return {
    props: book,
  };
};

const Book: React.FC<BookProps> = (book) => {
  return (
    <Layout>
      <div>
        <h2>{book.title}</h2>
        <h3>
          {book.author.first_name} {book.author.last_name}
        </h3>
        <small>{book.genre.genre}</small>
      </div>
      <style jsx>{`
        .page {
          background: white;
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
