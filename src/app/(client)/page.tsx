import HeaderContainer from "@/components/HeaderContainer";
import MainContainer from "@/components/MainContainer";
import Transaction from "@/components/Transaction";

function page() {
  return (
    <MainContainer>
      <HeaderContainer pageName="Dashboard" />

      <Transaction />
    </MainContainer>
  );
}

export default page;
