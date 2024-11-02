import { Calculator, House, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <nav className=" bottom-0 container flex gap-2 justify-evenly items-center bg-creme border border-t-carcoal">
      <Link href="/dashboard"><LayoutDashboard strokeWidth={1} color="#494F55" /></Link>
      <Link href="/"><House strokeWidth={1} size={32} color="#494F55" /></Link>
      <Link href="/transaksi"><Calculator strokeWidth={1} color="#494F55" /></Link>
    </nav>
  );
}

export default Navbar;
