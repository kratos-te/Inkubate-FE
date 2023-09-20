import Skeleton from "react-loading-skeleton";

const ActivityMobileCardLoader = () => {
  return (
    <div className="rounded-xl shadow-card bg-dark-200 py-[18px] px-7">
      <div className="flex gap-7 items-center">
        <Skeleton
          width={66}
          height={66}
          baseColor="#333"
          highlightColor="#444"
        />
        <div className="w-[calc(100%-94px)]">
          <div className="flex items-center justify-between">
            <Skeleton
              width={80}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>

          <Skeleton
            width={30}
            height={24}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={70}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </div>
      <div className="flex justify-between mt-[14px]">
        <div className="">
          <Skeleton
            width={30}
            height={12}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={60}
            height={16}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
        <div className="">
          <Skeleton
            width={30}
            height={12}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={60}
            height={16}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
        <div className="">
          <Skeleton
            width={30}
            height={12}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={60}
            height={16}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityMobileCardLoader;
