import RoadForm from "@/components/RoadForm";
import { getAuthSession } from "@/lib/auth";
import {
  getProvinsi,
  getEksisting,
  getJenisJalan,
  getKondisiJalan,
} from "@/lib/masterData";
import { Eksisting, JenisJalan, KondisiJalan, Provinsi } from "@/types/api";
import React from "react";

export default async function CreateRoadPage() {
  const listProvinsi: Provinsi = await getProvinsi();
  const listEksisting: Eksisting = await getEksisting();
  const listJenisJalan: JenisJalan = await getJenisJalan();
  const listKondisiJalan: KondisiJalan = await getKondisiJalan();
  const session = await getAuthSession();
  console.log(listProvinsi);
  return (
    <div className="py-5 px-[50px] w-full mx-auto   mt-5  bg-background container ">
      <h1 className="text-2xl font-semibold ">
        Tambahkan Informasi Ruas Jalan
      </h1>
      <RoadForm
        listProvinsi={listProvinsi}
        listEksisting={listEksisting}
        listJenisJalan={listJenisJalan}
        listKondisiJalan={listKondisiJalan}
        session={session}
      />
    </div>
  );
}
