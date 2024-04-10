import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    imageSrc: string;
    title: string;
    active: boolean;
    disabled: boolean;
    onClick: (courseId: number) => void;
    id: number;
};

const Card = ({
    imageSrc, title, active, disabled, onClick, id
}: Props) => {

    return (
        <div
            onClick={() => onClick(id)}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
                disabled && "pointer-events-none opacity-50"
            )}
        >
            <div className="min-[24px] w-full flex items-center justify-end">
                {active && (
                    <div className="bg-green-600 rounded-md flex items-center justify-center p-1.5">
                        <Check className="text-white stroke-[4] h-4 w-4"></Check>
                    </div>
                )}
            </div>
            <Image
                src={imageSrc}
                alt={title}
                width={93.33}
                height={70}
                className="rounded-lg drop-shadow-md border object-cover"
            ></Image>
            <p className="text-neutral-700 text-center font-bold mt-3">
                {title}
            </p>
        </div>
    );
}

export default Card;