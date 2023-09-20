import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const CollecionCardLoader: FC = () => {
  return (
    <div className={`bg-[#383838] rounded-xl relative`}>
      <Skeleton
        className="!h-[124px] xl:!h-[234px] !-translate-y-2 !rounded-t-xl !rounded-b-none"
        baseColor="#141414"
        highlightColor="#222"
      />
      <div className="px-4 xl:px-[30px] pt-[14px] pb-[18px]">
        <div className="py-0 xl:py-2">
          <div className="flex gap-4 xl:gap-8">
            <Skeleton
              className="relative !w-[68px] xl:!w-[114px] !h-[68px] xl:!h-[114px] !rounded-lg overflow-hidden"
              baseColor="#444"
              highlightColor="#555"
            />
            <div className="w-[calc(100%-84px)] xl:w-[calc(100%-150px)]">
              <Skeleton
                className="relative !w-[100px] xl:!w-[120px] !h-[20px] xl:!h-[25px]"
                baseColor="#444"
                highlightColor="#555"
              />
              <div className="hidden xl:block">
                <Skeleton
                  className="relative !w-[180px] !h-[13px] mt-2.5 hidden xl:block"
                  baseColor="#444"
                  highlightColor="#555"
                />
                <Skeleton
                  className="relative !w-[140px] !h-[13px] mt-0.5 hidden xl:block"
                  baseColor="#444"
                  highlightColor="#555"
                />
              </div>
              <div className="flex justify-between mt-4">
                <div className="w-1/2">
                  <Skeleton
                    className="relative !w-[34px] !h-[13px]"
                    baseColor="#444"
                    highlightColor="#555"
                  />
                  <Skeleton
                    className="relative !w-[45px] !h-[13px]"
                    baseColor="#444"
                    highlightColor="#555"
                  />
                </div>
                <div className="w-1/2">
                  <Skeleton
                    className="relative !w-[34px] !h-[13px]"
                    baseColor="#444"
                    highlightColor="#555"
                  />
                  <Skeleton
                    className="relative !w-[45px] !h-[13px]"
                    baseColor="#444"
                    highlightColor="#555"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollecionCardLoader;
