import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
    imageSrc: string;
    title: string;
    active: boolean;
    disabled: boolean;
};

const Card = ({
    imageSrc, title, active, disabled
}: Props) => {

    imageSrc = "/jp.svg";
    title = "Japnese";

    return (
        <div className={cn(
            "h-full border-2 rounded-xl border-b-4 hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[217px] min-w-[200px]",
            disabled && "pointer-events-none opacity-50"
        )}>
            <div>
                <Check className="text-white stroke-[4] h-4 w-4"></Check>
            </div>
            <Image
                src={imageSrc}
                alt={title}
                width={93.33}
                height={70}
            ></Image>
            <p>
                {title}
            </p>
        </div>
    );
}

export default Card;