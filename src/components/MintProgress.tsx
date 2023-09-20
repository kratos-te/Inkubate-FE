import { FC } from "react";
import Typography from "./Typography";
interface ProgressProps {
  minted: number;
  totalSupply: number;
  className?: string;
}

const MintProgress: FC<ProgressProps> = ({
  minted,
  totalSupply,
  className,
}) => {
  return (
    <div className={`${className ? className : ""}`}>
      <div className="flex items-center justify-between w-full">
        <Typography className="font-bold !text-white">Total Minted</Typography>
        <Typography className="font-bold !text-white">{`${minted}/${totalSupply} (${(
          (minted / totalSupply) *
          100
        ).toLocaleString()}%)`}</Typography>
      </div>
      <div className="h-3 rounded-full relative mt-2 bg-white w-full overflow-hidden">
        <div
          className="bg-secondary absolute left-0 top-0 rounded-r-full h-full"
          style={{
            width: `${(minted / totalSupply) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default MintProgress;
