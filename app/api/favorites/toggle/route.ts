import { NextResponse } from "next/server";
import { toggleFavoriteAction } from "@/utils/actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, favoriteId } = body;
    const pathname = new URL(request.url).pathname;

    // toggleFavoriteAction server-side kalmaya devam eder
    const result = await toggleFavoriteAction({ productId });

    // result'in yapısına göre geri dön
    return NextResponse.json(result);
  } catch (err) {
    console.error("toggle favorite api error", err);
    return NextResponse.json({ message: "Could not toggle favorite" }, { status: 500 });
  }
}