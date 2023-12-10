import React from "react";
import { Desa, Eksisting, JenisJalan, KondisiJalan } from "@/types/api";
interface RoadFormProps {
  listDesa: Desa;
  listEksisting: Eksisting;
  listJenisJalan: JenisJalan;
  listKondisiJalan: KondisiJalan;
}

export default function RoadForm({
  listDesa,
  listEksisting,
  listJenisJalan,
  listKondisiJalan,
}: RoadFormProps) {
  return (
    <form>
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
            // onChange={(e) => setRoomName(e.target.value)}
            type="text"
            id="ruasJalanName"
            className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
            required
          ></input>
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
              // onChange={(e) => setBed(parseInt(e.target.value))}
              type="text"
              id="kodeJalan"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
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
              name="jenisJalan"
              // value={selectedCity}
              // onChange={handleCityChange}
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
            >
              <option value="" className="text-gray-500">
                -- Pilih Jenis Jalan --
              </option>
              {listJenisJalan.map((data) => (
                <option key={data.id} value={data.id}>
                  {data.jenisjalan}
                </option>
              ))}
            </select>
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
            name="desa"
            // value={selectedCity}
            // onChange={handleCityChange}
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
        </div>
        {/* <ComboBox /> */}
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
          {/* <MapComponent onLocationSelected={handleLocationSelected} /> */}
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
            name="eksisting"
            // value={selectedCity}
            // onChange={handleCityChange}
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
        </div>
        <div>
          <label htmlFor="kondisi" className="mr-2 text-gray-900 text-medium">
            Kondisi jalan<span className="text-blue-500">*</span>
          </label>
          <select
            id="kondisi"
            name="kondisi"
            // value={selectedCity}
            // onChange={handleCityChange}
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
        </div>

        <div className="flex gap-2">
          <div className="w-full">
            <label className="mr-2 text-gray-900 text-medium" htmlFor="panjang">
              Panjang<span className="text-blue-500">*</span>
            </label>
            <input
              // onChange={(e) => setBed(parseInt(e.target.value))}
              type="text"
              id="panjang"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
          </div>
          <div className="w-full">
            <label className="mr-2 text-gray-900 text-medium" htmlFor="lebar">
              Lebar<span className="text-blue-500">*</span>
            </label>
            <input
              // onChange={(e) => setBath(parseInt(e.target.value))}
              type="text"
              id="lebar"
              className="border  text-gray-900 text-sm rounded-lg  focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5  border-blue-300 dark:placeholder-gray-400 "
              required
            ></input>
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
          // onChange={(e) => setDescription(e.target.value)}
          id="deskripsi"
          placeholder="Tambahkan deskripsi keterangan terkait jalan"
          required
          className="border text-gray-900 text-sm rounded-lg focus:border-blue-500 focus:border-2 focus:ring-blue-500 outline-none block w-full p-2.5 border-blue-300 dark:placeholder-gray-400 resize-none h-40"
        ></textarea>
      </div>

      <button
        // onClick={handleSubmit}
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
  );
}
