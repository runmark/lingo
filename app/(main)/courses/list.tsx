import { courses, userProgress } from "@/db/schema";
import Card from "./card";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseId?: typeof userProgress.$inferSelect.activeCourseId;
};

const List = ({ courses, activeCourseId }: Props) => {

    return (
        <div className="pt-6 grid grid-cols-2 gap-4 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
            {
                courses.map((course) => (
                    <Card
                        key={course.id}
                        imageSrc={course.imageSrc}
                        title={course.title}
                        active={course.id === activeCourseId}
                        disabled={false}
                    ></Card>
                ))}
        </div>
    );
}

export default List;