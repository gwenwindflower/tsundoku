import { GetServerSideProps } from "next";
import React from "react";
import prisma from "../../lib/prisma";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const user = await prisma.user.findUnique({
    where: {
      email: String(params?.id),
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
};

type Props = {
  user: User;
};

const UserPage: React.FC<Props> = (props) => {
  return (
    <div>
      <h1>{props.user.email}</h1>
    </div>
  );
};

export default UserPage;
