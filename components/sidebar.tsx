import { cn } from "@/lib/utils"
import Image from "next/image";
import Link from "next/link";
import SidebarItem from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";


type Props = {
    className?: String,
}

const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "lg:w-[256px] lg:fixed h-full flex flex-col left-0 top-0 px-4 border-r-2",
            className,
        )} >
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/mascot.svg" height={40} width={40} alt="Mascot" />
                    <h1 className="text-2xl font-extrabold text-green-600 tracking-wide">
                        Lingo
                    </h1>
                </div>
            </Link>

            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem label="learn" href="/learn" iconStr="/learn.svg"></SidebarItem>
                <SidebarItem label="leaderboard" href="/leaderboard" iconStr="/leaderboard.svg"></SidebarItem>
                <SidebarItem label="quests" href="/quests" iconStr="/quests.svg"></SidebarItem>
                <SidebarItem label="shop" href="/shop" iconStr="/shop.svg"></SidebarItem>
            </div>

            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin"></Loader>
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSignOutUrl="/"></UserButton>
                </ClerkLoaded>
            </div>
        </div >
    );
}

export default Sidebar;