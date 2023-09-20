import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const Loader: FC = () => {
  return (
    <section className="max-w-[1240px] mx-6 xl:mx-auto relative z-10">
      <div className="flex items-center justify-between">
        <Skeleton
          className="!w-[102px] lg:!w-[226px] !h-[17px] lg:!h-9"
          baseColor="#313131"
          highlightColor="#393939"
        />
      </div>
      <div className="mt-[42px]">
        <div className="grid xl:grid-cols-2 gap-[100px]">
          <div className="relative grid grid-cols-1 gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingItem key={index} />
            ))}
            <div
              className="h-[72px] w-full absolute left-0 bottom-0 z-10 rotate-180 pointer-events-none home-mask-1"
              style={{
                backgroundImage:
                  "linear-gradient(#1c1c1d 0%, #041b2d0f 81.13%, #d9d9d900 100%)",
              }}
            />
          </div>
          <div className="relative hidden grid-cols-1 xl:grid gap-7">
            {Array.from({ length: 6 }).map((_, index) => (
              <LoadingItem key={index} />
            ))}
            <div
              className="h-[72px] w-full absolute left-0 bottom-0 z-10 rotate-180 pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(#1f1d1f 0%, #1f1d1f0f 81.13%, #d9d9d900 100%)",
              }}
            />
          </div>
        </div>
        <div className="text-center py-7">
          <Skeleton
            className="!w-[102px] lg:!w-[163px] !h-[34px] lg:!h-12 !rounded-xl"
            baseColor="#313131"
            highlightColor="#393939"
          />
        </div>
      </div>
    </section>
  );
};

export default Loader;

const LoadingItem: FC = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-5 max-w-[266px]">
        <div className="w-4 text-center">
          <Skeleton
            className=""
            width={12}
            height={20}
            baseColor="#141414"
            highlightColor="#222"
          />
        </div>
        <Skeleton
          className="rounded-full"
          width={50}
          circle
          height={50}
          baseColor="#313131"
          highlightColor="#393939"
        />
        <div className="flex flex-col justify-between w-[calc(100%-66px)]">
          <Skeleton
            className="!w-[112px] !h-5 !lg:h-[30px]"
            baseColor="#141414"
            highlightColor="#222"
          />
          <Skeleton
            className="!w-[68px] !h-4 lg:!h-[18px] mt-1.5"
            baseColor="#141414"
            highlightColor="#222"
          />
        </div>
      </div>
      <div className="hidden md:block">
        <Skeleton
          className="!w-[68px] !h-4 lg:!h-[18px]"
          baseColor="#141414"
          highlightColor="#222"
        />
        <Skeleton
          className="!w-[112px] !h-5 lg:!h-[30px] "
          baseColor="#141414"
          highlightColor="#222"
        />
      </div>
      <div className="">
        <Skeleton
          className="!w-[68px] !h-4 lg:!h-[18px]"
          baseColor="#141414"
          highlightColor="#222"
        />
        <Skeleton
          className="!w-[112px] !h-5 lg:!h-[30px] "
          baseColor="#141414"
          highlightColor="#222"
        />
      </div>
    </div>
  );
};
