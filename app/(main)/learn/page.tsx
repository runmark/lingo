import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrappper";
import Header from "./header";
import UserProgress from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {

    const userProgress = await getUserProgress();

    // if (!userProgress || !userProgress.activeCourse)
    if (!userProgress?.activeCourse) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCourse={userProgress.activeCourse}
                    points={userProgress.points} hearts={userProgress.hearts} hasActiveSubscription={true}
                />
                <p>
                    stick info
                </p>
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                feed
            </FeedWrapper>
        </div>
    );
}

export default LearnPage;