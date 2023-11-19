import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/db";

export default async function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {

    const data = JSON.parse(req.body);
    const email = data.email;

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
    }

    // Amount to change points by
    const inc = user.streak >= 3 ? 2 : 1;

    await prisma.user.update({
        where: { email: email },
        data: {
            points: user.points + inc,
            streak: user.streak + 1,
        },
    });

    res.status(200).end();
}
