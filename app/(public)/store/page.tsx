import { type Metadata } from "next";

export const metadata: Metadata = {
    title: "Store"
}

export default function Page() {
    return (
        <div className="container mx-auto px-6">
            <h1>Power Gym Store</h1>
        </div>
    );
}