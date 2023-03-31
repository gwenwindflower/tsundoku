import { GetServerSideProps } from "next";
import React from "react";
import Layout from "../../components/Layout";
import prisma from "../../lib/prisma";
import UserBookListItem from "../../components/UserBookListItem";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      id: String(params.id),
    },
    include: {
      user_books: {
        select: {
          id: true,
          status: true,
          book: {
            select: {
              id: true,
              title: true,
              author: true,
            },
          },
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
    props: {
      user: user,
    },
  };
};

type User = {
  id: string;
  name: string;
  email: string;
  user_books: any;
};

type Props = {
  user: User;
};

const UserPage: React.FC<Props> = (props) => {
  const { user } = props;
  return (
    <Layout>
      <h1>{user.name}</h1>
      <h2>{user.email}</h2>
      <ul>
        {user.user_books.map((user_book) => (
          <UserBookListItem user_book={user_book} />
        ))}
      </ul>
    </Layout>
  );
};

export default UserPage;
