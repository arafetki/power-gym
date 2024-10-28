import { APP_NAME } from "@/config";
import Navbar from "@/components/nav";

export default function Header() {
    return (
        <header className="sticky top-0 w-full z-40">
            <div className="container mx-auto h-24 px-6 flex items-center">
                <div id="brand" className="flex-1 flex items-center gap-2">
                    
                    <h1 className="font-semibold">{APP_NAME}</h1>
                </div>
                <Navbar/>
            </div>
        </header>
    );
}