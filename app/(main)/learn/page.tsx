import FeedWrapper from "@/components/feed-wrapper";
import StickyWrapper from "@/components/sticky-wrappper";
import Header from "./header";
import UserProgress from "@/components/user-progress";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress, getUserSubscription } from "@/db/queries";
import { redirect } from "next/navigation";
import Unit from "./unit";

const LearnPage = async () => {

    const userProgress = await getUserProgress();
    const units = await getUnits();
    const courseProgress = await getCourseProgress();
    const activeLessonPercentage = await getLessonPercentage();
    const userSubscription = await getUserSubscription();

    // if (!userProgress || !userProgress.activeCourse)
    if (!userProgress?.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    points={userProgress.points}
                    hearts={userProgress.hearts}
                    hasActiveSubscription={!!userSubscription?.isActive}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={activeLessonPercentage}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
}

export default LearnPage;