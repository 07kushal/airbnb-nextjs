"use client";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { SafeUser } from "@/app/types";
import useFavorite from "@/app/hooks/useFavorite";

interface HeartButtonProps {
  listingId?: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  currentUser,
  listingId = "",
}) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    currentUser,
    listingId,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
