"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import { useAuth } from "@/providers/supabase-auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
    const { user, signOut } = useAuth();
    return (
        <nav className="w-full border-b border-neutral-100 bg-gray-1100 text-stone-100">
            {/* Container */}
            <div className="flex items-center justify-between w-full py-6 mx-auto max-w-7xl">
                {/* Logo */}
                <div className="text-lg font-bold"> LOGO</div>
                {/* Avatar */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={user?.avatar_url ?? ""} alt="@shadcn" />
                            <AvatarFallback className={"text-gray-900"}>M</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="w-4 h-4 mr-2" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={signOut}>
                                <LogOut className="w-4 h-4 mr-2" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    );
};

export default Navbar;
