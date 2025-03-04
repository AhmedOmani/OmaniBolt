import { Button } from "./ui/button";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'

export function Appbar() {
    return (
        <div className="flex justify-between items-center px-4 py-3 border-b">
            <div className="text-xl font-bold text-gray-900">OmaniBolt</div>
            <SignedOut>
                <div className="flex gap-2">
                    <SignInButton mode="modal">
                        <Button >Sign In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button >Sign Up</Button>
                    </SignUpButton>
                </div>
            </SignedOut>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
        </div>
    )
}