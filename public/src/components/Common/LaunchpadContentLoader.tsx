import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import LaunchpadCardLoader from "./LaunchpadCardLoader";

const LaunchpadContentLoader: FC = () => {
  return (
    <>
      {Array.from({ length: 3 }).map((_, index) => (
        <div className="mx-6 mt-[68px]" key={index}>
          <div className="hidden lg:block">
            <Skeleton
              width={200}
              height={42}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={400}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
          <div className="flex flex-col items-center lg:hidden">
            <Skeleton
              width={143}
              height={28}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={270}
              height={20}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
          <div className="flex gap-6 mt-5">
            {Array.from({ length: 4 }).map((_, key) => (
              <LaunchpadCardLoader key={key} />
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default LaunchpadContentLoader;
