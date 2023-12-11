import { getAuthSession } from "@/lib/auth";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../../components/MapsFull"), {
  ssr: false,
});
export default async function IndexPage() {
  const session = await getAuthSession();
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex flex-col gap-4 ">
        <h1 className="text-2xl font-semibold ">Daftar Ruas Jalan</h1>
        <DynamicMap session={session} />
      </div>
    </section>
  );
}
