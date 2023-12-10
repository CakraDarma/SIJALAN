"use client";
import React from "react";
import { Desa, Eksisting, JenisJalan, KondisiJalan } from "@/types/api";
import { RoadFormValidator } from "@/lib/validators/RoadForm";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter, useParams } from "next/navigation";
import { RoadData } from "@/types/RoadData";

interface RoadFormEditProps {
  listDesa: Desa;
  listEksisting: Eksisting;
  listJenisJalan: JenisJalan;
  listKondisiJalan: KondisiJalan;
  session: any;
  dataForm: RoadData;
}
const DynamicMap = dynamic(() => import("@/components/MapPolyline"), {
  ssr: false,
});
type FormData = z.infer<typeof RoadFormValidator>;

export default function RoadFormEdit({
  listDesa,
  listEksisting,
  listJenisJalan,
  listKondisiJalan,
  session,
  dataForm,
}: RoadFormEditProps) {
  const params = useParams();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(RoadFormValidator),
    defaultValues: {
      nama: dataForm.nama_ruas,
      kode: dataForm.kode_ruas,
      jenisId: dataForm.jenisjalan_id,
      desaId: dataForm.desa_id,
      deskripsi: dataForm.keterangan,
      eksistingId: dataForm.eksisting_id,
      kondisiId: dataForm.kondisi_id,
      lebar: dataForm.lebar,
      panjang: dataForm.panjang,
      paths: dataForm.paths,
    },
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

      const { data } = await axios.put(
        `https://gisapis.manpits.xyz/api/ruasjalan/${params.mapsId}`,
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
              {...register("jenisId", {
                valueAsNumber: true,
              })}
            >
              <option className="text-gray-500">-- Pilih Jenis Jalan --</option>
              {listJenisJalan.map((data) => (
                <option key={data.id} value={parseInt(data.id)}>
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
            htmlFor="desa"
            className="block mb-2 font-medium text-gray-900 text-medium"
          >
            Pilih Desa<span className="text-blue-500">*</span>
          </label>
          <select
            id="desa"
            {...register("desaId", {
              valueAsNumber: true,
            })}
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
          >
            <option value="" className="text-gray-500">
              -- Pilih Desa --
            </option>
            {listDesa.map((desa) => (
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
          {/* <input
            {...register("paths")}
            type="text"
            id="paths"
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
            required
          ></input>
          {errors?.paths && (
            <p className="px-1 text-xs text-red-600">{errors.paths.message}</p>
          )} */}
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
            {...register("eksistingId", {
              valueAsNumber: true,
            })}
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
            // onChange={(e) => setValue("kondisiId", parseInt(e.target.value))}
            {...register("kondisiId", {
              valueAsNumber: true,
            })}
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
