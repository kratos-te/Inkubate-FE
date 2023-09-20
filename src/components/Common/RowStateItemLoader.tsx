"use client";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import useWindowSize from "@/utils/useWindowSize";

const RowStatsItemLoader = () => {
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
    <tr className="h-20 group">
      <td
        className="relative"
        style={{
          width: cellInterval,
        }}
      ></td>
      <td className="relative w-8 font-readex text-[15px] font-medium text-light-100 text-center border-t-[0.5px] border-light-400 ">
        <div className="relative z-10">
          <Skeleton
            width={24}
            height={24}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </td>
      <td className="relative border-t-[0.5px] border-light-400 ">
        <div className="flex items-center relative z-10 gap-2">
          <Skeleton
            width={40}
            height={40}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={100}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </td>
      <td className="relative text-right text-[14px] font-bold leading-[20px] sm:text-center text-light-100 h-20 border-t-[0.5px] border-light-400 ">
        <div className="relative z-10 before:absolute">
          <Skeleton
            width={100}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </td>
      <td className="hidden xld:table-cell relative text-[14px] text-center font-bold leading-[20px] border-t-[0.5px] border-light-400">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden xld:table-cell relative text-[14px] text-center font-bold leading-[20px] border-t-[0.5px] border-light-400">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden sm:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden md:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden md:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden lg:table-cell relative text-[14px] text-center font-bold leading-[20px] text-light-100 border-t-[0.5px] border-light-400 ">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>
      <td className="hidden lg:table-cell relative text-[14px] font-bold leading-[20px] text-light-100 h-20 text-right border-t-[0.5px] border-light-400 ">
        <Skeleton
          width={100}
          height={20}
          baseColor="#333"
          highlightColor="#444"
        />
      </td>

      <td
        className="relative"
        style={{
          width: cellInterval,
        }}
      ></td>
    </tr>
  );
};

export default RowStatsItemLoader;
