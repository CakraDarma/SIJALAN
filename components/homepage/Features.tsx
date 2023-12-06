import React from "react";
import { Icons } from "../icons";

export default function Features() {
  return (
    <div className="lg:my-10 ">
      <div className="mt-24 mb-14 px-[100px] max-w-[1366px] mx-auto">
        <h1 className="mb-3 font-semibold text-blue-500">Apa itu SIJALAN</h1>
        <div className="flex justify-between mb-5">
          <div>
            <h1 className="text-4xl font-semibold ">
              Menyediakan daftar informasi
            </h1>
            <h1 className="text-4xl font-semibold ">
              tentang kondisi jalan yang paling lengkap
            </h1>
          </div>
          <div>
            <h1 className="text-gray-500 ">
              Temukan informasi jalan yang Anda
            </h1>
            <h1 className="text-gray-500 ">
              butuhkan. melalui sistem informasi yang minimalis,
            </h1>
            <h1 className="text-gray-500">dengan bantuan teknologi terkini</h1>
          </div>
        </div>
      </div>
      <div className="flex md:flex-row flex-col justify-between mb-24 px-[100px] max-w-[1366px] mx-auto gap-2 ">
        <div className="w-full p-8 rounded-lg shadow-lg">
          <Icons.home className="mb-5 text-blue-700 w-14 h-14" />
          <h1 className="text-xl font-semibold">Temukan informasi jalan</h1>
          <p className="mt-5 text-gray-500 ">
            Menemukan informasi terkait kondisi{" "}
          </p>
          <p className="text-gray-500 ">jalan berdasarkan daerah tertentu</p>
          <p className="text-gray-500 ">yang anda cari.</p>
        </div>

        <div className="w-full p-8 rounded-lg shadow-lg ">
          <Icons.map className="mb-5 text-blue-700 w-14 h-14" />
          <h1 className="text-xl font-semibold">
            Eksplorasi jalan disekitar anda
          </h1>
          <p className="mt-5 text-gray-500 ">
            Memudahkan anda untuk mengetahui bagaimana
          </p>
          <p className="text-gray-500 ">
            {" "}
            kondisi jalan dengan sistem informasi{" "}
          </p>
          <p className="text-gray-500 ">yang menggunakan peta interaktif.</p>
        </div>

        <div className="w-full p-8 rounded-lg shadow-lg">
          <Icons.kegiatan className="mb-5 text-blue-700 w-14 h-14" />
          <h1 className="text-xl font-semibold">Tambahkan data jalan Anda</h1>
          <p className="mt-5 text-gray-500 ">Berkontribusi dalam sistem ini</p>
          <p className="text-gray-500 ">
            {" "}
            untuk menambahkan data jalan sehingga
          </p>
          <p className="text-gray-500 "> membantu orang banyak.</p>
        </div>
      </div>
    </div>
  );
}
