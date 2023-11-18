import { useEffect, useState } from "react";

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
    const [feedback, setFeedback] = useState<string>("");
    const [correct, setCorrect] = useState<boolean>(false);

    useEffect(() => {
        setImage(generateRandom());
    }, []);

    function generateNew() {
        setImage(generateRandom);
        setFeedback("");
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
        <h1>Play</h1>
        { image &&
            <>
                <img src={image} />
                { correct &&
                    <p>Correct: { generateImageCorrect(image) }</p>
                }
            </>
        }
        <button onClick={generateNew}>Generate new</button>
        <button></button>
        <input type="text" placeholder="enter the word here..." onChange={ (event) => setText(event.target.value) } />
        <button onClick={ () => setCorrect(!correct) }>Show correct</button>
        <button onClick={submitGuess}>Guess!</button>
        <p>{ feedback }</p>
        </main>
    )
}

