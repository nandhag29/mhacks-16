import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
    const { data: session } = useSession();
    
    if ( session ) {
        return (
            <main>
                <div className="flex flex-col text-center">
                    <h1 className="text-4xl mt-8">Welcome to ASL Learner!</h1>
                    <h2 className="text-2xl mt-8">You are logged in as {session.user.email}</h2>
                </div>

                <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-60" onClick={() => signOut()}>Sign Out</button>
            </main>
        )
    }
    return (
        <main>
            <div className="flex flex-col text-center">
                <h1 className="text-4xl mt-8">Welcome to ASL Learner!</h1>
                <h2 className="text-2xl mt-8">You are not logged in.</h2>
            </div>

            <button className="m-auto mt-8 bg-gray-200 hover:bg-gray-300 border border-gray-400 text-black font-bold py-2 px-6 rounded-md w-60" onClick={() => signIn()}>Sign In</button>
        </main>
    );
}
