import { Button } from "@/components/ui/button";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
            <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/jp.svg" width={40} height={32} alt="Japanese" className="mr-4 rounded-md"></Image>
                    Japanese
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/fr.svg" width={40} height={32} alt="French" className="mr-4 rounded-md"></Image>
                    French
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/hr.svg" width={40} height={32} alt="Croatian" className="mr-4 rounded-md"></Image>
                    Croatian
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/es.svg" width={40} height={32} alt="Spanish" className="mr-4 rounded-md"></Image>
                    Spanish
                </Button>
                <Button size="lg" variant="ghost" className="w-full">
                    <Image src="/it.svg" width={40} height={32} alt="Italian" className="mr-4 rounded-md"></Image>
                    Italian
                </Button>
            </div>
        </footer >
    );
}

export default Footer;