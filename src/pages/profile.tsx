import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import Picture from "../components/Picture";
import Header from "../components/header";

function getEvolution(points: number) {
    if (points < 20) {
        return "Biff.png";
    } else if (points < 40) {
        return "Buuf.png";
    } else {
        return "Boof.png";
    }
}

export default function Profile() {
    const { data: session } = useSession();
    const [profileData, setProfileData] = useState(null);

    let biffStyle = {
        transform: "scale(1.2)",
    };

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
                <h1 className="text-2xl mt-8 mb-8">You are logged in as <span className="font-bold">{session.user.name}</span></h1>
            

                { profileData &&
                    <>
                        <p className="text-xl">Your points: <span className="font-bold">{ profileData.points } ✅</span></p>
                        { profileData.streak > 2 ?
                            <p className="text-xl">Your current streak: <span className="font-bold">{ profileData.streak } 🔥</span></p>
                            :
                            <p className="text-xl">Your current streak: <span className="font-bold">{ profileData.streak } 😢</span></p>
                        }
                        <div className="overflow-hidden m-auto">
                            <img width="400" height="400" style={biffStyle} src={getEvolution(profileData.points)} />
                        </div>
                    </>
                }

                <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={() => signOut()}>Sign Out</button>
            </div>
            </main>
        )
    }

    biffStyle = {
        transform: "scale(3.0)",
    };

    return (
        <main>
        <Header />
        <div className="flex flex-col text-center">
            <h2 className="text-2xl mt-10">You are not logged in. You can still play, but your progress won't be tracked.</h2>

            <div className="overflow-hidden w-96 h-96 m-auto">
                <img style={biffStyle} src="Biff.png" />
            </div>

            <p>(Biff wants you to make an account)</p>

            <button className="m-auto mt-10 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-40" onClick={() => signIn()}>Sign In</button>
        </div>
        </main>
    );
}
