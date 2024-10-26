"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";
import { Icons } from "./icons";

export default function SignOutButton({...props}: ButtonProps) {

    const {signOut} = useUser({or: "redirect"})

    return (
        <Button 
            onClick={async () => await signOut()} 
            variant="expandIcon" 
            Icon={Icons.signOut} 
            iconPlacement="right" 
            {...props}
        >
            Sign Out
        </Button>
    );
}