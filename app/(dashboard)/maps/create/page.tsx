import RoadForm from "@/components/RoadForm";
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

  return (
    <div className="py-5 px-[50px] w-full mx-auto shadow-lg bg-white-50 mt-5 drop-shadow-2xl bg-white container ">
      <h1 className="text-2xl font-semibold ">
        Tambahkan Informasi Ruas Jalan
      </h1>
      <RoadForm
        listDesa={listDesa}
        listEksisting={listEksisting}
        listJenisJalan={listJenisJalan}
        listKondisiJalan={listKondisiJalan}
      />
    </div>
  );
}
