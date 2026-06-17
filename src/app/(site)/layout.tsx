import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Backdrop } from "@/components/Backdrop";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-full flex-col">
      <Backdrop />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
