"use client";
import { Calculator } from "lucide-react";
import MainContainer from "@/components/MainContainer";
import HeaderContainer from "@/components/HeaderContainer";
import { useQuery } from "@apollo/client";
import {
  GET_STATISTIC_NAZIR,
  GET_STATISTIC_KHATIB,
  GET_STATISTIC_INFAQ,
  GET_STATISTIC_TOTAL,
  GET_KHATIB_TIME,
} from "@/graphql";
import { StatisticType } from "@/types";
import { formatCurrency } from "@/helper";

function Page() {
  const { data: dataNazir, loading: loadingNazir } =
    useQuery<StatisticType>(GET_STATISTIC_NAZIR);
  const { data: dataInfaq, loading: loadingInfaq } =
    useQuery<StatisticType>(GET_STATISTIC_INFAQ);
  const { data: dataKhatib, loading: loadingKhatib } =
    useQuery<StatisticType>(GET_STATISTIC_KHATIB);
  const { data: dataStatistic, loading: loadingStatistic } =
    useQuery<StatisticType>(GET_STATISTIC_TOTAL);
  const { data: khatibTime, loading: loadingKhatibTime } =
    useQuery<StatisticType>(GET_KHATIB_TIME);

  return (
    <MainContainer>
      <HeaderContainer pageName="Dashboard" />
      <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center gap-4">
        
        {/* {DashboardData.map((card) => (
          <DashboardCard key={card.information} {...card} />
        ))} */}

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingInfaq
              ? "loading.."
              : formatCurrency(dataInfaq?.statisticInfaq.totalInfaq as number)}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Total Infaq</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingKhatib
              ? "loading.."
              : formatCurrency(
                  dataKhatib?.statisticKhatib.totalKhatib as number
                )}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Total Khatib</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingStatistic
              ? "loading.."
              : formatCurrency(
                  dataStatistic?.statisticTotal.transaksiMasuk as number
                )}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Total Dana Masuk</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingStatistic
              ? "loading.."
              : formatCurrency(
                  dataStatistic?.statisticTotal.transaksiKeluar as number
                )}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Total Dana Keluar</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingStatistic
              ? "loading.."
              : formatCurrency(
                  dataStatistic?.statisticTotal.totalKas as number
                )}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Kas Tersedia</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-2xl flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingNazir
              ? "loading.."
              : formatCurrency(dataNazir?.statisticNazir.totalNazir as number)}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-xl w-fit">Total Nazir</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-lg flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingKhatibTime ? "loading.." : khatibTime?.khatibTime.oldest}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-md w-fit">Transaksi Nazir Terlama</p>
          </div>
        </div>

        <div className="h-fit w-full rounded-md bg-creme flex flex-col-reverse gap-2 p-3 border border-carcoal text-carcoal">
          <div className="rounded-md text-lg flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
            {loadingKhatibTime ? "loading.." : khatibTime?.khatibTime.newest}
          </div>
          <div className="flex gap-1 items-center">
            <Calculator strokeWidth={1} color="#494F55" />
            <p className="text-md w-fit">Transaksi Nazir Terbaru</p>
          </div>
        </div>

        {/* <div className="h-fit w-full rounded-md bg-creme flex gap-2 p-3 border border-carcoal col-span-full text-carcoal">
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

        <div className="h-fit w-full rounded-md bg-creme flex gap-2 p-3 border border-carcoal col-span-full text-carcoal">
          <div className="size-32 rounded-md text-[2.6rem] flex justify-center items-center bg-white font-semibold text-center border border-carcoal">

          </div>
          <div className="flex flex-col gap-2 p-1">
            <p className="text-md font-semibold">Al Ustad Agung Wiranata</p>
            <p className="italic text-sm">{"Jum'at"}, 01 November 2024</p>
            <div className="flex gap-1 items-center mt-auto">
              <Calculator strokeWidth={1} color="#494F55" />
              <p className="text-xs w-fit">Khatib Jumat Terakhir</p>
            </div>
          </div>
        </div> */}
      </section>
    </MainContainer>
  );
}

export default Page;
