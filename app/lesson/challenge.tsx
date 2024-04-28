import { challengeOptions, challenges } from "@/db/schema";
import Card from "./card";
import { stat } from "fs";
import { cn } from "@/lib/utils";

type Props = {
    options: typeof challengeOptions.$inferSelect[];
    status: "correct" | "wrong" | "none";
    selectedOption?: number;
    disabled: boolean;
    type: typeof challenges.$inferSelect["type"];
    onSelect: (id: number) => void;
};

const Challenge = ({
    options,
    onSelect,
    status,
    selectedOption,
    disabled,
    type,
}: Props) => {
    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIST" && "grid-cols-1",
            type === "SELECT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
            {
                options.map((option, i) => (
                    <Card
                        id={option.id}
                        key={option.id}
                        text={option.text}
                        imageSrc={option.imageSrc}
                        audioSrc={option.audioSrc}
                        shortcut={`${i + 1}`}
                        selected={option.id === selectedOption}
                        disabled={disabled}
                        onClick={() => onSelect(option.id)}
                        status={status}
                        type={type}
                    />
                ))
            }
        </div >
    );
}

export default Challenge;