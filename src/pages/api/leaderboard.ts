import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function leaderboard(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const users = await prisma.user.findMany({
        orderBy: {
            points: "desc",
        },
        select: {
            name: true,
            points: true,
            streak: true,
        },
    });
    
    res.status(200).json(users);
}
