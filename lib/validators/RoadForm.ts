import { z } from "zod";

export const RoadFormValidator = z.object({
  nama: z.string().min(2).max(32),
  kode: z.string().min(2).max(32),
  jenisId: z.number().min(1),
  desaId: z.number().min(1),
  paths: z.string().min(2).max(64),
  eksistingId: z.number().min(1),
  kondisiId: z.number().min(1),
  panjang: z.number().min(1),
  lebar: z.number().min(1),
  deskripsi: z.string().min(2),
});
