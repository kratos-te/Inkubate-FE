import Image from "next/image";
import { FC } from "react";
import Typography from "./Typography";
interface CoverProps {}

const ExploreCover: FC<CoverProps> = ({}) => {
  return (
    <div className="px-4 h-[307px] lg:h-[392px] xl:h-[454px] w-full relative flex justify-center flex-col lg:px-[40px] xl:px-[72px] mb-[64px] xl:mb-[145px] z-10">
      <Image
        src={"/assets/images/explore-cover.png"}
        className="absolute z-0 overflow-hidden rounded-xl"
        alt=""
        fill
        objectFit="cover"
      />
      <Typography
        component="h1"
        className="text-[20px] lg:text-[60px] font-poppins -tracking-[1.2px] leading-[1.2] font-semibold relative"
      >
        Discover Creative
        <br />
        Treasures
      </Typography>
      <Typography
        component="p"
        className="text-[12px] lg:text-[18px] leading-[18px] lg:leading-[28px] font-semibold mt-2.5 max-w-[660px]  relative"
      >
        Sorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdum, ac aliquet odio mattis.
      </Typography>
    </div>
  );
};

export default ExploreCover;
