import React, { ReactNode } from "react";

type DashboardDataProps = {
  icon: Element | ReactNode;
  information: string;
  value: number | string;
};

function DashboardCard({ icon, information, value }: DashboardDataProps) {
  return (
    <div className="size-44 w-full rounded-md bg-creme flex flex-col gap-2 p-3 border border-carcoal text-carcoal">
      <div className="size-32 rounded-md text-[4rem] flex justify-center items-center bg-white font-semibold text-center border border-carcoal">
        {value}K
      </div>
      <div className="flex gap-1 items-center">
        {icon as ReactNode}
        <p className="text-xs w-fit">{information}</p>
      </div>
    </div>
  );
}

export default DashboardCard;
