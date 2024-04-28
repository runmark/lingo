'use client';

import { challengeOptions, challenges } from "@/db/schema";
import Header from "./header";
import Challenge from "./challenge";
import { useState } from "react";
import ChallengeBubble from "./challenge-bubble";

// TODO for test, should be removed
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

    // TODO remove
    ({ initialLessonId, initialHearts, initialPercentage, initialLessonChallenges } = quiz);

    const hearts = initialHearts;
    const percentage = initialPercentage;

    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const challenge = challenges[activeIndex];
    const title = challenge.type === "ASSIST"
        ? "Select the correct meaning"
        : challenge.question;


    return (
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={true}
            />
            <div className="flex-1">
                <div className="h-full flex  items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {title}
                        </h1>
                        <div>
                            {challenge.type === "ASSIST" && (
                                <ChallengeBubble question={challenge.question} />
                            )}
                            <Challenge
                                options={challenge.challengeOptions}
                                status="none"
                                selectedOption={undefined}
                                disabled={false}
                                type={challenge.type}
                                onSelect={() => { }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


export default Quiz;