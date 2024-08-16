"use server";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function DeleteTransaction(id: string) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const transaction = await prisma.transaction.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });

  if (!transaction) {
    throw new Error("bad request");
  }

  await prisma.$transaction([
    // Delete transaction from db
    prisma.transaction.delete({
      where: {
        id,
      },
    }),
    // Update month history
    prisma.monthHistory.update({
      where: {
        day_month_year_userId: {
          userId: user.id,
          day: transaction.date.getUTCDate(),
          month: transaction.date.getUTCMonth(),
          year: transaction.date.getUTCFullYear(),
        },
      },
      data: {
        ...(transaction.type === "despesa" && {
          despesa: {
            decrement: transaction.amount,
          },
        }),
        ...(transaction.type === "receita" && {
          receita: {
            decrement: transaction.amount,
          },
        }),
      },
    }),
  ]);

  await prisma.yearHistory.update({
    where: {
      month_year_userId: {
        userId: user.id,
        month: transaction.date.getUTCMonth(),
        year: transaction.date.getUTCFullYear(),
      },
    },
    data: {
      ...(transaction.type === "despesa" && {
        despesa: {
          decrement: transaction.amount,
        },
      }),
      ...(transaction.type === "receita" && {
        receita: {
          decrement: transaction.amount,
        },
      }),
    },
  });
}
