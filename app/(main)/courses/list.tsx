"use client";

import { courses, userProgress } from "@/db/schema";
import Card from "./card";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { upsertUserProgress } from "@/actions/user-progress";
import { toast } from "sonner";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

const List = ({ courses, activeCourseId }: Props) => {

    const router = useRouter();
    const [pending, startTransition] = useTransition();

    const onClick = async (id: number) => {
        if (pending) return;

        if (id === activeCourseId) {
            return router.push("/learn");
        }

        startTransition(() => {
            upsertUserProgress(id).catch(
                () => toast.error("Something went wrong.")
            );
        });
    };

    return (
        <div className="pt-6 grid grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
            {
                courses.map((course) => (
                    <Card
                        key={course.id}
                        id={course.id}
                        onClick={onClick}
                        imageSrc={course.imageSrc}
                        title={course.title}
                        active={course.id === activeCourseId}
                        disabled={pending}
                    ></Card>
                ))}
        </div>
    );
}

export default List;