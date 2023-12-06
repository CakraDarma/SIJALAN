import Link from "next/link";
import React from "react";
import { Icons } from "../icons";
import Image from "next/image";
export default function Create() {
  return (
    <div className="mb-30 bg-gray-50 dark:bg-gray-800" id="createvilla">
      <div className=" py-40 px-[100px] max-w-[1366px] mx-auto" id="maps">
        <div className="flex justify-between gap-20">
          <div className="flex flex-col w-1/3 gap-5 py-10">
            <div>
              <h1 className="text-3xl font-semibold ">Buat informasi jalan</h1>
              <h1 className="mt-5 text-lg text-gray-500">
                Berkontribusilah dalam menambahkan data informasi jalan ke pada
                sistem kami
              </h1>
            </div>
            <Link
              href="/create"
              className=" text-xl font-semibold capitalize text-blue-500 border rounded-[5px] border-blue-500  py-2  scale-90 hover:scale-100 hover:bg-blue-500 hover:text-white duration-100 transition transform ease-in hover:border-none w-[150px] flex justify-center gap-2 items-center"
            >
              <Icons.add />
              <div>Tambahkan</div>
            </Link>
          </div>
          <div className="w-2/3 ">
            <Image
              src="/images/createImage.png"
              alt="information create road"
              width={1000}
              height={1000}
              quality={100}
              className="w-full h-[300px] rounded-xl object-fit shadow-2xl "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
