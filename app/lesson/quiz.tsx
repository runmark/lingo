'use client';

import { challengeOptions, challenges } from "@/db/schema";
import Header from "./header";
import Challenge from "./challenge";

const quiz: Props = {
    initialLessonId: 1,
    initialHearts: 5,
    initialPercentage: 40,
    initialLessonChallenges: [
        {
            id: 1,
            lessonId: 1, // Nouns
            type: "SELECT",
            order: 1,
            question: 'Which one of these is the "the man"?',
            completed: false,
            challengeOptions: [
                {
                    id: 1,
                    challengeId: 1, // Which one of these is "the man"?
                    imageSrc: "/man.svg",
                    correct: true,
                    text: "el hombre",
                    audioSrc: "/es_man.mp3",
                },
                {
                    id: 2,
                    challengeId: 1,
                    imageSrc: "/woman.svg",
                    correct: false,
                    text: "la mujer",
                    audioSrc: "/es_woman.mp3",
                },
                {
                    id: 3,
                    challengeId: 1,
                    imageSrc: "/robot.svg",
                    correct: false,
                    text: "el robot",
                    audioSrc: "/es_robot.mp3",
                },
            ],
        },
    ]
};

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

    ({ initialLessonId, initialHearts, initialPercentage, initialLessonChallenges } = quiz);

    const hearts = initialHearts;
    const percentage = initialPercentage;

    // const challenge = initialLessonChallenges[activeIndex];
    const title = "hello";

    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={true}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            <Challenge />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Quiz;