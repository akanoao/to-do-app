import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/clerk-react";


const Navbar = () => {
    const {isSignedIn} = useUser();
    return(
        <div className="flex gap-2 justify-between w-full h-auto px-8 py-4 bg-neutral-900">
            <h1 className='text-slate-400 font-extrabold text-7xl justify-items-end'>DoIt.</h1>
            {isSignedIn ? <UserButton afterSwitchSessionUrl="/" appearance={{elements:{
                userButtonAvatarBox: {
                    width: "50px",
                    height: "50px",
                },
                avatarBox: {
                    width: "50px",
                    height: "50px",
                }
                }
                }} /> : 
                <div className="flex items-center gap-4">
                    <SignInButton >
                        <button className="px-6 py-3 font-medium text-black bg-slate-300 rounded-md shadow-md transition-all hover:bg-slate-500/50 hover:text-white  active:scale-95">Sign In</button>
                    </SignInButton>
                    <SignUpButton >
                        <button className="px-6 py-3 text-white bg-slate-500 rounded-md shadow-md transition-all hover:bg-slate-500/50  active:scale-95">Sign Up</button>
                    </SignUpButton>
                </div>}
            {/* <LoginSignupButtons /> */}
        </div>
    )
}
export default Navbar;