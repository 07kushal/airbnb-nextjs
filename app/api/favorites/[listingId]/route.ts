import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParms {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParms }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const userUserFavoriteIds = currentUser?.favoriteIds || [];

  let favoriteIds = [...userUserFavoriteIds];

  console.log("favoriteIds", favoriteIds, userUserFavoriteIds);

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds },
  });

  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { params: IParms }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid ID");
  }

  const userUserFavoriteIds = currentUser?.favoriteIds || [];

  let favoriteIds = [...userUserFavoriteIds];

  const updatedFavoriteIds = favoriteIds.filter(
    (favoriteId) => favoriteId !== listingId,
  );

  const user = await prisma.user.update({
    where: { id: currentUser.id },
    data: { favoriteIds: updatedFavoriteIds },
  });

  return NextResponse.json(user);
}
