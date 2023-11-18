import Link from "next/link";

function Header() {
    return (
        <>
            <Link href="/">Home</Link>
            <Link href="/play">Play</Link>
            <Link href="/evolution">Evolution</Link>
        </>
    );
}

export default Header;
