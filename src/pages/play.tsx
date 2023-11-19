import { useEffect, useState } from "react";
import Header from "../components/header";
import { useSession, signIn } from "next-auth/react";
import Picture from '../components/Picture';
import Leaderboard from "@/components/leaderboard";

// TODO
// Maybe remove images after they've been seen
// Timers for feedback / showing correct


const IMAGES = [
    "Goodbye.png",
    "Hello.png",
    "ILoveYou.png",
    "No.png",
    "Please.png",
    "Sorry.png",
    "ThankYou.png",
    "Yes.png",
    "YoureWelcome.png",
]

function getEvolution(points: number) {
    if (points < 20) {
        return "Biff.png";
    } else if (points < 40) {
        return "Buuf.png";
    } else {
        return "Boof.png";
    }

}

function generateRandom(): string {
    return IMAGES[Math.floor(Math.random() * 9)]
}

function generateImageCorrect(input: string): string {
    return input.substring(0, input.length - 4).replace(/[^a-zA-Z]/g, '').toLowerCase();
}

function generateGuessCorrect(input: string): string {
    return input.replace(/[^a-zA-Z]/g, '').toLowerCase();
}

export default function Play() {
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [feedback, setFeedback] = useState<string | null>(null);
    const [correct, setCorrect] = useState<boolean>(false);
    const [profileData, setProfileData] = useState(null);

    // Authentication
    const { data: session } = useSession()

    useEffect(() => {
        setImage(generateRandom());
    }, []);

    function deceptiveUpdate(correct: boolean) {
        if (!session) return

        if (correct) {
            let copy = profileData;
            copy.points += copy.streak >= 3 ? 2 : 1;
            copy.streak += 1;
            setProfileData(copy);
        } else {
            let copy = profileData;
            copy.streak = 0;
            setProfileData(copy);
        }
    }

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!session || !session.user) {
                return;
            }
    
            const res = await fetch("/api/get_profile?email=" + session.user.email);
            const json = await res.json();
            setProfileData(json);
        };

        fetchProfileData();
    }, [session]);

    function submitGuess() {
        if (!text) return;

        if (generateImageCorrect(image || "") === generateGuessCorrect(text)) {
            setFeedback("correct!");
            setImage(generateRandom());
            setText("");
            setCorrect(false);
            deceptiveUpdate(true);
            if (session && session.user && session.user.email) {
                fetch('/api/correct', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: session.user.email,
                    }),
                });
            }
        } else {
            setFeedback("wrong, try again!");
            setText("");
            deceptiveUpdate(false);
            if (session && session.user && session.user.email) {
                fetch('/api/incorrect', {
                    method: 'POST',
                    body: JSON.stringify({
                        email: session.user.email,
                    }),
                });
            }
        }
    }

    function toggleShowAnswer() {
        if (!correct && session && session.user) {
            fetch('/api/incorrect', {
                method: 'POST',
                body: JSON.stringify({
                    email: session.user.email,
                }),
            });
        }
        setCorrect(!correct);
    }

    return (
        <main>
        <Header />
         {/* <div className="flex flex-col w-1/2 m-auto text-center"> */}
         <div className="flex justify-between mt-10">
            <div className="flex-1 w-1/3">
                <div className="pl-16 mt-3">
                    <Leaderboard />
                </div>
            </div>
            <div className="flex-1 w-1/3">
            <div className="h-60 mt-5">
            { image &&
                <>
                    <Picture src={image} />
                    <div className="text-center">
                    { correct ?
                        <p className="h-2 mb-3">answer: { generateImageCorrect(image) }</p>
                        :
                        <p className="h-2 mb-3" />
                    }
                    </div>
                </>
            }
            </div>
            <div className="flex flex-col justify-center">
            <button className="text-red-400 mt-10" onClick={toggleShowAnswer}>Show Answer</button>
            <br />
            <input className="ml-auto mr-auto w-60 mt-5 mb-5 p-1 outline-dashed rounded" type="text" placeholder="enter the word here..." value={text} onChange={ (event) => setText(event.target.value) } />
            <br />
            <button className="m-auto mb-4 bg-emerald-700 text-white border border-emerald-700 font-bold py-2 px-6 rounded-lg w-40" onClick={submitGuess}>Guess!</button>
            <div className="text-center">
            { feedback ?
                <p className="h-2 mb-5">{ feedback }</p>
                :
                <p className="h-2 mb-5" />
            }
            </div>
            </div>
            </div>
            <div className="flex-1 w-1/3 text-center">
            { profileData ?
                <>
                    <p>Your points: <span className="font-bold">{ profileData.points } ✅</span></p>
                    { profileData.streak > 2 ?
                        <p>Your current streak: <span className="font-bold">{ profileData.streak } 🔥</span></p>
                        :
                        <p>Your current streak: <span className="font-bold">{ profileData.streak } 😢</span></p>
                    }
                    <div className="overflow-hidden m-auto">
                        {profileData.points === 20 || (profileData.points === 21 && profileData.streak > 3) ? <img width="400" height="400" src={"BUUFspark.gif"} alt="BUUFspark.gif" /> :
                        profileData.points === 40 || (profileData.points === 41 && profileData.streak > 3) ? <img width="400" height="400" src={"BOOFspark.gif"} alt="BOOFspark.gif" /> : <img width="400" height="400" src={getEvolution(profileData.points)} alt="Evolution.gif" />}
                    </div>
                </>
                :
                <>
                    <p className="mt-8">Create an account or sign in to track your progress!</p>
                    <button className="m-auto mt-4 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={() => signIn()}>Sign In</button>
                </>
            }
            </div>
        </div>
        </main>
    )
}
