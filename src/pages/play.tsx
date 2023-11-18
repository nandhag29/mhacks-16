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

function generateCorrect(input: string): string {
    return input.substring(0, input.length - 4).replace(/[^a-zA-Z]/g, '').toLowerCase();
}

export default function Play() {
    // Generate flashcards, text box, wtvr
    const [image, setImage] = useState<string | null>(null);
    const [text, setText] = useState<string>("");
    const [feedback, setFeedback] = useState<string>("");

    useEffect(() => {
        setImage(generateRandom());
    }, []);

    function submitGuess() {
        if (generateCorrect(image || "") === generateCorrect(text)) {
            setFeedback("correct!");
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
                <p>Correct: { generateCorrect(image) }</p>
            </>
        }
        <input type="text" placeholder="enter the word here..." onChange={ (event) => setText(event.target.value) } />
        <button onSubmit={submitGuess}>Guess!</button>
        <p>{ feedback }</p>
        </main>
    )
}

