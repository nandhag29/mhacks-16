import Link from "next/link";

function Header() {
    return (
        <div className="flex justify-between bg-gray-800 h-16 align-center text-milk text-slate-100">
            <div className="flex items-center ml-1 text-xl">
                <Link className="font-bold pl-10" href="/"><img width="375" height="375" src="ASL_EVO_LOGO.png" /></Link>
            </div>
            <div className="flex items-center mr-1">
                <Link className="font-black pr-14 text-3xl" href="/play">Play!</Link>
                <Link className="font-black pr-14 text-3xl" href="/profile">Profile</Link>
            </div>
        </div>
    );
}

export default Header;
