import RoadForm from "@/components/RoadForm";
import { getAuthSession } from "@/lib/auth";
import {
  getDesa,
  getEksisting,
  getJenisJalan,
  getKondisiJalan,
} from "@/lib/masterData";
import { Desa, Eksisting, JenisJalan, KondisiJalan } from "@/types/api";
import React from "react";

export default async function CreateRoadPage() {
  const listDesa: Desa = await getDesa();
  const listEksisting: Eksisting = await getEksisting();
  const listJenisJalan: JenisJalan = await getJenisJalan();
  const listKondisiJalan: KondisiJalan = await getKondisiJalan();

  const session = await getAuthSession();
  return (
    <div className="py-5 px-[50px] w-full mx-auto   mt-5  bg-background container ">
      <h1 className="text-2xl font-semibold ">
        Tambahkan Informasi Ruas Jalan
      </h1>
      <RoadForm
        listDesa={listDesa}
        listEksisting={listEksisting}
        listJenisJalan={listJenisJalan}
        listKondisiJalan={listKondisiJalan}
        session={session}
      />
    </div>
  );
}
