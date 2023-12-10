// "use client";

// import * as React from "react";
// import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// const listDesa = [
//   {
//     value: "next.js",
//     label: "Next.js",
//   },
//   {
//     value: "sveltekit",
//     label: "SvelteKit",
//   },
//   {
//     value: "nuxt.js",
//     label: "Nuxt.js",
//   },
//   {
//     value: "remix",
//     label: "Remix",
//   },
//   {
//     value: "astro",
//     label: "Astro",
//   },
// ];

// interface ComboBoxProps {
//   data: [],
//   name: string
// }

// export function ComboBox({data, name} : ComboBoxProps) {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="justify-between w-full bg-white "
//         >
//           {value
//             ? data.find((data) => data.value === value)?.label
//             : `Pilih ${name}`}
//           <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-[200px] p-0">
//         <Command>
//           <CommandInput placeholder="Search framework..." className="h-9" />
//           <CommandEmpty>Desa tidak ditemukan</CommandEmpty>
//           <CommandGroup>
//             {listDesa.map((framework) => (
//               <CommandItem
//                 key={framework.value}
//                 value={framework.value}
//                 onSelect={(currentValue) => {
//                   setValue(currentValue === value ? "" : currentValue);
//                   setOpen(false);
//                 }}
//               >
//                 {framework.label}
//                 <CheckIcon
//                   className={cn(
//                     "ml-auto h-4 w-4",
//                     value === framework.value ? "opacity-100" : "opacity-0"
//                   )}
//                 />
//               </CommandItem>
//             ))}
//           </CommandGroup>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }
