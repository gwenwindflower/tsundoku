import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const userBookId = req.query.id;
  if (req.method === "DELETE") {
    const userBook = await prisma.userBook.delete({
      where: { id: userBookId },
    });
    res.json(userBook);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
