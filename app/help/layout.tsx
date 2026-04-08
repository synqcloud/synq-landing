import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <div className="pt-[73px]">{children}</div>
      <Footer />
    </>
  );
}
