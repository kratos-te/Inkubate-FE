import { FC } from "react";
import Skeleton from "react-loading-skeleton";
import NftCardLoader from "./NftCardLoader";

const AssetContentLoader: FC = () => {
  return (
    <>
      <div className="flex flex-col mt-5 md:flex-row">
        <div className="w-full md:w-[calc(50%-20px)] xl:w-[504px] flex flex-col gap-3 mr-0 md:mr-5 lg:mr-8 xl:mr-10">
          <div className="flex gap-2 mt-5">
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={80}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
          <Skeleton
            width={"100%"}
            height={120}
            baseColor="#333"
            highlightColor="#444"
          />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, key) => (
              <Skeleton
                key={key}
                width={24}
                height={24}
                baseColor="#333"
                highlightColor="#444"
              />
            ))}
          </div>
          <div className="flex gap-2 mt-8">
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={80}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
        <div className="w-full md:w-1/2 xl:w-[calc(100%-544px)] flex flex-col gap-5 mt-5 md:mt-0">
          <div className="flex gap-2 mt-5">
            <Skeleton
              width={24}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
            <Skeleton
              width={80}
              height={24}
              baseColor="#333"
              highlightColor="#444"
            />
          </div>
          <Skeleton
            width={"100%"}
            height={120}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={"100%"}
            height={20}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </div>
      <div className="max-w-[1080px] mx-auto mt-[30px]">
        <div className="p-5 flex gap-2.5 items-center">
          <Skeleton
            width={24}
            height={24}
            baseColor="#333"
            highlightColor="#444"
          />
          <Skeleton
            width={120}
            height={24}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
        <div className="flex justify-center gap-[25px] min-h-[390px] flex-wrap">
          {Array.from({ length: 4 }).map((_, key) => (
            <NftCardLoader width={240} key={key} />
          ))}
        </div>
        <div className="text-center mt-[30px] lg:mt-0">
          <Skeleton
            width={180}
            height={44}
            baseColor="#333"
            highlightColor="#444"
          />
        </div>
      </div>
    </>
  );
};

export default AssetContentLoader;
