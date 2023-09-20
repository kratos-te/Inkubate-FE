import { FC } from "react";
import Skeleton from "react-loading-skeleton";

const Loader: FC = ({}) => {
  return (
    <div className="sticky top-0">
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <div className="bg-light-400 h-[0.5px] w-full mt-5" />
      <div className="py-5 mt-5">
        <Skeleton
          className="!h-5 !w-[40px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="flex gap-2">
        <Skeleton
          className="!h-11 !w-[150px]"
          baseColor="#141414"
          highlightColor="#222"
        />
        <Skeleton
          className="!h-11 !w-[150px]"
          baseColor="#141414"
          highlightColor="#222"
        />
      </div>
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <Skeleton
        className="!h-11 !w-full"
        baseColor="#3F3F3F"
        highlightColor="#535353"
      />
      <div className="bg-light-400 h-[0.5px] w-full mt-5" />
      <div className="py-5 mt-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="bg-light-400 h-[0.5px] w-full" />
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="bg-light-400 h-[0.5px] w-full" />
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="bg-light-400 h-[0.5px] w-full" />
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="bg-light-400 h-[0.5px] w-full" />
      <div className="py-5">
        <Skeleton
          className="!h-5 !w-[60px]"
          baseColor="#3F3F3F"
          highlightColor="#535353"
        />
      </div>
      <div className="bg-light-400 h-[0.5px] w-full" />
    </div>
  );
};
export default Loader;
