import List from "./list";

const CoursesPage = () => {
    const courses = [{
        imageSrc: "/jp.svg",
        title: "Japanese",
        active: true,
        disabled: false,
    }, {
        imageSrc: "/jp.svg",
        title: "Japanese",
        active: true,
        disabled: false,
    }, {
        imageSrc: "/jp.svg",
        title: "Japanese",
        active: true,
        disabled: false,
    }, {
        imageSrc: "/jp.svg",
        title: "Japanese",
        active: true,
        disabled: false,
    }];


    return (
        <div className="h-full max-w-[912px] px-3 mx-auto">
            <h1 className="text-2xl font-bold text-neutral-700">Language Courses</h1>
            <List
                courses={courses}
                activeCourseId="123"
            ></List>
        </div>
    );
}

export default CoursesPage;