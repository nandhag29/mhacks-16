import { useEffect, useState } from "react";
import Header from "../components/header";

// TODO
// Maybe remove images after they've been seen

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

    useEffect(() => {
        setImage(generateRandom());
    }, []);

    function generateNew() {
        setImage(generateRandom);
        setFeedback(null);
    }

    function submitGuess() {
        if (generateImageCorrect(image || "") === generateGuessCorrect(text)) {
            setFeedback("correct! +1");
        } else {
            setFeedback("Wrong");
        }
    }

    return (
        <main>
        <Header />
        <div className="flex flex-col w-1/2 m-auto">
            <h1>Play</h1>
            { image &&
                <>
                    <img width="300px" height="300px" src={image} />
                    { correct ?
                        <p className="h-2">Correct: { generateImageCorrect(image) }</p>
                        :
                        <p className="h-2" />
                    }
                </>
            }
        
            <button onClick={ () => setCorrect(!correct) }>Show correct</button>
            <input type="text" placeholder="enter the word here..." onChange={ (event) => setText(event.target.value) } />
            <button onClick={submitGuess}>Guess!</button>
            { feedback ?
                <p className="h-2">{ feedback }</p>
                :
                <p className="h-2" />
            }
            <button onClick={generateNew}>Generate new</button>
        </div>
        </main>
    )
}

