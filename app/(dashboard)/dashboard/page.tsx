import TableData from "@/components/tableData";
import { getRoads } from "@/lib/masterData";
import { RoadData } from "@/types/RoadData";
import React from "react";
import Columns from "@/components/Columns";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getAuthSession();
  const dataForm: RoadData[] = await getRoads();
  const data = dataForm.map(({ id, kode_ruas, nama_ruas, lebar, panjang }) => ({
    id,
    lebar: lebar,
    panjang: panjang,
    kode: nama_ruas,
    nama: kode_ruas,
    session: session,
  }));

  return (
    <div className="py-5 px-[50px] w-full mx-auto mt-5 bg-background container ">
      <div className="flex justify-end">
        <Link className={buttonVariants({})} href={`/maps/create`}>
          + Tambah
        </Link>
      </div>
      <h1 className="text-2xl font-semibold ">Daftar Ruas jalan</h1>
      <TableData data={data} columns={Columns} />
    </div>
  );
}
