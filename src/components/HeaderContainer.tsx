import Image from "next/image";
import logo from "../../public/logo.jpeg";
import { PageNameType } from "@/types";

type Props = {
    pageName: PageNameType
};

function HeaderContainer({pageName}: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-carcoal text-2xl col-span-full ml-2 font-bold">
        {pageName}
      </h1>
      <div className="size-12 relative overflow-hidden rounded-full border border-carcoal">
        <Image src={logo} alt="logo" objectFit="cover" fill sizes="full" />
      </div>
    </div>
  );
}

export default HeaderContainer;
