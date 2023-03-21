import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { book_id, user_email, status } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      email: String(user_email),
    },
  });

  const UserBook = await prisma.userBook.create({
    data: { user_id: user.id, book_id: book_id, status: status },
  });

  res.json(UserBook);
}
