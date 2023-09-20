import Image from "next/image";
import { FC } from "react";
import Typography from "./Typography";
import IconButton from "./IconButton";
import { AddIcon, FavoriteIcon } from "./SvgIcons";
import Link from "next/link";
import { NftItem } from "@/utils/types";

interface ItemProps {
  nft: NftItem;
  width: number;
}

const NftCard: FC<ItemProps> = ({ nft, width }) => {
  const { image, name, price, ownerBy, rarity, contract, nftId } = nft;
  const favorited = false;

  const handleFavorite = () => {
    console.log("favorite");
  };
  const handleBuy = () => {
    console.log("Buy now");
  };
  return (
    <Link href={`/asset/${contract}/${nftId}`}>
      <div
        className="rounded-xl shadow-card group"
        style={{
          width: width,
        }}
      >
        <div
          className="relative overflow-hidden rounded-t-xl"
          style={{ width: width, height: width }}
        >
          <Image src={image} alt={name} fill objectFit="cover" priority />
          <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
            <Typography className="font-[500] text-[12px]">
              #{rarity}
            </Typography>
          </div>
        </div>
        <div className="px-[18px] pt-3 pb-[18px] bg-dark-200 rounded-b-xl group-hover:rounded-b-none">
          <div className="flex items-center justify-between">
            <Typography className="font-bold text-[15px]">{name}</Typography>
            {!favorited && (
              <IconButton onClick={handleFavorite}>
                <FavoriteIcon />
              </IconButton>
            )}
          </div>
          <div className="flex justify-between">
            <div className="w-1/2">
              <Typography className="text-[10px] lg:text-[12px] text-light-200 font-[400] mb-[5px]">
                Price:
              </Typography>
              <Typography className="text-[13px] lg:text-[15px] font-bold font-readex">
                {price} ETH
              </Typography>
            </div>{" "}
            <div className="w-1/2">
              <Typography className="text-[10px] lg:text-[12px] text-light-200 font-[400] mb-[5px]">
                Owned by
              </Typography>
              <Typography className="text-[12px] leading-[18px] text-[#666666] font-readex">
                {ownerBy}
              </Typography>
            </div>
          </div>
        </div>

        <div className="h-0 group-hover:h-[50px] flex gap-[1px] group-hover:-mt-2 overflow-hidden duration-300  bg-dark-200 rounded-b-xl">
          <button
            className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-bl-xl font-bold text-white w-[calc(100%-61px)] duration-300"
            onClick={handleBuy}
          >
            Buy Now
          </button>
          <button
            className="text-[12px] lg:text-[16px] h-[50px] bg-[#EA4492] hover:bg-[#c84683] rounded-br-xl w-[60px] grid place-content-center duration-300"
            onClick={handleBuy}
          >
            <AddIcon />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default NftCard;
