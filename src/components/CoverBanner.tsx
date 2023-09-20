import Image from "next/image";
import { FC } from "react";
interface CoverProps {
  src: string;
}

const CoverBanner: FC<CoverProps> = ({ src }) => {
  return (
    <div className="h-[392px] xl:h-[556px] w-full relative z-10">
      <Image
        src={src}
        className="relative z-0"
        alt=""
        fill
        objectFit="cover"
        loading="lazy"
      />
      <div
        className="absolute top-0 left-0 w-full h-full z-[1]"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.00) 0%, #000 100%)",
          mixBlendMode: "hard-light",
        }}
      />
    </div>
  );
};

export default CoverBanner;
