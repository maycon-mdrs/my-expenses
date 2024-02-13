import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { FormsData } from "./formsData";

export function DrawerData() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button>Nova transação</Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="mx-auto w-full max-w-lg">
                <DrawerHeader>
                    <DrawerTitle>Nova transação</DrawerTitle>
                    <DrawerDescription>Preencha de acordo</DrawerDescription>
                    <FormsData />
                </DrawerHeader>
                <DrawerFooter>
                    <Button type="submit">Submit</Button>
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
                </div>
            </DrawerContent>
        </Drawer>

    );
}