import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import {Metadata} from "next";

export const metadata: Metadata = {
  title:
    "Hopeda Capitólio - Dashboard",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <DefaultLayout>
      <ECommerce />
    </DefaultLayout>
  );
}
