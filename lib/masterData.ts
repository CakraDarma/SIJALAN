import axios from "axios";
import { getAuthSession } from "./auth";

export async function getDesaD() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      "https://gisapis.manpits.xyz/api/mregion",
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.desa;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}

export async function getProvinsi() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      "https://gisapis.manpits.xyz/api/mregion",
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.provinsi;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getKabupaten(id: number | undefined, session: any) {
  try {
    const response = await axios.get(
      `https://gisapis.manpits.xyz/api/kabupaten/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getKecamatan(id: number | undefined, session: any) {
  try {
    const response = await axios.get(
      `https://gisapis.manpits.xyz/api/kecamatan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getDesa(id: number | undefined, session: any) {
  try {
    const response = await axios.get(
      `https://gisapis.manpits.xyz/api/desa/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}

export async function getEksisting() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      "https://gisapis.manpits.xyz/api/meksisting",
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.eksisting;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getJenisJalan() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      "https://gisapis.manpits.xyz/api/mjenisjalan",
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.eksisting;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getKondisiJalan() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      "https://gisapis.manpits.xyz/api/mkondisi",
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.eksisting;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}

export async function getRoad(id: string) {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      `https://gisapis.manpits.xyz/api/ruasjalan/${id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.ruasjalan;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
export async function getRoads() {
  const session = await getAuthSession();
  try {
    const response = await axios.get(
      `https://gisapis.manpits.xyz/api/ruasjalan`,
      {
        headers: {
          Authorization: `Bearer ${session?.user.accessToken}`,
        },
      }
    );
    return response?.data.ruasjalan;
  } catch (error) {
    console.error("Terjadi kesalahan dalam pengambilan data:", error);
  }
}
