'use client';

import { challengeOptions, challenges } from "@/db/schema";
import { useState } from "react";
import Challenge from "./challenge";
import ChallengeBubble from "./challenge-bubble";
import Footer from "./footer";
import Header from "./header";
import { log } from "console";
import { toast } from "sonner";
import { upsertChallengeProgress } from "@/actions/user-progress";

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

    const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
    const [selectedOption, setSelectedOption] = useState<number>();
    const onSelect = (id: number) => {
        if (status !== "none") return;
        setSelectedOption(id);
    };

    const [challenges] = useState(initialLessonChallenges);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const onNext = () => {
        setActiveIndex((current) => current + 1);
    };

    const challenge = challenges[activeIndex];
    const options = challenge?.challengeOptions ?? [];

    const onContinue = () => {
        if (!selectedOption) return;

        if (status === "correct") {
            onNext();
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        if (status === "wrong") {
            setStatus("none");
            setSelectedOption(undefined);
            return;
        }

        const correctOption = options.find((option) => option.correct);
        if (!correctOption) return;

        if (correctOption.id === selectedOption) {
            upsertChallengeProgress()
                .then((response) => {

                })
                .catch(() => toast.error("Something went wrong. Please try again."));
            console.log("correct");
        } else {
            console.log("error");
        }

    };

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
                                options={options}
                                status={status}
                                selectedOption={selectedOption}
                                disabled={false}
                                type={challenge.type}
                                onSelect={onSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={!selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
}


export default Quiz;