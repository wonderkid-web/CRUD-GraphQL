import DashboardCard from "@/components/DashboardCard";
import { Calculator } from "lucide-react";
import Image from "next/image";
import logo from "../../../public/logo.jpeg";

const DashboardData = [
  {
    icon: <Calculator strokeWidth={1} color="#494F55" />,
    value: 5,
    information: "Infaq Masuk Terakhir",
  },
  {
    icon: <Calculator strokeWidth={1} color="#494F55" />,
    value: 5,
    information: "Pengeluaran Terakhir",
  },
  {
    icon: <Calculator strokeWidth={1} color="#494F55" />,
    value: 5,
    information: "Total Infaq",
  },
  {
    icon: <Calculator strokeWidth={1} color="#494F55" />,
    value: 5,
    information: "Total Pengeluaran",
  },
];

function page() {
  return (
    <div className="h-full max-h-full p-4 container space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-carcoal text-2xl col-span-full ml-2 font-bold">
          Dashboard
        </h1>
        <div className="size-12 relative overflow-hidden rounded-full border border-carcoal">
          <Image src={logo} alt="logo" objectFit="cover" fill />
        </div>
      </div>
      <div className="grid grid-cols-2 justify-items-center gap-3">
        {DashboardData.map((card) => (
          <DashboardCard key={card.information} {...card} />
        ))}

        <div className="h-fit w-full rounded-md bg-creme flex gap-2 p-3 border border-carcoal col-span-full text-carcoal">
          <div className="size-32 rounded-md text-[2.6rem] flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            350K
          </div>
          <div className="flex flex-col gap-2 p-1">
            <p className="text-md font-semibold">Al Ustad Agung Wiranata</p>
            <p className="italic text-sm">{"Jum'at"}, 01 November 2024</p>
            <div className="flex gap-1 items-center mt-auto">
              <Calculator strokeWidth={1} color="#494F55" />
              <p className="text-xs w-fit">Khatib Jumat Terakhir</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
