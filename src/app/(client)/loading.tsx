import Loader from "@/components/Loader";
import MainContainer from "@/components/MainContainer";
import React from "react";

const loading = () => {
  return (
    <MainContainer>
      <Loader />
    </MainContainer>
  );
};

export default loading;
