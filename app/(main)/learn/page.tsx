import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrappper";
import Header from "./header";
import UserProgress from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";

const LearnPage = async () => {

    const userProgress = await getUserProgress();

    if (!userProgress?.activeCourseId) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress activeCourse={{ imageSrc: "/it.svg", title: "italy" }}
                    points={5} hearts={3} hasActiveSubscription={true}
                />
                <p>
                    stick info
                </p>
            </StickyWrapper>
            <FeedWrapper>
                <Header title="feed header" />
                feed
            </FeedWrapper>
        </div>
    );
}

export default LearnPage;