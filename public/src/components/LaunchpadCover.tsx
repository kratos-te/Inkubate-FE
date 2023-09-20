import Image from "next/image";
import { FC } from "react";
import Typography from "./Typography";

const LaunchpadCover: FC = () => {
  const src = "/assets/images/launchpad/1.png";
  return (
    <div className="w-[calc(100%-64px)] 2xl:w-full relative z-10 mx-8 2xl:mx-0">
      <div className="relative h-[330px] lg:h-[400px] xl:h-[540px] 2xl:h-[724px] mx-auto rounded-xl overflow-hidden flex items-end">
        <Image
          src={src}
          className="relative z-0 rounded-xl overflow-hidden"
          alt=""
          fill
          objectFit="cover"
        />
        <div
          className="absolute top-0 left-0 w-full h-full z-[1]"
          style={{
            backgroundImage:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 100%)",
          }}
        />
        <div className="relative z-10 px-3 lg:px-5 xl:px-10 2xl:px-[46px] pb-3 lg:pb-5 xl:pb-10 2xl:pb-[56px]">
          <Typography className="!text-white text-[12px] lg:text-[14px] 2xl:text-[18px] font-semibold xl:text-left">
            Top Launches
          </Typography>
          <Typography
            className="!text-white font-semibold mt-0  lg:mt-2 lg:font-poppins text-[18px] lg:text-[20px] xl:text-[48px] 2xl:text-[60px] lg:tracking-[-1.2px] leading-[28px] lg:leading-[1.2]"
            component="h2"
          >
            Fluffy Hugs
          </Typography>

          <Typography className="!text-white text-[12px] lg:text-[14px] 2xl:text-[24px] font-poppins font-[400] max-w-[760px] leading-[1.2] mt-0 lg:mt-[14px]">
            Porem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            vulputate libero et velit interdum, ac aliquet odio mattis.
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadCover;
