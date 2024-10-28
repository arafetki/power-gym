"use client";

import { useStackApp, CurrentUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function UserButton({user}: {user: CurrentUser}) {

    const app = useStackApp();
    const router = useRouter()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <UserAvatar user={user}/>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl w-56 py-3">
                <DropdownMenuLabel className="py-2">
                    <h1 className="font-medium">{user.displayName}</h1>
                    <p className="text-xs text-muted-foreground font-normal">{user.primaryEmail}</p>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="py-1">
                    <DropdownMenuItem
                        onClick={()=>router.push(`${app.urls.accountSettings}#profile`)}
                        className="flex items-center justify-between cursor-pointer py-2"
                    >
                        <span className="text-sm">Profile</span>
                        <Icons.userRound size={20}/>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={()=>router.push(`${app.urls.accountSettings}#settings`)}
                        className="flex items-center justify-between cursor-pointer py-2"
                    >
                        <span className="text-sm">Settings</span>
                        <Icons.settings size={20}/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuGroup className="py-1">
                    <DropdownMenuItem onClick={()=>router.push("/dashboard")} className="cursor-pointer py-2">
                        <span className="text-sm">Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={()=>router.push("/")}
                        className="flex items-center justify-between cursor-pointer py-2"
                    >
                        <span className="text-sm">Home Page</span>
                        <Icons.home size={20}/>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={async ()=> user.signOut()}
                        className="flex items-center justify-between cursor-pointer py-2"
                    >
                        <span className="text-sm">Log Out</span>
                        <Icons.signOut size={20}/>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}