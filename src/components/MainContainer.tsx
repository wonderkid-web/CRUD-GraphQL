import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainContainer = ({ children }: Props) => {
  return (
    <div className="h-full max-h-full p-4 container space-y-4 overflow-y-scroll">
      {children}
    </div>
  );
};

export default MainContainer;
