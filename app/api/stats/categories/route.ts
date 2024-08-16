import { OverviewQuerySchema } from "@/schema/overview";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const { searchParams } = new URL(request.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  console.log("Received from:", from);
  console.log("Received to:", to);

  // Verifique se 'from' e 'to' estão definidos e são válidos
  if (!from || !to) {
    console.error("Missing 'from' or 'to' parameters.");
    return new Response(
      JSON.stringify({ error: "Missing 'from' or 'to' parameters." }),
      { status: 400 }
    );
  }

  const queryParams = OverviewQuerySchema.safeParse({ from, to });
  if (!queryParams.success) {
    console.error("Validation failed:", queryParams.error);
    return new Response(
      JSON.stringify({
        error: "Invalid date range.",
        details: queryParams.error.errors,
      }),
      { status: 400 }
    );
  }

  console.log("Parsed dates:", queryParams.data.from, queryParams.data.to);

  const stats = await getCategoriesStats(
    user.id,
    new Date(queryParams.data.from),
    new Date(queryParams.data.to)
  );

  return new Response(JSON.stringify(stats), {
    headers: { "Content-Type": "application/json" },
  });
}

export type getCategoriesStatsType = Awaited<
  ReturnType<typeof getCategoriesStats>
>;

async function getCategoriesStats(userId: string, from: Date, to: Date) {
  const stats = await prisma.transaction.groupBy({
    by: ["type", "category", "categoryIcon"],
    where: {
      userId,
      date: {
        gte: from,
        lte: to,
      },
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: "desc",
      },
    },
  });

  return stats;
}
