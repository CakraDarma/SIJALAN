"use client";

import * as React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SignUpValidator } from "@/lib/validators/auth";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
// import { redirect } from "next/navigation";

type FormData = z.infer<typeof SignUpValidator>;

interface SignUpProps extends React.HTMLAttributes<HTMLDivElement> {}

function SignUp({ className, ...props }: SignUpProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(SignUpValidator),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutate: loginAccount, isLoading } = useMutation({
    mutationFn: async ({ name, email, password }: FormData) => {
      const payload: FormData = { email, password, name };

      const { data } = await axios.post(
        `https://gisapis.manpits.xyz/api/register`,
        payload
      );
      console.log(data);
      return data;
    },
    onError: () => {
      return toast({
        title: "Terjadi kesalahan.",
        description: "Email sudah digunakan.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        description: "Register berhasil",
      });
      // redirect("/sign-in");
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={handleSubmit((e) => loginAccount(e))}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Name"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("name")}
            />
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register("email")}
            />
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              {...register("password")}
            />
          </div>
          <Button disabled={isLoading}>Register</Button>
          {errors?.email && (
            <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
          )}
          {errors?.password && (
            <p className="px-1 text-xs text-red-600">
              {errors.password.message}
            </p>
          )}
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="px-2 bg-background text-muted-foreground">
            ATAU LOGIN MENGGUNAKAN
          </span>
        </div>
      </div>
      <p className="px-8 text-sm leading-6 text-center text-muted-foreground">
        Sudah memiliki akun?{" "}
        <Link
          href="/sign-in"
          className="underline underline-offset-4 hover:text-primary"
        >
          Login akun
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
