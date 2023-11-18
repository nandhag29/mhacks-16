import Link from "next/link";
import Header from "../components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col text-center">
        <h1 className="text-4xl mt-8">Learn ASL and evolve characters!</h1>
        <Link className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-60" href="/profile">View Profile or Sign Up</Link>
        <Link className="text-xl m-auto mt-8 bg-blue-700 text-white border border-blue-700 font-bold py-2 px-6 rounded-lg w-40" href="/play">Play Now!</Link>
      </div>
    </main>
  )
}
