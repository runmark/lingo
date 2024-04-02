import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";


type Props = {
    title: string;
};

const Header = ({ title }: Props) => {
    return (
        <div className="sticky flex justify-between items-center bg-white top-0 pb-3 lg:pt-[28px] lg:mt-[-28px] border-b-2 mb-5 text-neutral-400 lg:z-50">
            <Link href="/courses">
                <Button variant="ghost" size="sm">
                    <ArrowLeft className="h-5 w-5 stroke-2 text-neutral-400"></ArrowLeft>
                </Button>
            </Link>
            <h1 className="font-bold text-lg">
                {title}
            </h1>
            <div />
        </div>
    );
}

export default Header;