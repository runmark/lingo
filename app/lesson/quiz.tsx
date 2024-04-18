import { challengeOptions, challenges, lessons } from "@/db/schema";
import { Percent } from "lucide-react";
import Header from "./header";

type Props = {
    initialLessonId: number;
    initialHearts: number;
    initialPercentage: number;
    initialLessonChallenges: (typeof challenges.$inferSelect & {
        completed: boolean;
        challengeOptions: typeof challengeOptions.$inferSelect[];
    })[];
};

const Quiz = ({
    initialLessonId,
    initialHearts,
    initialPercentage,
    initialLessonChallenges,
}: Props) => {

    const hearts = initialHearts;
    const percentage = initialPercentage;

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={true}
            />
            <div>
                Enter
            </div>
        </>
    );
}


export default Quiz;