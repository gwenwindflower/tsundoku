import prisma from "../../../lib/prisma";

// make this all an object that we subsmit with prisma
// if the author doesn't exist we have to add a new one
// if the genre doesn't exist we have to add a new one

export default async function handle(req, res) {
  const { title, authorLastName, authorFirstName, genreName } = req.body;

  const author = await prisma.author.upsert({
    where: {
      first_name_last_name: {
        last_name: String(authorLastName),
        first_name: String(authorFirstName),
      },
    },
    update: {},
    create: {
      last_name: String(authorLastName),
      first_name: String(authorFirstName),
    },
  });

  const genre = await prisma.genre.upsert({
    where: {
      genre: String(genreName),
    },
    update: {},
    create: {
      genre: String(genreName),
    },
  });

  const result = await prisma.book.create({
    data: {
      title: title,
      author: {
        connect: {
          id: author.id,
        },
      },
      genre: {
        connect: {
          id: genre.id,
        },
      },
    },
  });
  res.json(result);
}
