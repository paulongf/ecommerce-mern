import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";






function AdminHeader({setOpen}) {
    return <header className="flex items-center justify-between px-4 py-3 bg-background">
        <Button onClick={()=> setOpen(true)} className="lg:hidden sm:block bg-background-dark text-white inline-flex gap-2
            rounded-md px-4 py-2 text-sm font-medium cursor-pointer shadow items-center">
            <AlignJustify/>
            <span className="sr-only">Toggle Menu</span>
        </Button>
        <div className="flex flex-1 justify-end">
            <Button className="bg-background-dark text-white inline-flex gap-2
            rounded-md px-4 py-2 text-sm font-medium cursor-pointer shadow items-center">
                <LogOut/>
                Logout
            </Button>
        </div>
    </header>
}

export default AdminHeader;