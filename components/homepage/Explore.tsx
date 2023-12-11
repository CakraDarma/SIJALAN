import Link from "next/link";
import React from "react";
import { Icons } from "../Icons";
import Image from "next/image";

export default function Explore() {
  return (
    <div className="my-32 px-[100px] max-w-[1366px] mx-auto" id="maps">
      <div className="flex flex-col justify-between gap-20 md:flex-row">
        <div className="w-full md:w-2/3 ">
          <Image
            src="/images/maps.png"
            alt="Maps"
            width={1000}
            height={1000}
            quality={100}
            className="w-full h-[400px] rounded-xl shadow-2xl border p-1"
          />
        </div>
        <div className="flex flex-col w-1/3 py-10 md:gap-5 md:mt-14">
          <div>
            <h1 className="text-3xl font-semibold ">Ekspolrasi Jalan</h1>
            <h1 className="mt-5 text-lg text-gray-500">
              Dapatkan informasi jalan terkini dengan peta interaktif
            </h1>
          </div>
          <Link
            href="/maps"
            className=" text-xl font-semibold capitalize text-blue-500 border rounded-[5px] border-blue-500  py-2  scale-90 hover:scale-100 hover:bg-blue-500 hover:text-white duration-100 transition transform ease-in hover:border-none w-[130px] flex justify-center gap-2 items-center"
          >
            <Icons.search className="w-6 h-6 " />

            <div>Cari..</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
