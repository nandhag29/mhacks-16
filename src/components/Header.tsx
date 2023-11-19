import Link from "next/link";
import Logo from "./Logo";

function Header() {
    return (
        <nav className="flex justify-between bg-gray-800 h-16 align-center text-milk text-slate-100">
            <Logo />
            <div className="flex items-center mr-1">
                <Link className="font-black pr-14 text-3xl" href="/play">Play!</Link>
                <Link className="font-black pr-14 text-3xl" href="/profile">Profile</Link>
            </div>
        </nav>
    );
}

export default Header;
