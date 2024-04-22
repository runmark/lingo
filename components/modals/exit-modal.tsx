"use client";

import { useExitModal } from "@/store/use-exit-modal";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ExitModal = () => {

    const router = useRouter();
    const { isOpen, close } = useExitModal();

    return (
        <Dialog open={isOpen} onOpenChange={close}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center w-full justify-center mb-5">
                        <Image
                            src="/mascot_sad.svg"
                            alt="Mascot"
                            height={80}
                            width={80}
                        />
                    </div>
                    <DialogTitle className="text-center font-bold text-2xl">
                        Wait, don&apos;t go!
                    </DialogTitle>
                    <DialogDescription className="text-center text-base">
                        You&apos;re about to leave the lesson. Are you sure?
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <div className="flex flex-col gap-y-4 w-full">
                        <Button
                            onClick={close}
                            variant="primary"
                            className="w-full"
                            size="lg"
                        >
                            Keep learning
                        </Button>
                        <Button
                            variant="dangerOutline"
                            className="w-full"
                            size="lg"
                            onClick={() => {
                                close();
                                router.push('/learn');
                            }}>
                            End session
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default ExitModal;