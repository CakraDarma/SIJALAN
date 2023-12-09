import Image from "next/image";
import { Icons } from "./icons";

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

const RoadInfo = ({ ruasJalan }: RoadInfoProps) => {
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
        <div className="flex items-center gap-1">
          <Icons.map className="w-4 h-4 text-blue-700" />
          <h3 className="text-sm">{ruasJalan?.desa_id}</h3>
        </div>
        <h3 className="">{ruasJalan?.keterangan}</h3>

        {/* Category */}
        <div className="flex gap-1 py-2">
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{ruasJalan?.jenisjalan_id}</h3>
          </div>
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{ruasJalan?.kondisi_id}</h3>
          </div>
          <div className="px-2 py-1 border border-orange-500 rounded-3xl">
            <h3 className="text-xs">{ruasJalan?.eksisting_id}</h3>
          </div>
        </div>
        <h3 className="text-sm text-blue-400 underline">Lihat detail</h3>
      </div>
    </div>
  );
};

export default RoadInfo;
