import Skeleton from "react-loading-skeleton";

const Loader = () => {
  return (
    <div className="max-w-[1600px] mx-6 relative 2xl:mx-auto z-10">
      <div className="pt-8 xl:pt-12 mb-[60px] lg:mb-[100px] flex gap-[22px] lg:gap-10 xl:gap-[68px] flex-col lg:flex-row">
        <div className="-mt-[156px] lg:-mt-[72px] xl:-mt-[110px]">
          <Skeleton
            className="!w-[186px] xl:!w-[286px] !h-[186px] xl:!h-[286px] !rounded-lg xl:!rounded-[19px]"
            baseColor="#3F3F3F"
            highlightColor="#535353"
          />
        </div>
        <div className="">
          <Skeleton
            className="!h-[30px] !w-[278px]"
            baseColor="#3F3F3F"
            highlightColor="#535353"
          />
          <div className="flex gap-4 mt-5 xl:gap-6 lg:hidden">
            <Skeleton
              className="!h-7 !w-7"
              baseColor="#3F3F3F"
              highlightColor="#535353"
            />
            <Skeleton
              className="!h-7 !w-7"
              baseColor="#3F3F3F"
              highlightColor="#535353"
            />
            <Skeleton
              className="!h-7 !w-7"
              baseColor="#3F3F3F"
              highlightColor="#535353"
            />
            <Skeleton
              className="!h-7 !w-7"
              baseColor="#3F3F3F"
              highlightColor="#535353"
            />
          </div>
          <div className="mt-[18px]">
            <Skeleton
              className="!h-10 !-full xl:!w-[700px]"
              baseColor="#3F3F3F"
              highlightColor="#535353"
            />
          </div>
          <div className="grid grid-cols-3 lg:flex gap-5 lg:gap-9 mt-[20px]">
            <div className="flex flex-col-reverse lg:flex-col">
              <Skeleton
                className="!h-5 !w-12"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <div className="mt-1">
                <Skeleton
                  className="!h-7 !w-[60px]"
                  baseColor="#3F3F3F"
                  highlightColor="#535353"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <Skeleton
                className="!h-5 !w-12"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <div className="mt-1">
                <Skeleton
                  className="!h-7 !w-[60px]"
                  baseColor="#3F3F3F"
                  highlightColor="#535353"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-col">
              <Skeleton
                className="!h-5 !w-12"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <div className="mt-1">
                <Skeleton
                  className="!h-7 !w-[60px]"
                  baseColor="#3F3F3F"
                  highlightColor="#535353"
                />
              </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-col">
              <Skeleton
                className="!h-5 !w-12"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <div className="mt-1">
                <Skeleton
                  className="!h-7 !w-[60px]"
                  baseColor="#3F3F3F"
                  highlightColor="#535353"
                />
              </div>
            </div>
            <div className="flex flex-col-reverse lg:flex-col">
              <Skeleton
                className="!h-5 !w-12"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <div className="mt-1">
                <Skeleton
                  className="!h-7 !w-[80px]"
                  baseColor="#3F3F3F"
                  highlightColor="#535353"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 z-[2] hidden lg:block">
            <div className="flex gap-4 xl:gap-6">
              <Skeleton
                className="!h-7 !w-8"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <Skeleton
                className="!h-7 !w-8"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <Skeleton
                className="!h-7 !w-8"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
              <Skeleton
                className="!h-7 !w-8"
                baseColor="#3F3F3F"
                highlightColor="#535353"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
