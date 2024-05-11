"use server";

import db from "@/db/drizzle";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

    const userSubscription = await getUserSubscription();

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId)
    });

    if (!challenge) {
        throw new Error("Challenge not found");
    }

    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.challengeId, challengeId),
            eq(challengeProgress.userId, userId),
        ),
    });

    if (currentUserProgress.hearts === 0
        && userSubscription?.isActive
        && !existingChallengeProgress
    ) {
        return { error: "hearts" };
    }


    if (existingChallengeProgress) {
        await db.update(challengeProgress).set({
            completed: true
        }).where(eq(challengeProgress.id, existingChallengeProgress.id));

        await db.update(userProgress).set({
            hearts: Math.min(currentUserProgress.hearts + 1, 5),
            points: currentUserProgress.points + 10,
        }).where(eq(userProgress.userId, userId));

        revalidatePath("learn");
        revalidatePath("lesson");
        revalidatePath("quests");
        revalidatePath("leaderboard");
        const lessonId = challenge.lessonId;
        revalidatePath(`/lesson/${lessonId}`);
        return;
    }

    await db.insert(challengeProgress).values({
        challengeId,
        userId,
        completed: true,
    });

    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    revalidatePath("learn");
    revalidatePath("lesson");
    revalidatePath("quests");
    revalidatePath("leaderboard");
    const lessonId = challenge.lessonId;
    revalidatePath(`/lesson/${lessonId}`);
    return;
};