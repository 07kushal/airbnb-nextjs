import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return [];
    }
    const currentUserFavoritesIds = currentUser?.favoriteIds || [];
    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...currentUserFavoritesIds],
        },
      },
    });
    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toString(),
    }));

    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
