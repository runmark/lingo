import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrappper";
import UserProgress from "@/components/user-progress";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import Items from "./items";

const ShopPage = async () => {

    const userProgress = await getUserProgress();
    if (!userProgress?.activeCourse) {
        redirect("/courses");
    }

    const userSubscription = await getUserSubscription();

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    points={userProgress.points}
                    hearts={userProgress.hearts}
                    hasActiveSubscription={isPro}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image
                        src="/shop.svg"
                        width={50}
                        height={50}
                        alt="Shop"
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Shop
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        Spend your points on cool stuff.
                    </p>
                </div>
                <Items
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
            </FeedWrapper>
        </div>
    );
}

export default ShopPage