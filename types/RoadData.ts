export interface RoadData {
  id: number;
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
}

export interface RoadForm {
  id: number;
  lebar: number;
  panjang: number;
  kode: string;
  nama: string;
}
