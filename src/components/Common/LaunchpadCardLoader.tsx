import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const LaunchpadCardLoader: FC = () => {
  return (
    <div className={`relative w-[294px] xl:w-[385px] text-left`}>
      <Skeleton
        className="!h-[234px] xl:!h-[235px]"
        baseColor="#333"
        highlightColor="#444"
      />
      <div className="h-3" />
      <Skeleton
        width={190}
        height={37}
        baseColor="#333"
        highlightColor="#444"
      />
      <Skeleton
        width={243}
        height={24}
        baseColor="#333"
        highlightColor="#444"
      />
    </div>
  );
};
export default LaunchpadCardLoader;
