import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { NftItem } from "@/utils/types";
import Typography from "../Typography";
import {
  AddCartIcon,
  ClockIcon,
  ExplorerIcon,
  FavoriteSmIcon,
  MoreSmIcon,
  OfferIcon,
  RefreshIcon,
  ShareIcon,
  VerifiedIcon,
  WalletIcon,
} from "../SvgIcons";
import useWindowSize from "@/utils/useWindowSize";
import { useModal } from "@/contexts/ModalContext";

interface OverviewProps {
  nft: NftItem;
  className?: string;
}

const AssetOverview: FC<OverviewProps> = ({ nft }) => {
  const { openOfferModal, openBuyModal } = useModal();

  const { image, name, ownerBy, rarity, price } = nft;
  const { width } = useWindowSize();
  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="w-full sm:!w-[400px] xl:!w-[504px] h-full sm:!h-[400px] xl:!h-[504px] relative overflow-hidden rounded-xl mr-0 lg:mr-8 xl:mr-10"
        style={{
          width: width - 60,
          height: width - 60,
        }}
      >
        <Image
          src={image}
          className="relative z-0"
          alt=""
          fill
          objectFit="cover"
        />
        <div className="absolute bottom-2 bg-[#00000040] rounded-md py-1 px-2 right-2">
          <Typography className="font-semibold text-[15px] !text-white">
            #{rarity}
          </Typography>
        </div>
      </div>
      <div className="mt-7 lg:mt-[60px] xl:mt-[106px] w-full lg:w-[calc(100%-440px)] xl:w-[calc(100%-544px)]">
        <div className="flex justify-between">
          <div className="flex items-center bg-dark-200 rounded-full p-[3px] pr-2 lg:min-w-[200px]">
            <div className="w-[33px] h-[33px] border-[1.5px] border-light-100 rounded-full relative">
              <Image
                src="/assets/images/pfp-demo.gif"
                fill
                objectFit="cover"
                className="rounded-full"
                alt=""
              />
            </div>
            <Typography className="text-[12px] leading-[15px] font-bold lg:text-[16px] lg:leading-[1.5] mx-2">
              {"OG Dread Zero"}
            </Typography>
            <VerifiedIcon color="#EA4492" />
          </div>
          <div className="rounded-full bg-[#666] flex gap-5 py-[11.5px] px-[15px]">
            <Link href={"#"}>
              <AddCartIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <ExplorerIcon className="fill-hover" />
            </Link>
            <Link href={"#"}>
              <FavoriteSmIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <RefreshIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="hidden lg:block">
              <ShareIcon className="fill-hover" />
            </Link>
            <Link href={"#"} className="block lg:hidden">
              <MoreSmIcon className="fill-hover" />
            </Link>
          </div>
        </div>
        <div className="mt-5">
          <Typography
            component="h1"
            className="lg:font-readex font-poppins text-[36px] leading-[44px] lg:text-[28px] lg:leading-[35px] font-bold"
          >
            {name}
          </Typography>
          <Typography
            component="p"
            className="text-[16px] lg:text-[14px] !font-[400] lg:font-medium mt-2"
          >
            Owned by<span className="ml-2 text-secondary">{ownerBy}</span>
          </Typography>
          <Typography className="text-[14px] font-medium mt-5">
            Price
          </Typography>
          <Typography className="text-[30px] lg:text-[28px] leading-[35px] font-bold mt-[5px]">
            {price} ETH
          </Typography>
          <Typography className="text-[15px] mt-2.5 flex items-center text-light-200">
            <ClockIcon className="mr-[5px]" />
            <span className="text-light-200">
              Sale ened Sep 19. 2023. 8:48 AM
            </span>
          </Typography>
          <div className="flex flex-col mt-5 md:flex-row">
            <button
              className="px-10 py-[11px] text-dark-200 flex !rounded-full items-center !font-bold bg-light-100 md:mr-2.5 justify-center hover:bg-[#bbb] duration-300"
              onClick={openBuyModal}
            >
              <WalletIcon className="mr-2 mt-[1px]" color="#161616" /> Buy Now
            </button>
            <button
              className="px-10 py-[11px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center mt-[14px] md:mt-0 hover:bg-[#222] duration-300"
              onClick={openOfferModal}
            >
              <OfferIcon className="mr-2 mt-[1px]" color="#F2F3F4" />
              Make Offer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
