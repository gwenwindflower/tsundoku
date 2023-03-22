import React from "react";
import Router from "next/router";

export type BookProps = {
  id: string;
  title: string;
  author: {
    last_name: string;
    first_name: string;
  };
  genre: {
    genre: string;
  };
  user_books: UserBookProps[];
};

export type UserBookProps = {
  id: string;
  book_id: string;
  user_id: string;
  status: string;
  user: User;
  review: {
    rating: number;
    notes: string;
  };
};

export type User = {
  id: string;
  email: string;
};

const Book: React.FC<{ book: BookProps }> = ({ book }) => {
  return (
    <div onClick={() => Router.push("/book/[id]", `/book/${book.id}`)}>
      <h2>{book.title}</h2>
      <h3>
        {book.author.first_name} {book.author.last_name}
      </h3>
      <style jsx>{`
        div {
          padding: 2rem;
        }
      `}</style>
    </div>
  );
};

export default Book;
