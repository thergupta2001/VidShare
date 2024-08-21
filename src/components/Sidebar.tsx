"use client"

import { Button } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiHome, FiUser, FiUpload, FiLogOut } from "react-icons/fi";

export default function Sidebar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    return (
        <div className={`flex flex-col h-screen flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="p-2">
                <Button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    size="sm"
                    className="w-full min-w-0 flex items-center justify-end bg-secondary"
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
                            variant="shadow"
                            className={`w-full min-w-0 flex items-center justify-center ${pathname === "/home"
                                ? 'bg-primary-400 text-primary-50'
                                : 'bg-secondary-100 text-secondary-900'
                                } ${isCollapsed ? 'px-1' : 'justify-start px-3'}`}
                        >
                            <span className="truncate">
                                {isCollapsed ? <FiHome size={20} /> : <span className="truncate">Home</span>}
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            as={Link}
                            href="/profile"
                            variant="shadow"
                            className={`w-full min-w-0 flex items-center justify-center ${pathname === "/profile"
                                ? 'bg-primary-400 text-primary-50'
                                : 'bg-secondary-100 text-secondary-900'
                                } ${isCollapsed ? 'px-1' : 'justify-start px-3'}`}
                        >
                            <span className="truncate">
                                {isCollapsed ? <FiUser size={20} /> : <span className="truncate">Profile</span>}
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            as={Link}
                            href="/upload"
                            variant="shadow"
                            className={`w-full min-w-0 flex items-center justify-center ${pathname === "/upload"
                                ? 'bg-primary-400 text-primary-50'
                                : 'bg-secondary-100 text-secondary-900'
                                } ${isCollapsed ? 'px-1' : 'justify-start px-3'}`}
                        >
                            <span className="truncate">
                                {isCollapsed ? <FiUpload size={20} /> : <span className="truncate">Upload</span>}
                            </span>
                        </Button>
                    </li>
                    <li>
                        <Button
                            color="primary"
                            variant="ghost"
                            className={`w-full min-w-0 flex items-center justify-center ${isCollapsed ? 'px-1' : 'justify-start px-3'} transition-colors`}
                            onClick={() => { signOut() }}
                        >
                            <span className="truncate">
                                {isCollapsed ? <FiLogOut size={20} /> : <span className="truncate">Sign Out</span>}
                            </span>
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}