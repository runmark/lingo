import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
}

const UnitBanner = ({ title, description }: Props) => {
    return (
        <div className="w-full flex flex-row bg-green-500 text-white rounded-xl items-center justify-between p-5">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">{title}</h3>
                <p className="text-lg">{description}</p>
            </div>
            <Link href="/lesson">
                <Button
                    size="lg"
                    variant="secondary"
                    className="xl:flex border-2 border-b-4 active:border-b-2"
                >
                    <NotebookText className="mr-2" />
                    Continue
                </Button>
            </Link>
        </div>
    );
}

export default UnitBanner;