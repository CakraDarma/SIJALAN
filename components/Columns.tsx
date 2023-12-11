"use client";

import Link from "next/link";
import * as React from "react";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { RoadForm } from "@/types/RoadData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const Columns: ColumnDef<RoadForm>[] = [
  {
    accessorKey: "kode",
    header: "Kode",
    cell: ({ row }) => <div className="capitalize">{row.getValue("kode")}</div>,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("nama")}</div>,
  },

  {
    accessorKey: "panjang",
    header: "Panjang",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("panjang")} M</div>
    ),
  },
  {
    accessorKey: "lebar",
    header: "Lebar",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("lebar")} m</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: async ({ row }) => {
      const datas = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-8 h-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/maps/${datas.id}`}>View</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/maps/${datas.id}/edit`}>Update</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 "
              onClick={async () => {
                try {
                  await axios.delete(
                    `https://gisapis.manpits.xyz/api/ruasjalan/${datas.id}`,
                    {
                      headers: {
                        Authorization: `Bearer ${datas.session.user.accessToken}`,
                      },
                    }
                  );
                  toast({
                    description: "Data Anda berhasil dihapus.",
                  });
                } catch {
                  return toast({
                    title: "Terjadi kesalahan.",
                    description:
                      "Data tidak berhasil dihapus. Silakan coba lagi.",
                    variant: "destructive",
                  });
                }
              }}
            >
              <Link href={`/`}>Delete</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default Columns;
