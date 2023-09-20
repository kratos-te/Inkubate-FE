import Skeleton from "react-loading-skeleton";

const ProfileOverviewLoader = () => {
  return (
    <div className="max-w-[1600px] mx-6 relative 2xl:mx-auto z-10">
      <div className="pt-8 xl:pt-12 mb-[30px] md:mb-[60px] lg:mb-[100px] flex gap-[22px] lg:gap-10 xl:gap-[68px] flex-col lg:flex-row">
        <div className="p-[1px] xl:p-[3px] rounded-lg xl:rounded-[20px] inline-flex h-[188px] w-[188px] xl:h-[292px] xl:w-[292px] -mt-[156px] lg:-mt-[72px] xl:-mt-[110px] z-10">
          <Skeleton
            className="!w-[186px] xl:!w-[286px] !h-[186px] xl:!h-[286px] !rounded-lg xl:!rounded-[19px]"
            baseColor="#3F3F3F"
            highlightColor="#535353"
          />
        </div>
        <div className="w-full lg:w-[calc(100%-158px)] xl:w-[calc(100%-360px)]">
          <div className="">
            <div className="flex gap-5 items-center">
              <Skeleton
                width={200}
                height={46}
                baseColor="#333"
                highlightColor="#444"
              />
              <Skeleton
                width={120}
                height={32}
                baseColor="#333"
                highlightColor="#444"
              />
            </div>
            <div className="h-4" />
            <Skeleton
              width={400}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <div className="h-1" />
            <Skeleton
              width={300}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>

          <div className="flex gap-4 mt-5 xl:gap-6">
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverviewLoader;
