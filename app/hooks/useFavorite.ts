import axios from "axios";
import { useRouter } from "next/navigation";

import { useCallback, useMemo } from "react";

import toast from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseFavorite {
  listingId: string | "";
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const hasFavorite = useMemo(() => {
    const lists = currentUser?.favoriteIds || [];
    return lists?.includes(listingId);
  }, [listingId, currentUser]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;
        let successMsg;
        if (hasFavorite) {
          request = () => axios.delete(`/api/favorites/${listingId}`);
          successMsg = "Successfully deleted!";
        } else {
          request = () => axios.post(`/api/favorites/${listingId}`);
          successMsg = "Successfully added to favorites!";
        }

        await request();
        router.refresh();
        toast.success(successMsg);
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [currentUser, loginModal, hasFavorite, router, listingId],
  );

  return { hasFavorite, toggleFavorite };
};

export default useFavorite;

// hasFavorite
