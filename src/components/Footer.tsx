import { FC } from "react";
import Typography from "./Typography";
import Link from "next/link";
import { DiscordIcon, InstagramIcon, TwitterIcon } from "./SvgIcons";

const Footer: FC = () => {
  return (
    <footer className="absolute bottom-0 left-0 z-10 w-full">
      <div className="max-w-[1600px] mx-6 2xl:mx-auto">
        <div className="border-b border-dark-400 pb-10 flex justify-between items-start xl:items-end flex-col xl:flex-row">
          <div className="">
            <Typography className="font-semibold text-[30px] leading-[1.2]">
              Inkubate
            </Typography>
            <Typography
              component="p"
              className="text-[14px] xl:text-[18px] !font-[400] leading-7 mt-[15px]"
            >
              Discover, collect, and sell digital items on the largest NFT
              marketplace on Ethereum
            </Typography>
          </div>
          <div className="flex flex-col items-start mt-10 xl:items-end xl:mt-0">
            <Typography className="font-bold text-[18px] leading-[1.2]">
              Join Our Community
            </Typography>
            <div className="grid grid-cols-3 gap-6 mt-6">
              <Link href={"https://x.com/InkubateNft?t=dy17jht--7ehFL8XdW00Qg&s=35"}>
                <TwitterIcon />
              </Link>
              <Link href={"#"}>
                <DiscordIcon />
              </Link>
              <Link href={"#"}>
                <InstagramIcon />
              </Link>
            </div>
          </div>
        </div>
        <div className="pt-7 pb-[76px] xl:pb-[112px]">
          <div className="flex flex-col items-start justify-between xl:items-center xl:flex-row">
            <Typography className="text-[14px]">
              © 2023 Inkubate. All rights reserved.
            </Typography>
            <ul className="flex gap-[18px] justify-between w-full max-w-[400px] mt-5 xl:mt-0 flex-wrap">
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    Help
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    Status
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    API
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    Brand
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    Terms
                  </Typography>
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <Typography className="text-[12px] xl:text-[16px] font-semibold">
                    Privacy
                  </Typography>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
