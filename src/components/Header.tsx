import Link from "next/link";

function Header() {
    return (
        <div className="flex justify-between bg-gray-800 h-10 align-center text-milk text-slate-100">
            <div className="flex items-center ml-1">
                <Link className="pl-5" href="/">Home</Link>
            </div>
            <div className="flex items-center mr-1">
                <Link className="pr-5" href="/play">Play</Link>
                <Link className="pr-5" href="/evolution">Evolution</Link>
            </div>
        </div>
    );
}

export default Header;
