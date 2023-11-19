import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Picture from "../components/Picture";
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
                <h1 className="text-4xl mt-8">ASL-EVO Account</h1>
                <h2 className="text-xl mt-4 mb-8">You are logged in as <span className="font-bold">{session.user.name}</span></h2>
            

                { profileData &&
                    <>
                        <p>Your points: <span className="font-bold">{ profileData.points } ✅</span></p>
                        { profileData.streak > 2 ?
                            <p>Your current streak: <span className="font-bold">{ profileData.streak } 🔥</span></p>
                            :
                            <p>Your current streak: <span className="font-bold">{ profileData.streak } 😢</span></p>
                        }
                        <Picture src={profileData.evolution} />
                    </>
                }

                <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={() => signOut()}>Sign Out</button>
            </div>
            </main>
        )
    }
    return (
        <main>
        <Header />
        <div className="flex flex-col text-center">
            <h1 className="text-4xl mt-8">Welcome to ASL-EVO!</h1>
            <h2 className="text-2xl mt-8">You are not logged in.</h2>

            <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={() => signIn()}>Sign In</button>
        </div>
        </main>
    );
}
