import Image from "next/image";
import { Button } from "./ui/button";
import { InfinityIcon } from "lucide-react";
import Link from "next/link";

type Props = {
    activeCourse: { imageSrc: string; title: string };
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

const UserProgress = ({
    activeCourse, hearts, points, hasActiveSubscription
}: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        width={32} height={32}
                        className="rounded-md border"
                    ></Image>
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image src="/points.svg" height={28} width={28} alt="points" className="mr-2"></Image>
                    {points}
                </Button>
            </Link>

            <Link href="/shop">
                <Button variant="ghost" className="text-rose-500">
                    <Image src="/heart.svg" height={22} width={22} alt="heart" className="mr-2"></Image>
                    {hasActiveSubscription ?
                        <InfinityIcon className="h-4 w-4 stroke-[3]"></InfinityIcon>
                        : hearts}
                </Button>
            </Link>
        </div>
    );
}

export default UserProgress;