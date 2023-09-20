import Skeleton from "react-loading-skeleton";

const NftCardLoader = ({ width }: { width: number }) => {
  return (
    <div
      className="rounded-xl"
      style={{
        width: width,
      }}
    >
      <Skeleton
        className="!rounded-t-xl"
        baseColor="#141414"
        highlightColor="#181818"
        width={width}
        height={width}
      />
      <div className="px-[18px] pt-3 pb-[18px] bg-[#383838] rounded-b-xl">
        <div className="flex items-center justify-between">
          <Skeleton
            baseColor="#444"
            highlightColor="#545454"
            width={90}
            height={21}
          />
        </div>
        <div className="flex justify-between">
          <div className="w-1/2">
            <Skeleton
              baseColor="#444"
              highlightColor="#545454"
              width={37}
              height={12}
            />
            <div className="h-3" />
            <Skeleton
              baseColor="#444"
              highlightColor="#545454"
              width={90}
              height={11}
            />
          </div>{" "}
          <div className="w-1/2">
            <Skeleton
              baseColor="#444"
              highlightColor="#545454"
              width={37}
              height={12}
            />
            <div className="h-3" />
            <Skeleton
              baseColor="#444"
              highlightColor="#545454"
              width={90}
              height={11}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCardLoader;
