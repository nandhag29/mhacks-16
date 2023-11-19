import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.query;

    if (typeof email !== "string") {
        res.status(400).json({ message: "Missing id" });
        return;
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    res.status(200).json({
        points: user.points,
        streak: user.streak,
        evolution: user.evolution,
    });
}
