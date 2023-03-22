import { useSession } from "next-auth/react";
import React from "react";
import Book, { BookProps } from "./Book";
import Router from "next/router";

const BookListing: React.FC<{ book: BookProps }> = ({ book }) => {
  const { data: session, status } = useSession();

  const [saving, setSaving] = React.useState(false);

  const collectBook = async (
    book: BookProps,
    email: string,
    status: string
  ) => {
    // setSaving(true);
    const userBookIds = {
      book_id: book.id,
      user_email: email,
      status: status,
    };
    try {
      await fetch(`/api/collect`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userBookIds),
      });
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const unCollectBook = async (id: string) => {
    // setSaving(true);
    await fetch(`/api/collect/${id}`, {
      method: "DELETE",
    });
    Router.push("/");
  };

  let CollectButtons = null;

  if (session) {
    const userEmail = session.user.email;
    let userBook = book.user_books.find(
      (userBook) => userBook.user.email == userEmail
    );
    if (userBook) {
      CollectButtons = (
        <div>
          <span>
            This book is on your <em>{userBook.status}</em> shelf{" "}
          </span>
          <button onClick={() => unCollectBook(userBook.id)}>
            Remove from shelf
          </button>
        </div>
      );
    } else
      CollectButtons = (
        <div>
          <button onClick={() => collectBook(book, userEmail, "want")}>
            Want to read
          </button>
          <button onClick={() => collectBook(book, userEmail, "read")}>
            Mark as read
          </button>
        </div>
      );
  }

  return (
    <div>
      <Book book={book} />
      {CollectButtons}
      <style jsx>{`
        div {
          background: lavender;
        }
      `}</style>
    </div>
  );
};

export default BookListing;
