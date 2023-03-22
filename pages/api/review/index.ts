import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const { userBookId, rating, notes } = req.body;
  const review = await prisma.review.upsert({
    where: {
      user_book_id: userBookId,
    },
    update: {
      rating: Number(rating),
      notes: String(notes),
    },
    create: {
      rating: Number(rating),
      notes: String(notes),
      user_book: {
        connect: {
          id: String(userBookId),
        },
      },
    },
  });

  res.json(review);
}
