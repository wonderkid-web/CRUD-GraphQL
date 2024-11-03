import HeaderContainer from "@/components/HeaderContainer";
import MainContainer from "@/components/MainContainer";
import Image from "next/image";
import development from "../../../public/undraw_predictive_analytics_re_wxt8.svg"

function DevelopmentPage() {
  return (
    <MainContainer>
      <HeaderContainer pageName="Beranda" />

      <div className="flex justify-center items-center flex-col gap-3 ">
        <div className="size-32 relative overflow-hidden mt-56">
          <Image
            src={development}
            alt="development"
            fill
            objectFit="cover"
            sizes="full"
          />
        </div>
        <h1 className="text-2xl text-center text-carcoal font-medium">
          Halaman Sedang Dalam Tahap Pengembangan
        </h1>
      </div>
    </MainContainer>
  );
}

export default DevelopmentPage;
