import { getAuthSession } from "@/lib/auth";
import dynamic from "next/dynamic";
import React from "react";
const DynamicMap = dynamic(() => import("@/components/UserMapView"), {
  ssr: false,
});

export default async function CreateRoadPage() {
  const session = await getAuthSession();
  return (
    <div className="py-5 px-[50px] w-full mx-auto   mt-5  bg-background container ">
      <h1 className="mb-3 text-2xl font-semibold ">Informasi Ruas Jalan</h1>
      <DynamicMap session={session} />
    </div>
  );
}
