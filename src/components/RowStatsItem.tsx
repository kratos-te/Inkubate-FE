"use client";
import { FC, useMemo } from "react";
import { CollectionParam } from "@/utils/types";
import Typography from "./Typography";
import Image from "next/image";
import { VerifiedIcon } from "./SvgIcons";
import { useRouter } from "next/navigation";
import useWindowSize from "@/utils/useWindowSize";
import { weiToNum } from "@/utils/util";

interface ItemProps {
  collection: CollectionParam;
  key: number;
}

const RowStatsItem: FC<ItemProps> = ({ collection, key }) => {
  console.log(">>>>>>>>>>>>>>>>>>>", collection);
  const router = useRouter();

  // set width of emplty corner cells
  const { width } = useWindowSize();
  const cellInterval = useMemo(() => {
    let val = 0;
    if (width > 1628) {
      val = width - 1628;
    }
    return val / 2;
  }, [width]);

  return (
    <tr
      className="cursor-pointer h-20 group"
      onClick={() => router.push(`/collection/${collection.id}`)}
    >
      <td
        className="relative"
        style={{
          width: cellInterval,
        }}
      >
        <div
          className="td-cell-bg group-hover:opacity-100"
          style={{ height: "calc(100% + 1px)" }}
        />
      </td>
      <td className="relative w-8 font-readex text-[15px] font-medium text-light-100 text-center border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">{key}</div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="relative border-t-[0.5px] border-light-400 ">
        <div className="flex items-center relative z-10">
          <div className="w-10 h-10 sm:w-[50px] sm:h-[50px] relative">
            <Image
              src={collection.avatar?.url || "/assets/images/pfp-demo.gif"}
              fill
              className="rounded-[10px] mr-[11px]"
              alt=""
            />
          </div>
          <Typography className="flex items-center gap-2 font-bold ml-2 text-[14px] md:text-[16px]">
            {collection.name}
            {collection.verified && <VerifiedIcon color="#EA4492" />}
          </Typography>
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="relative text-right text-[14px] font-bold leading-[20px] sm:text-center text-light-100 h-20 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10 before:absolute">
          {weiToNum(collection.stats[0]?.volume || "0")} ETH
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td
        className={`hidden xld:table-cell relative text-[14px] text-center font-bold leading-[20px] border-t-[0.5px] border-light-400  ${
          collection.stats[0]?.increased || 0 <= 0
            ? "text-[#F00]"
            : "text-[#00FF29]"
        }`}
      >
        <div className="relative z-10">
          {collection.stats[0]?.increased || 0} %
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="hidden sm:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">
          {weiToNum(collection.stats[0]?.floorPrice || "0")} ETH
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="hidden md:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">
          {collection.stats[0]?.salesItems || 0}
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="hidden md:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">{collection.supply}</div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="hidden lg:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">
          {collection.stats[0]?.listedItems || 0}
        </div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>
      <td className="hidden lg:table-cell relative text-[14px] font-bold leading-[20px] text-light-100 h-20 text-right border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">{collection.stats[0]?.owners || 0}</div>
        <div className="td-cell-bg group-hover:opacity-100" />
      </td>

      <td
        className="relative"
        style={{
          width: cellInterval,
        }}
      >
        <div
          className="td-cell-bg group-hover:opacity-100"
          style={{ height: "calc(100% + 1px)" }}
        />
      </td>
    </tr>
  );
};

export default RowStatsItem;
