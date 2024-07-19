"use client"

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    return (
        <div className={`flex flex-col h-screen bg-secondary transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="p-2">
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    size="sm"
                    className="w-full flex items-center justify-center"
                    style={{ minWidth: 0 }}
                >
                    {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </Button>
            </div>
            <nav className="flex-1">
                <ul className="space-y-2 p-2">
                    <li>
                        <Button
                            as={Link}
                            href="/home"
                            color={pathname === "/home" ? "primary" : "default"}
                            variant="shadow"
                            className={`w-full flex items-center justify-center ${isCollapsed ? 'px-1' : 'justify-start px-3'}`}
                            style={{ minWidth: 0 }}
                        >
                            <span className="truncate">
                                {isCollapsed ? 'H' : 'Home'}
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            as={Link}
                            href="/profile"
                            color={pathname === "/profile" ? "primary" : "default"}
                            variant="shadow"
                            className={`w-full flex items-center justify-center ${isCollapsed ? 'px-1' : 'justify-start px-3'}`}
                            style={{ minWidth: 0 }}
                        >
                            <span className="truncate">
                                {isCollapsed ? 'P' : 'Profile'}
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            color="primary"
                            variant="ghost"
                            className={`w-full flex items-center justify-center ${isCollapsed ? 'px-1' : 'justify-start px-3'} transition-colors`}
                            style={{ minWidth: 0 }}
                            onClick={() => { signOut() }}
                        >
                            <span className="truncate">
                                {isCollapsed ? 'S' : 'Sign Out'}
                            </span>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}