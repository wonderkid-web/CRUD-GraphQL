import HeaderContainer from "@/components/HeaderContainer";
import MainContainer from "@/components/MainContainer";
import Transaction from "@/components/Transaction";

function page() {
  return (
    <MainContainer>
      <HeaderContainer pageName="Dashboard" />

      <div className="grid grid-cols-1 gap-3 px-2  h-[80vh] overflow-y-scroll">
        <Transaction />
      </div>
    </MainContainer>
  );
}

export default page;
