import { PropsWithChildren } from "react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import FloatingActionButton from "./FloatingActionButton";

export default function SiteLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
      <FloatingActionButton />
    </div>
  );
}
