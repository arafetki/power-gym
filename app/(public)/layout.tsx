import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Layout({children}: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow-clip]:overflow-clip">
            <Header/>
            <main className="grow">{children}</main>
            <Footer/>
        </div>
    );
}