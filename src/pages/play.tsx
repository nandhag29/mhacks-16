import { useEffect, useState } from "react";
import Header from "../components/header";
import { useSession } from "next-auth/react";
import Picture from '../components/Picture';

// TODO
// Maybe remove images after they've been seen
// Timers for feedback / showing correct
// if an answer is shown, you don't get a point and your streak is lost

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

    // Authentication
    const { data: session } = useSession()

    useEffect(() => {
        setImage(generateRandom());
    }, []);

    function generateNew() {
        setImage(generateRandom);
        setFeedback(null);
        setCorrect(false);
    }

    function submitGuess() {
        if (generateImageCorrect(image || "") === generateGuessCorrect(text)) {
            setFeedback("correct! +1");
            setImage(generateRandom);
            setText("");
            setCorrect(false);
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

    return (
        <main>
        <Header />
        <div className="flex flex-col w-1/2 m-auto text-center">
            <div className="h-60 mt-5">
            { image &&
                <>
                    <Picture src={image} />
                    { correct ?
                        <p className="h-2 mb-3">answer: { generateImageCorrect(image) }</p>
                        :
                        <p className="h-2 mb-3" />
                    }
                </>
            }
            </div>
            <button className="text-red-400 mt-10" onClick={ () => setCorrect(!correct) }>Show Answer</button>
            <input className="ml-auto mr-auto w-60 mt-5 mb-5 p-1 outline-dashed rounded" type="text" placeholder="enter the word here..." value={text} onChange={ (event) => setText(event.target.value) } />
            <button className="m-auto mb-4 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg w-40" onClick={submitGuess}>Guess!</button>
            { feedback ?
                <p className="h-2 mb-5">{ feedback }</p>
                :
                <p className="h-2 mb-5" />
            }
            <button className="m-auto bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={generateNew}>
                Generate New
            </button>
        </div>
        </main>
    )
}
