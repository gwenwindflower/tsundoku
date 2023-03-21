import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const userEmail = req.query.email;
  const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  res.json(user);
}
