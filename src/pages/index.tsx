import Link from "next/link";
import Header from "../components/header";

export default function Home() {
  const biffStyle = {
    transform: "scale(3.0)",
  };

  return (
    <main>
      <Header />
      <div className="flex justify-center mt-20">
        <div className="overflow-hidden w-96 h-96">
          <img style={biffStyle} src="Biff.png" />
        </div>

        <div className="flex flex-col text-center items-center justify-center">
          <h1 className="font-bold text-4xl mt-2">Learn ASL and evolve characters!</h1>
          <Link className="text-xl mt-8 mb-4 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-64" href="/profile">Sign Up</Link>
          <Link className="text-xl mt-0 bg-emerald-700 text-white border border-emerald-700 font-bold py-2 px-6 rounded-lg w-64" href="/play">Play Now!</Link>
        </div>

      </div>
    </main>
  )
}
