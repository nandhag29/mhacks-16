import { useEffect, useState } from "react";

export default function Leaderboard() {
    const [leaderboardData, setLeaderboardData] = useState(null);

    useEffect(() => {
        const fetchLeaderboardData = async () => {
            const res = await fetch("/api/leaderboard");
            const json = await res.json();
            setLeaderboardData(json);
        };

        fetchLeaderboardData();
    }, []);

    return (
        <div>
            <h1 className="font-bold text-xl mb-3 text-center">Leaderboard</h1>

            <div className="flex mt-5">
                <p className="w-10 font-bold" />
                <p className="w-48 font-bold">Name</p>
                <p className="w-24 font-bold">Points</p>
                <p className="font-bold">Streak</p>
            </div>

            { leaderboardData && leaderboardData.map((user: any, i: number) => {
                return (
                    <div key={i} className="flex">
                        <p className="w-10 font-bold">{i + 1}</p>
                        <p className="w-48">{ user.name }</p>
                        <p className="w-24"> { user.points }</p>
                        <p> { user.streak } 🔥</p>
                    </div>
                );
            })}
        </div>
    );
}
