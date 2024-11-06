"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowDownToDot } from "lucide-react";

const FormSchema = z.object({
  keterangan: z.string().min(5, {
    message: "Minimal Text 5 Huruf",
  }),
  nominal: z.string({
    message: "Minimal Pengeluaran Rp.500",
  }),
  type: z.enum(["KHATIB", "INFAQ", "NAZIR", "DANA_MASUK"], {
    message: "Wajib memilih jenis Transaksi",
  }),
});

function FormTransaction() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      keterangan: "",
      nominal: "",
      type: "DANA_MASUK",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormSchema>) => {
    const sleep = async (time: number) =>
      new Promise((res) => setTimeout(res, time));

    const created_at = new Date();

    const toastId = toast.loading("Memproses Transaksi");

    await sleep(800);

    toast.dismiss(toastId);

    toast.success("Berhasil Melakukan Transaksi");
    console.log({
      ...values,
      created_at,
      nominal: values.nominal.replace(".", ""),
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 text-carcoal gap-4"
      >
        <FormField
          control={form.control}
          name="keterangan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi Transaksi</FormLabel>
              <FormControl>
                <Input placeholder="Deskripsi Transaksi" {...field} />
              </FormControl>
              <FormDescription>Jelaskan Keterangan Transaksi.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nominal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nominal Transaksi</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="string"
                    className="pl-10"
                    placeholder="Nominal Transaksi"
                    {...field}
                    onChange={(e) => {
                      const  currValue = e.currentTarget.value.replace(/\D/g, ""); // Remove non-numeric characters
                      let formattedValue = "";

                      for (let i = 0; i < currValue.length; i++) {
                        if (i > 0 && (currValue.length - i) % 3 === 0) {
                          formattedValue += ".";
                        }
                        formattedValue += currValue[i];
                      }

                      field.onChange(formattedValue);
                    }}
                  />
                  <p className="absolute left-3 top-[.77rem] text-carcoal text-sm">
                    Rp.{" "}
                  </p>
                </div>
              </FormControl>
              <FormDescription>
                Nominal Transaksi minimal Rp. 500.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex flex-col mt-2">
              <FormLabel>Pilih Type Transaksi</FormLabel>
              <FormControl>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="shadow-none border-carcoal h-12 justify-between"
                    >
                      {`Transaksi ${field.value}` || "Pilih Jenis Transaksi"}
                      <ArrowDownToDot strokeWidth={1} color="#494F55" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[92vw] md:max-w-sm text-carcoal self-start">
                    <DropdownMenuLabel>Transaksi Masuk</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <DropdownMenuRadioItem value="dana_masuk">
                        Dana Masuk
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                    <DropdownMenuLabel>Transaksi Keluar</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <DropdownMenuRadioItem value="infaq">
                        Transaksi Infaq
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="jumat">
                        Transaksi Khatib
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="nazir">
                        Transaksi Nazir
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </FormControl>
              <FormDescription>Tentukan jenis transaksi.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-[#2E8B57] mt-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default FormTransaction;
