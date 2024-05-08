'use client';

import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { reduceHearts } from "@/actions/user-progress";
import { challengeOptions, challenges } from "@/db/schema";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";
import { useState, useTransition } from "react";
import { useAudio, useMount, useWindowSize } from "react-use";
import { toast } from "sonner";
import Challenge from "./challenge";
import ChallengeBubble from "./challenge-bubble";
import Footer from "./footer";
import Header from "./header";
import Image from "next/image";
import { Router } from "lucide-react";
import { useRouter } from "next/navigation";
import Confetti from "react-confetti";
import ResultCard from "./result-card";

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
    // ({ initialLessonId, initialHearts, initialPercentage, initialLessonChallenges } = quiz);

    const router = useRouter();
    const [lessonId] = useState(initialLessonId);

    const { width, height } = useWindowSize();

    const { open: openHeartsModal } = useHeartsModal();
    const { open: openPracticeModal } = usePracticeModal();

    useMount(() => {
        if (initialPercentage === 100) {
            openPracticeModal();
        }
    });

    const [finishAudio] = useAudio({ src: "/finish.mp3", autoPlay: true });
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" });

    const [pending, startTransition] = useTransition();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });

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
    // console.log(challenges);
    // console.log(activeIndex);
    // console.log(challenge);
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
            startTransition(() => {
                upsertChallengeProgress(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        correctControls.play();
                        setStatus("correct");
                        setPercentage((prev) => prev + 100 / challenges.length);

                        if (initialPercentage === 100) {
                            setHearts((prev) => Math.min(prev + 1, 5));
                        }
                    })
                    .catch(() => toast.error("Something went wrong. Please try again."));
                console.log("correct");
            });
        } else {
            startTransition(() => {
                reduceHearts(challenge.id)
                    .then((response) => {
                        if (response?.error === "hearts") {
                            openHeartsModal();
                            return;
                        }

                        incorrectControls.play();
                        setStatus("wrong");

                        if (!response?.error) {
                            setHearts((prev) => Math.max(prev - 1, 0));
                        }
                    })
                    .catch(() => { toast.error("Something went wrong. Please try again.") });
            });
        }
    };

    // TODO remove true
    if (true || !challenge) {
        return (
            <>
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                {finishAudio}
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        width={50}
                        height={50}
                        className="block lg:hidden"
                        alt="finish"
                    />
                    <Image
                        src="/finish.svg"
                        width={100}
                        height={100}
                        className="hidden lg:block"
                        alt="finish"
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Great job! <br /> You&apos;ve completed the lesson
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                        <ResultCard
                            variant="points"
                            value={challenges.length * 10}
                        />
                    </div>
                </div>
                <Footer
                    lessonId={lessonId}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                />
            </>
        );
    }

    const title = challenge.type === "ASSIST"
        ? "Select the correct meaning"
        : challenge.question;


    return (
        <>
            {incorrectAudio}
            {correctAudio}
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
                                disabled={pending}
                                type={challenge.type}
                                onSelect={onSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer
                disabled={pending || !selectedOption}
                status={status}
                onCheck={onContinue}
            />
        </>
    );
}


export default Quiz;