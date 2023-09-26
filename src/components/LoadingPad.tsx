import { FC } from "react";
import ConvertSpin from "./ConvertSpin";

interface LoadingPadProps {
  title: string;
  description: string;
}

export const LoadingPad: FC<LoadingPadProps> = ({ title, description }) => {
  return (
    <div className="flex gap-7 mt-12">
      <ConvertSpin />
      <div className="flex-col gap-2 text-left">
        <div className="text-[24px] text-white font-semibold">{title}</div>
        <div className="text-[16px] text-[#B3B3B3] font-medium">
          {description}
        </div>
      </div>
    </div>
  );
};
