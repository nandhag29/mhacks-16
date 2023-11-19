import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Header from "../components/header";

export default function Profile() {
    const { data: session } = useSession();
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!session || !session.user) {
                return;
            }

            const res = await fetch("/api/get_profile?email=" + session.user.email);
            const json = await res.json();
            setProfileData(json);
        };

        fetchProfileData();
    }, [session]);
    
    if ( session ) {
        return (
            <main>
            <Header />
            <div className="flex flex-col text-center">
                <h1 className="text-4xl mt-8">Welcome to ASL Learner!</h1>
                <h2 className="text-2xl mt-8">You are logged in as {session.user.email}</h2>
            </div>

            { profileData &&
                <>
                    <p>{ profileData.points }</p>
                    <p>{ profileData.streak }</p>
                    <img src={profileData.evolution} />
                </>
            }

            <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-60" onClick={() => signOut()}>Sign Out</button>
            </main>
        )
    }
    return (
        <main>
        <Header />
        <div className="flex flex-col text-center">
            <h1 className="text-4xl mt-8">Welcome to ASL Learner!</h1>
            <h2 className="text-2xl mt-8">You are not logged in.</h2>
        </div>

        <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-60" onClick={() => signIn()}>Sign In</button>
        </main>
    );
}
