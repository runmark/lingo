import { cn } from "@/lib/utils"


type Props = {
    className?: String,
}

const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "bg-green-500 lg:w-[256px] lg:fixed h-full flex flex-col left-0 top-0 px-4 border-r-2",
            className,
        )} >
            Sidebar
        </div >
    );
}

export default Sidebar;