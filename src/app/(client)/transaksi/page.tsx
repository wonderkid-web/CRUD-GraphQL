import FormTransaction from "@/components/FormTransaction";
import HeaderContainer from "@/components/HeaderContainer";
import MainContainer from "@/components/MainContainer";
import React from "react";


const page = () => {
  return (
    <MainContainer>
      <HeaderContainer pageName="Transaksi" />
      <FormTransaction />
    </MainContainer>
  );
};

export default page;
