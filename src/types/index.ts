export type PageNameType = "Dashboard" | "Beranda" | "Transaksi";

export type TipeTransaksiType = "KHATIB" | "INFAQ" | "NAZIR";

export type FirebaseTimeType = {
  nanoseconds: number;
  seconds: number;
};

export interface FormTransaksiType {
  keterangan: string;
  nominal: number;
  type: TipeTransaksiType;
  created_at: FirebaseTimeType | Date;
  id: string;
}

export type TransactionsGraphType = {
  transactions: FormTransaksiType[];
};

export type StatisticType = {
  statisticInfaq: {
    totalInfaq: number;
  };
  statisticNazir: {
    totalNazir: number;
  };
  statisticKhatib: {
    totalKhatib: number;
  };
  statisticTotal: {
    transaksiMasuk: number;
    transaksiKeluar: number;
    totalKas: number;
  };
  khatibTime: {
    oldest: string;
    newest: string;
  };
};
