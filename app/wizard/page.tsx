import { CurrencyComboBox } from "@/components/CurrencyComboBox";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="container flex max-w-2xl flex-col items-center justify-between gap-4">
      <div>
        <h1 className="text-center text-3xl">
          Bem-vindo,
          <span className="ml-2 font-bold">
            {user.firstName ?? "Usuário"}! ✌
          </span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
          Vamos começar configurando sua moeda.
        </h2>

        <h4 className="mt-2 text-center text-sm text-muted-foreground">
          Você pode mudar essas configurações a qualquer hora...
        </h4>
      </div>
      <Separator />
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Moeda</CardTitle>
          <CardDescription>Defina sua moeda para transações</CardDescription>
        </CardHeader>
        <CardContent>
          <CurrencyComboBox />
        </CardContent>
      </Card>
      <Separator />
      <Button className="w-full" asChild>
        <Link href={"/"}>Estou decidido! Me leve para o dashboard</Link>
      </Button>
      <div className="mt-8">
        <Logo />
      </div>
    </div>
  );
}
