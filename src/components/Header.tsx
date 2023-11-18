import Link from "next/link";

function Header() {
    return (
        <div className="flex flex-row justify-between bg-emerald-400">
            <div className="ml-1">
                <Link className="pl-5" href="/">Home</Link>
            </div>
            <div className="mr-1">
                <Link className="pr-5" href="/play">Play</Link>
                <Link className="pr-5" href="/evolution">Evolution</Link>
            </div>
        </div>
    );
}

export default Header;
