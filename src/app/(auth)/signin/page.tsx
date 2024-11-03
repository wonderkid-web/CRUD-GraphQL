"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import logo from "../../../../public/logo.jpeg";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const FormAuthSchema = z.object({
  username: z.string({
    message: "Username belum di isi",
  }),
  password: z.string({
    message: "Password belum di isi",
  }),
});

function Page() {
  const router = useRouter()
  const form = useForm<z.infer<typeof FormAuthSchema>>({
    resolver: zodResolver(FormAuthSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof FormAuthSchema>) => {
    const toastId = toast.loading("Proses Autentikasi");

    try {
      await signIn("credentials", {
        ...values,
        redirect: false,
      });

      toast.success("berhasil login");
      router.push('/')
    } catch (error : any) {
      toast.warning("username atau password kamu mungkin salah");
      toast.warning(error);
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border border-carcoal rounded-sm p-4 text-carcoal flex flex-col w-full m-4 gap-2"
      >
        <div className="rounded-full border border-carcoal relative self-center size-32 overflow-hidden">
          <Image src={logo} alt="logo" fill sizes="full" objectFit="cover" />
        </div>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username akun" {...field} />
              </FormControl>
              <FormDescription>Masukan Username Akun kamu.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password akun" {...field} />
              </FormControl>
              <FormDescription>Masukan Password Akun kamu.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          variant={"outline"}
          type="submit"
          className="bg-green-500 shadow-none border-carcoal"
        >
          signin
        </Button>
      </form>
    </Form>
  );
}

export default Page;
