import Link from "next/link";

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

const UserBookListItem: React.FC<{ user_book: UserBookProps }> = ({
  user_book,
}) => {
  return (
    <li key={user_book.id}>
      <Link href={`/book/${user_book.book.id}`}>
        {user_book.book.title} - {user_book.status} -{" "}
        {user_book.review?.rating ? user_book.review.rating : "unrated"}
      </Link>
    </li>
  );
};

export default UserBookListItem;
