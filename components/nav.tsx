"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_ITEMS } from "@/config";
import { Button } from "@/components/ui/button";
import { useStackApp, useUser } from "@stackframe/stack";
import UserButton from "@/components/user-button";
import { Icons } from "@/components/icons";

export default function Navbar() {

    const [showMobileMenu,setShowMobileMenu] = useState<boolean>(false);
    const user = useUser();
    const app = useStackApp()

    return (
        <nav className="grow flex justify-end md:justify-between items-center">
            <ul className="hidden md:flex md:items-center md:gap-6">
                {NAV_ITEMS.map((item,idx)=>{
                    return (
                        <li key={item.name+idx}>
                            <Link href={item.href}>{item.name}</Link>
                        </li>
                    );
                })}
            </ul>
            <ul>
                <li className="hidden md:flex">
                    {user ?
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="font-medium">Dashboard</Link>
                        <UserButton
                            user={user}
                        />
                    </div>

                    :<Button size="sm" asChild><Link href={app.urls.signIn}>Login</Link></Button>
                    }
                </li>
                <li className="md:hidden cursor-pointer" onClick={()=>setShowMobileMenu(!showMobileMenu)}>
                    {showMobileMenu? 
                    <Icons.closeMenu size={24}/>
                    :<Icons.burgerMenu size={24}/>}
                </li>
            </ul>
        </nav>
    );
}