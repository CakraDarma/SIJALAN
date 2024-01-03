"use client";

import Image from "next/image";
import axios from "axios";
import { Eksisting, JenisJalan, KondisiJalan } from "@/types/api";
import { useEffect, useState } from "react";

interface RoadInfoProps {
  ruasJalan: {
    paths: string;
    desa_id: number;
    kode_ruas: string;
    nama_ruas: string;
    panjang: number;
    lebar: number;
    eksisting_id: number;
    kondisi_id: number;
    jenisjalan_id: number;
    keterangan: string;
  };
  session: {
    user: {
      accessToken: string;
    };
  };
}

const RoadInfo = ({ ruasJalan, session }: RoadInfoProps) => {
  const [jenisJalan, setJenisJalan] = useState("");
  const [eksistingJalan, setEksistingJalan] = useState("");
  const [kondisiJalan, setKondisiJalan] = useState("");
  async function getJenisJalanById(id: number) {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mjenisjalan",
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      const data: JenisJalan = response.data.eksisting;
      const jenisJalan = data.find((item) => item.id === id);

      if (jenisJalan) {
        return jenisJalan.jenisjalan;
      } else {
        return "";
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }
  async function getEksistingJalanById(id: number) {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/meksisting",
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      const data: Eksisting = response.data.eksisting;
      const eksistingJalan = data.find((item) => item.id === id);

      if (eksistingJalan) {
        return eksistingJalan.eksisting;
      } else {
        return "ID tidak ditemukan";
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }
  async function getKondisiJalanById(id: number) {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/mkondisi",
        {
          headers: {
            Authorization: `Bearer ${session?.user.accessToken}`,
          },
        }
      );

      const data: KondisiJalan = response.data.eksisting;
      const kondisiJalan = data.find((item) => item.id === id);

      if (kondisiJalan) {
        return kondisiJalan.kondisi;
      } else {
        return "ID tidak ditemukan";
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      throw error;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jenisJalanResult = await getJenisJalanById(
          ruasJalan?.jenisjalan_id
        );
        setJenisJalan(jenisJalanResult);

        const eksistingJalanResult = await getEksistingJalanById(
          ruasJalan?.eksisting_id
        );
        setEksistingJalan(eksistingJalanResult);

        const kondisiJalanResult = await getKondisiJalanById(
          ruasJalan?.kondisi_id
        );
        setKondisiJalan(kondisiJalanResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [ruasJalan]);

  return (
    <div className=" border-lg w-[200px] text-black">
      <Image
        src="/images/no-photos.jpg"
        alt="no image"
        width={1000}
        height={1000}
        quality={100}
        className="w-full h-[200px] rounded-xl drop-shadow-xl"
      />
      <div className="p-2">
        <h2 className="text-lg font-bold">Ruas: {ruasJalan?.nama_ruas}</h2>
        <hr className="m-2" />
        <h3 className="text-sm font-semibold">
          Kode:
          <span className="font-normal"> {ruasJalan?.kode_ruas}</span>
        </h3>
        <h3 className="text-sm font-semibold ">
          Panjang:
          <span className="font-normal"> {ruasJalan?.panjang} Kilometer</span>
        </h3>
        <h3 className="text-sm font-semibold ">
          Lebar:
          <span className="font-normal"> {ruasJalan?.lebar} Meter</span>
        </h3>

        <h3 className="">{ruasJalan?.keterangan}</h3>

        {/* Category */}
        <div className="flex gap-1 py-2">
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{jenisJalan}</h3>
          </div>
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{kondisiJalan}</h3>
          </div>
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{eksistingJalan}</h3>
          </div>
        </div>
        <h3 className="text-sm text-blue-400 underline">Lihat detail</h3>
      </div>
    </div>
  );
};

export default RoadInfo;
