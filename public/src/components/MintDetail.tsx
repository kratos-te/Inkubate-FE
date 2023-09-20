import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { CollectionItem } from "@/utils/types";
import Typography from "./Typography";
import {
  DiscordIcon,
  FacebookIcon,
  GalleryIcon,
  RedditIcon,
  StarIcon,
  TwitterIcon,
} from "./SvgIcons";
import useWindowSize from "@/utils/useWindowSize";
import MintProgress from "./MintProgress";

interface OverviewProps {
  collection: CollectionItem;
  className?: string;
}

const MintDetail: FC<OverviewProps> = () => {
  const { width } = useWindowSize();
  const description =
    "The Cyber Droid NFTs are unique, algorithmically generated androids on the Ethereum blockchain. They can function as digital art, metaverse avatars, or blockchain game characters. Ownership may also unlock exclusive perks ithin the community.";
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
          src={"/assets/images/nft-demo.png"}
          className="relative z-0"
          alt=""
          fill
          objectFit="cover"
        />
      </div>
      <div className="mt-7 lg:mt-[60px] xl:mt-[106px] w-full lg:w-[calc(100%-440px)] xl:w-[calc(100%-544px)]">
        <div className="">
          <Typography
            component="h1"
            className="font-poppins text-[36px] lg:font-readex leading-[44px] lg:text-[28px] lg:leading-[35px] font-bold"
          >
            {"CYBER DROID"}
          </Typography>
          <div className="flex gap-6">
            <Typography
              component="p"
              className="text-[16px] lg:text-[14px] !font-[400] lg:font-medium mt-2"
            >
              Price<span className="ml-2 text-secondary">Free</span>
            </Typography>
            <Typography
              component="p"
              className="text-[16px] lg:text-[14px] !font-[400] lg:font-medium mt-2"
            >
              Supply: <span className="ml-2 text-secondary">10,000</span>
            </Typography>
          </div>
          <Typography className="text-[12px] mt-2 md:mt-6 flex items-center text-white">
            {description}
          </Typography>
          <div className="flex gap-4 mt-5 xl:gap-6">
            <Link href={"#"} className="w-6 h-6">
              <TwitterIcon className="w-[14px] h-[14px] md:w-5 md:h-5" />
            </Link>
            <Link href={"#"} className="w-6 h-6">
              <DiscordIcon className="w-[14px] h-[14px] md:w-5 md:h-5" />
            </Link>
            <Link href={"#"} className="w-6 h-6">
              <FacebookIcon className="w-[14px] h-[14px] md:w-5 md:h-5" />
            </Link>
            <Link href={"#"} className="w-6 h-6">
              <RedditIcon className="w-[14px] h-[14px] md:w-5 md:h-5" />
            </Link>
          </div>
          <div className="w-full sm:w-[400px]">
            <MintProgress totalSupply={10000} minted={2856} className="mt-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 mt-5 gap-[14px] sm:gap-2.5">
              <button className="py-[11px]  h-[42px] text-dark-200 flex !rounded-full items-center !font-bold bg-light-100 justify-center hover:bg-[#bbb] duration-300">
                <StarIcon className="mr-1" color="#161616" /> Mint Now
              </button>
              <button className="py-[11px] h-[42px] text-light-100 flex !rounded-full items-center !font-bold bg-dark-200 justify-center md:mt-0 hover:bg-[#222] duration-300">
                <GalleryIcon className="mr-1" color="#F2F3F4" />
                View Collection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintDetail;
