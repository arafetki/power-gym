import { APP_NAME } from "@/config";

export default function Footer() {
    return (
        <footer>
            <div className="container mx-auto p-6 lg:py-10">
                <p className="text-sm text-muted-foreground text-pretty">© Copyright {new Date().getFullYear()}. {APP_NAME}</p>
            </div>
        </footer>
    );
}