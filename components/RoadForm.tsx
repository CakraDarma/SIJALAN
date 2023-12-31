"use client";
import React, { useEffect, useState } from "react";
import {
  Desa,
  Eksisting,
  JenisJalan,
  Kabupaten,
  Kecamatan,
  KondisiJalan,
  Provinsi,
} from "@/types/api";
import { RoadFormValidator } from "@/lib/validators/RoadForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { getDesa, getKabupaten, getKecamatan } from "@/lib/masterData";

interface RoadFormProps {
  listProvinsi: Provinsi;
  listEksisting: Eksisting;
  listJenisJalan: JenisJalan;
  listKondisiJalan: KondisiJalan;
  session: any;
}
const DynamicMap = dynamic(() => import("@/components/MapPolyline"), {
  ssr: false,
});
type FormData = z.infer<typeof RoadFormValidator>;

export default function RoadForm({
  listProvinsi,
  listEksisting,
  listJenisJalan,
  listKondisiJalan,
  session,
}: RoadFormProps) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(RoadFormValidator),
    defaultValues: {},
  });

  const { mutate: postKegiatan, isLoading } = useMutation({
    mutationFn: async ({
      nama,
      kode,
      jenisId,
      desaId,
      deskripsi,
      eksistingId,
      kondisiId,
      lebar,
      panjang,
      paths,
    }: FormData) => {
      const payload = {
        paths: paths,
        desa_id: desaId,
        kode_ruas: kode,
        nama_ruas: nama,
        panjang: panjang,
        lebar: lebar,
        eksisting_id: eksistingId,
        kondisi_id: kondisiId,
        jenisjalan_id: jenisId,
        keterangan: deskripsi,
      };

      const { data } = await axios.post(
        `https://gisapis.manpits.xyz/api/ruasjalan`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
    onError: () => {
      return toast({
        title: "Terjadi kesalahan.",
        description: "Tidak dapat menambahkan data, silakan coba lagi.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Berhasil menambahkan data",
      });
      router.push(`/dashboard`);
    },
  });

  function receivePaths(data: string) {
    setValue("paths", data);
  }

  const [selectedIdProvinsi, setSelectedIdProvinsi] = useState<
    number | undefined
  >();
  const [selectedIdKabupaten, setSelectedIdKabupaten] = useState<
    number | undefined
  >();
  const [selectedIdKecamatan, setSelectedIdKecamatan] = useState<
    number | undefined
  >();
  const [selectedIdDesa, setSelectedIdDesa] = useState<number | undefined>();

  const [listKabupaten, setListKabupaten] = useState<Kabupaten | undefined>();
  const [listKecamatan, setListKecamatan] = useState<Kecamatan | undefined>();
  const [listDesa, setListDesa] = useState<Desa | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { kabupaten } = await getKabupaten(selectedIdProvinsi, session);
        setListKabupaten(kabupaten);
      } catch (error) {
        console.error("Error fetching kabupaten:", error);
      }
    };
    fetchData();
  }, [selectedIdProvinsi]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { kecamatan } = await getKecamatan(selectedIdKabupaten, session);
        setListKecamatan(kecamatan);
      } catch (error) {
        console.error("Error fetching kecamatan:", error);
      }
    };
    fetchData();
  }, [selectedIdKabupaten]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { desa } = await getDesa(selectedIdKecamatan, session);
        setListDesa(desa);
      } catch (error) {
        console.error("Error fetching desa:", error);
      }
    };
    fetchData();
  }, [selectedIdKecamatan]);

  return (
    <form onSubmit={handleSubmit((e) => postKegiatan(e))}>
      {/* informasi umum ruas jalan */}
      <div className="mt-5 mb-6">
        <div>
          <label
            className="mr-2 text-gray-900 text-medium "
            htmlFor="ruasJalanName"
          >
            Nama Ruas Jalan<span className="text-blue-500">*</span>
          </label>

          <input
            {...register("nama")}
            type="text"
            id="ruasJalanName"
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
            required
          ></input>
          {errors?.nama && (
            <p className="px-1 text-xs text-red-600">{errors.nama.message}</p>
          )}
        </div>
        <div className="flex gap-2">
          <div className="w-full">
            <label
              className="mr-2 text-gray-900 text-medium"
              htmlFor="kodeJalan"
            >
              Kode Ruas jalan<span className="text-blue-500">*</span>
            </label>
            <input
              {...register("kode")}
              type="text"
              id="kodeJalan"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
            {errors?.kode && (
              <p className="px-1 text-xs text-red-600">{errors.kode.message}</p>
            )}
          </div>
          <div className="w-full">
            <label
              className="mr-2 text-gray-900 text-medium"
              htmlFor="jenisJalan"
            >
              Jenis Jalan<span className="text-blue-500">*</span>
            </label>
            <select
              id="jenisJalan"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              onChange={(e) => setValue("jenisId", parseInt(e.target.value))}
            >
              <option value={3} className="text-gray-500">
                -- Pilih Jenis Jalan --
              </option>
              {listJenisJalan.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.jenisjalan}
                </option>
              ))}
            </select>
            {errors?.jenisId && (
              <p className="px-1 text-xs text-red-600">
                {errors.jenisId.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="mb-6">
        <div>
          <label
            htmlFor="provinsi"
            className="block mb-2 font-medium text-gray-900 text-medium"
          >
            Pilih Provinsi<span className="text-blue-500">*</span>
          </label>
          <select
            id="provinsi"
            onChange={(e) => {
              setValue("provinsiId", parseInt(e.target.value));
              setSelectedIdProvinsi(parseInt(e.target.value));
            }}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Provinsi --
            </option>
            {listProvinsi.map((provinsi) => (
              <option key={provinsi.id} value={provinsi.id}>
                {provinsi.provinsi}
              </option>
            ))}
          </select>
          {errors?.provinsiId && (
            <p className="px-1 text-xs text-red-600">
              {errors.provinsiId.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="kabupaten"
            className="block mb-2 font-medium text-gray-900 text-medium"
          >
            Pilih Kabupaten<span className="text-blue-500">*</span>
          </label>
          <select
            id="kabupaten"
            onChange={(e) => {
              setValue("kabupatenId", parseInt(e.target.value));
              setSelectedIdKabupaten(parseInt(e.target.value));
            }}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Kabupaten --
            </option>
            {listKabupaten?.map((kabupaten) => (
              <option key={kabupaten.id} value={kabupaten.id}>
                {kabupaten.value}
              </option>
            ))}
          </select>
          {errors?.kabupatenId && (
            <p className="px-1 text-xs text-red-600">
              {errors.kabupatenId.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="kecamatan"
            className="block mb-2 font-medium text-gray-900 text-medium"
          >
            Pilih Kecamatan<span className="text-blue-500">*</span>
          </label>
          <select
            id="kecamatan"
            onChange={(e) => {
              setValue("kecamatanId", parseInt(e.target.value));
              setSelectedIdKecamatan(parseInt(e.target.value));
            }}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Kecamatan --
            </option>
            {listKecamatan?.map((kecamatan) => (
              <option key={kecamatan.id} value={kecamatan.id}>
                {kecamatan.value}
              </option>
            ))}
          </select>
          {errors?.kecamatanId && (
            <p className="px-1 text-xs text-red-600">
              {errors.kecamatanId.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="desa"
            className="block mb-2 font-medium text-gray-900 text-medium"
          >
            Pilih Desa<span className="text-blue-500">*</span>
          </label>
          <select
            id="desa"
            onChange={(e) => {
              setValue("desaId", parseInt(e.target.value));
              setSelectedIdDesa(parseInt(e.target.value));
            }}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Desa --
            </option>
            {listDesa?.map((desa) => (
              <option key={desa.id} value={desa.id}>
                {desa.value}
              </option>
            ))}
          </select>
          {errors?.desaId && (
            <p className="px-1 text-xs text-red-600">{errors.desaId.message}</p>
          )}
        </div>
      </div>

      {/* Location on Map */}
      <div>
        <label
          htmlFor="map"
          className="block mb-2 font-medium text-gray-900 text-medium"
        >
          Tambahkan Ruas Jalan Pada Peta
          <span className="text-blue-500">*</span>
        </label>
        <div className="mb-6 border-2 border-blue-300 rounded-lg">
          <DynamicMap session={session} updateParentData={receivePaths} />
        </div>
      </div>

      {/* informasi umum ruas jalan */}
      <div className="mt-5 mb-6">
        <label className="block mb-2 text-lg font-semibold text-gray-900">
          Detail Ruas Jalan
        </label>
        <div>
          <label
            htmlFor="eksisting"
            className="text-gray-900 bmr-2 text-medium"
          >
            Eksisting Jalan<span className="text-blue-500">*</span>
          </label>
          <select
            id="eksisting"
            onChange={(e) => setValue("eksistingId", parseInt(e.target.value))}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Eksisting Jalan --
            </option>
            {listEksisting.map((data) => (
              <option key={data.id} value={data.id}>
                {data.eksisting}
              </option>
            ))}
          </select>
          {errors?.eksistingId && (
            <p className="px-1 text-xs text-red-600">
              {errors.eksistingId.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="kondisi" className="mr-2 text-gray-900 text-medium">
            Kondisi jalan<span className="text-blue-500">*</span>
          </label>
          <select
            id="kondisi"
            onChange={(e) => setValue("kondisiId", parseInt(e.target.value))}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Kondisi jalan --
            </option>
            {listKondisiJalan.map((data) => (
              <option key={data.id} value={data.id}>
                {data.kondisi}
              </option>
            ))}
          </select>
          {errors?.kondisiId && (
            <p className="px-1 text-xs text-red-600">
              {errors.kondisiId.message}
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <label className="mr-2 text-gray-900 text-medium" htmlFor="panjang">
              Panjang<span className="text-blue-500">*</span>
            </label>
            <input
              {...register("panjang", {
                valueAsNumber: true,
              })}
              type="number"
              id="panjang"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
            {errors?.panjang && (
              <p className="px-1 text-xs text-red-600">
                {errors.panjang.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <label className="mr-2 text-gray-900 text-medium" htmlFor="lebar">
              Lebar<span className="text-blue-500">*</span>
            </label>
            <input
              {...register("lebar", {
                valueAsNumber: true,
              })}
              type="number"
              id="lebar"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
            {errors?.lebar && (
              <p className="px-1 text-xs text-red-600">
                {errors.lebar.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 mb-6">
        <label
          className="block mb-2 font-medium text-gray-900 text-medium"
          htmlFor="deskripsi"
        >
          Deskripsi<span className="text-blue-500">*</span>
        </label>
        <textarea
          {...register("deskripsi")}
          id="deskripsi"
          placeholder="Tambahkan deskripsi keterangan terkait jalan"
          required
          className="border text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5 border-blue-300 dark:placeholder-gray-400 resize-none h-40"
        ></textarea>
        {errors?.deskripsi && (
          <p className="px-1 text-xs text-red-600">
            {errors.deskripsi.message}
          </p>
        )}
      </div>

      <Button className="bg-blue-600 hover:bg-blue-800" disabled={isLoading}>
        Submit
      </Button>
    </form>
  );
}
