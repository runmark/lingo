"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Props = {
    label: string;
    iconStr: string;
    href: string;
};


const SidebarItem = ({ label, iconStr, href }: Props) => {

    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Button
            variant={active ? "sidebarOutline" : "sidebar"}
            className="justify-start h-[52px]"
            asChild
        >
            <Link href={href}>
                <Image
                    src={iconStr}
                    alt={label}
                    width={32}
                    height={32}
                    className="mr-5"
                />
                {label}
            </Link>
        </Button >
    );
}


export default SidebarItem;