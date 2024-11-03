import HeaderContainer from "@/components/HeaderContainer";
import MainContainer from "@/components/MainContainer";
import { ArrowBigDownDash, ArrowBigUpDash } from "lucide-react";

function page() {
  return (
    <MainContainer>
      <HeaderContainer pageName="Dashboard" />

      <div className="grid grid-cols-1 gap-3 px-2  h-[80vh] overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6, 7].map((card) => (
          <div
            key={card}
            className="w-full rounded-sm border border-carcoal p-2 text-carcoal divide-y-4"
          >
            <div className="flex justify-between">
              <h1 className="text-lg font-bold">Type Transaksi: Infaq</h1>
              {card % 2 == 0 && (
                <ArrowBigUpDash strokeWidth={1} color="red" />
              )}
              {card % 2 == 1 && (
                <ArrowBigDownDash strokeWidth={1} color="green" />
              )}
            </div>
            <div className="flex justify-between items-center">
              <p>Deskripsi</p>
              <p className="italic text-xs line-clamp-1">Bayar Khatib</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Jenis Transaksi</p>
              <p className="italic text-xs">Masuk</p>
            </div>
            <div className="flex justify-between items-center">
              <p>Rp. 350.000</p>
              <p className="italic text-xs">{"Jum'at"}, 21 Desember 2024</p>
            </div>
          </div>
        ))}
      </div>
    </MainContainer>
  );
}

export default page;
