import Link from "next/link";

function Header() {
    return (
        <div className="flex justify-between bg-gray-800 h-14 align-center text-milk text-slate-100">
            <div className="flex items-center ml-1 text-xl">
                <Link className="font-bold pl-7" href="/">Home</Link>
            </div>
            <div className="flex items-center mr-1">
                <Link className="font-bold pr-7 text-xl" href="/play">Play!</Link>
                <Link className="font-bold pr-7 text-xl" href="/profile">Profile</Link>
            </div>
        </div>
    );
}

export default Header;
