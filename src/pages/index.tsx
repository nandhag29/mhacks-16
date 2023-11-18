import Link from "next/link";
import Header from "../components/header";

export default function Home() {
  return (
    <main>
      <Header />
      <h1>Yo</h1>
      <Link href="/play" >PLAY</Link>
    </main>
  )
}
