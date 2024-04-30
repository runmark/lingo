"use server";

import db from "@/db/drizzle";
import { getCourseById, getCourseProgress, getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const upsertUserProgress = async (courseId: number) => {

    const { userId } = await auth();
    const user = await currentUser();

    if (!user || !userId) {
        throw new Error("Unauthorized");
    }

    const course = await getCourseById(courseId);
    if (!course) {
        throw new Error("Course not found");
    }

    const existingUserProgress = await getUserProgress();
    if (existingUserProgress) {
        await db.update(userProgress).set({
            activeCourseId: courseId,
            userName: user.firstName || "User",
            userImageSrc: user.imageUrl || "/mascot.svg",
        }).where(eq(userProgress.userId, userId));

        revalidatePath("/courses");
        revalidatePath("/learn");
        redirect("/learn");
    }

    await db.insert(userProgress).values({
        userId,
        userName: user.firstName || "User",
        userImageSrc: user.imageUrl || "/mascot.svg",
        activeCourseId: courseId,
    });

    revalidatePath("/courses");
    revalidatePath("/learn");
    redirect("/learn");
};

export const upsertChallengeProgress = async (challengeId: number) => {
    const { userId } = await auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) {
        throw new Error("User progress not found");
    }

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

    if (existingChallengeProgress) {

    }
};