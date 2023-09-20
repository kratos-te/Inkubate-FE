import { FC } from "react";
import { SquareArrowIcon } from "./SvgIcons";

const Pagination: FC = () => {
  return (
    <div className="flex items-center justify-center gap-10">
      <button className="rotate-180 opacity-60">
        <SquareArrowIcon />
      </button>
      <button className="text-[15px] w-[18px] h-[18px] grid place-content-center text-light-100 opacity-100">
        1
      </button>
      <button className="text-[15px] w-[18px] h-[18px] grid place-content-center text-light-100 opacity-60">
        2
      </button>
      <button className="text-[15px] w-[18px] h-[18px] grid place-content-center text-light-100 opacity-60">
        3
      </button>
      <button className="opacity-100">
        <SquareArrowIcon />
      </button>
    </div>
  );
};

export default Pagination;
