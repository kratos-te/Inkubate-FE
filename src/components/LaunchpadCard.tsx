import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { CollectionParam } from "@/utils/types";
import Typography from "./Typography";

interface ItemProps {
  collection: CollectionParam;
  className?: string;
}

const LaunchpadCard: FC<ItemProps> = ({ collection, className }) => {
  const { id, name, avatar } = collection;
  return (
    <Link href={`/mint/${id}`} className="">
      <div
        className={`relative w-[294px] xl:w-[385px] text-left  ${
          className ? className : ""
        }`}
      >
        <div className="relative w-full overflow-hidden h-[234px] xl:h-[235px] rounded-xl">
          <Image
            src={avatar?.url}
            alt={avatar?.id}
            fill
            objectFit="cover"
            priority
          />
        </div>
        <Typography
          component="h3"
          className="text-[24px] font-semibold font-poppins leading-[1.333] mt-6"
        >
          {name}
        </Typography>
        <Typography
          component="p"
          className="!text-[#666] font-400 text-[18px] leading-[28px] mt-1 w-[calc(100%-40px)] overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {/* {description} */}
        </Typography>
      </div>
    </Link>
  );
};

export default LaunchpadCard;
