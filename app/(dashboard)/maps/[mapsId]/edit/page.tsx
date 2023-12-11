import RoadFormEdit from "@/components/RoadFormEdit";
import { getAuthSession } from "@/lib/auth";
import {
  getDesa,
  getEksisting,
  getJenisJalan,
  getKondisiJalan,
  getRoad,
} from "@/lib/masterData";
import { Desa, Eksisting, JenisJalan, KondisiJalan } from "@/types/api";
import { RoadData } from "@/types/RoadData";
import React from "react";

interface EditRoadPageProps {
  params: {
    mapsId: string;
  };
}

export default async function EditRoadPage({ params }: EditRoadPageProps) {
  const listDesa: Desa = await getDesa();
  const listEksisting: Eksisting = await getEksisting();
  const listJenisJalan: JenisJalan = await getJenisJalan();
  const listKondisiJalan: KondisiJalan = await getKondisiJalan();
  const dataForm: RoadData = await getRoad(params.mapsId);

  const session = await getAuthSession();
  return (
    <div className="py-5 px-[50px] w-full mx-auto   mt-5  bg-background container ">
      <h1 className="text-2xl font-semibold ">Sunting Informasi Ruas Jalan</h1>
      <RoadFormEdit
        listDesa={listDesa}
        listEksisting={listEksisting}
        listJenisJalan={listJenisJalan}
        listKondisiJalan={listKondisiJalan}
        session={session}
        dataForm={dataForm}
      />
    </div>
  );
}
