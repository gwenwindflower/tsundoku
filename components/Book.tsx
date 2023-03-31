import React from "react";
import Router from "next/router";
import { UserBookProps } from "./UserBookListItem";

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
