import DashboardCard from "@/components/DashboardCard";
import { Calculator } from "lucide-react";
import MainContainer from "@/components/MainContainer";
import HeaderContainer from "@/components/HeaderContainer";

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
    <MainContainer>
      <HeaderContainer pageName="Dashboard" />
      <section className="grid grid-cols-2 justify-items-center gap-4">
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
      </section>
    </MainContainer>
  );
}

export default page;
