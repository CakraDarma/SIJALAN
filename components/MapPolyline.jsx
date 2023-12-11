"use client";

import axios from "axios";
import { FeatureGroup, MapContainer, TileLayer, Popup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import polyline from "polyline-encoded";
import Link from "next/link";
import RoadInfo from "@/components/RoadInfo";

const Map = ({ session, updateParentData }) => {
  const [encodedPolylines, setEncodedPolylines] = useState([]);
  const [jalan, setJalan] = useState();
  const featureGroupRef = useRef();
  async function fetchData() {
    try {
      const response = await axios.get(
        "https://gisapis.manpits.xyz/api/ruasjalan",
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );
      setEncodedPolylines(response.data.ruasjalan);
    } catch (error) {
      console.error("Terjadi kesalahan dalam pengambilan data:", error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (featureGroupRef.current) {
      featureGroupRef.current.clearLayers();
      encodedPolylines?.map((data) => {
        const decodedCoords = polyline.decode(data.paths);
        const id = data.id;
        const polylineLayer = L.polyline(decodedCoords, {
          id,
        });
        polylineLayer.on("click", onPolylineClick);
        featureGroupRef.current.addLayer(polylineLayer);
      });
    }
  }, [encodedPolylines]);

  const onCreated = async (e) => {
    const { layer } = e;

    const coordinates = layer.getLatLngs().map((latLng) => ({
      lat: latLng.lat,
      lng: latLng.lng,
    }));
    const encodedPolyline = await polyline.encode(
      coordinates.map((coord) => [coord.lat, coord.lng])
    );
    updateParentData(encodedPolyline);
    return encodedPolyline;
  };

  const onEdited = async (e) => {
    const {
      layers: { _layers },
    } = e;

    let id;
    let encodedPolyline;
    Object.values(_layers).map(({ options, editing }) => {
      const coordinates = editing.latlngs[0].map((latLng) => ({
        lat: latLng.lat,
        lng: latLng.lng,
      }));
      id = options.id;
      encodedPolyline = polyline.encode(
        coordinates.map((coord) => [coord.lat, coord.lng])
      );
    });

    const body = {
      paths: encodedPolyline,
      desa_id: 473,
      kode_ruas: "R15435",
      nama_ruas: "10-12",
      panjang: 100,
      lebar: 10,
      eksisting_id: 2,
      kondisi_id: 2,
      jenisjalan_id: 1,
      keterangan: "oke",
    };
    await axios.put(`https://gisapis.manpits.xyz/api/ruasjalan/${id}`, body, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    fetchData();
  };

  const onDeleted = async (e) => {
    const {
      layers: { _layers },
    } = e;
    let id;

    Object.values(_layers).map(({ options }) => {
      id = options.id;
    });
    await axios.delete(`https://gisapis.manpits.xyz/api/ruasjalan/${id}`, {
      headers: {
        Authorization: `Bearer ${session.user.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    fetchData();
  };

  const onPolylineClick = async (e) => {
    const { target } = e;
    const id = target.options.id;
    try {
      const response = await axios.get(
        `https://gisapis.manpits.xyz/api/ruasjalan/${id}`,
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        }
      );

      // const response2 = await axios.get(
      //   `https://gisapis.manpits.xyz/api/mjenisjalan`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${session.user.accessToken}`,
      //     },
      //   }
      // );
      // const jenisJalans = response2.data.eksisting

      // console.log(response2);

      setJalan(response.data.ruasjalan);
    } catch (error) {
      console.error(
        "Terjadi kesalahan dalam pengambilan data ruas jalan:",
        error
      );
    }
  };

  return (
    <MapContainer
      center={[-8.6828693, 115.2004822]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "100vh",
        width: "100%",
        zIndex: "0",
      }}
    >
      <FeatureGroup ref={featureGroupRef}>
        <EditControl
          onCreated={onCreated}
          onEdited={onEdited}
          onDeleted={onDeleted}
          position="topright"
          draw={{
            rectangle: false,
            circle: false,
            circlemarker: false,
            marker: false,
            polyline: true,
            polygon: false,
          }}
        />
        <Popup>
          <Link href={`/maps/${jalan?.id}`}>
            <RoadInfo ruasJalan={jalan} />
          </Link>
        </Popup>
      </FeatureGroup>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
};

export default Map;
