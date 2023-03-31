import Router from "next/router";
import useSWR from "swr";
import { useState } from "react";
import { BookProps } from "./Book";

type ReviewFormProps = {
  book: BookProps;
  userEmail: string;
};

type UserQueryParams = {
  userEmail: string;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const useUserQuery = ({ userEmail }: UserQueryParams) => {
  return useSWR(`/api/user/${userEmail}`, fetcher);
};

const ReviewForm: React.FC<ReviewFormProps> = (props) => {
  const { data, error } = useUserQuery(props);
  const [rating, setRating] = useState("");
  const [notes, setNotes] = useState("");

  if (!data) {
    return <p>Loading...</p>;
  }
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
};

export default ReviewForm;
