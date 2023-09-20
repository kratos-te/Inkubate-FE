import { FC } from "react";
import useWindowSize from "@/utils/useWindowSize";
import Skeleton from "react-loading-skeleton";

const MintOverviewLoader: FC = () => {
  const { width } = useWindowSize();
  return (
    <div className="flex flex-col lg:flex-row">
      <div
        className="w-full sm:!w-[400px] xl:!w-[504px] h-full sm:!h-[400px] xl:!h-[504px] relative overflow-hidden rounded-xl mr-0 lg:mr-8 xl:mr-10"
        style={{
          width: width - 60,
          height: width - 60,
        }}
      >
        <Skeleton
          width="100%"
          height="100%"
          className="!rounded-xl"
          baseColor="#2E2E2E"
          highlightColor="#333"
        />
      </div>
      <div className="mt-7 lg:mt-[60px] xl:mt-[106px] w-full lg:w-[calc(100%-440px)] xl:w-[calc(100%-544px)]">
        <div className="flex justify-between">
          <div className="flex items-center bg-dark-200 rounded-full p-[3px] pr-2 lg:min-w-[200px] gap-4">
            <Skeleton
              width={240}
              height={40}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
        </div>
        <div className="mt-5">
          <Skeleton
            width={170}
            height={27}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="h-2" />
          <Skeleton
            width={120}
            height={18}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="h-3" />
          <Skeleton
            width={60}
            height={18}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="h-3" />
          <Skeleton
            width={120}
            height={24}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="h-2" />
          <Skeleton
            width={180}
            height={18}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="flex flex-col mt-5 md:flex-row gap-5">
            <Skeleton
              width={180}
              height={48}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={180}
              height={48}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MintOverviewLoader;
