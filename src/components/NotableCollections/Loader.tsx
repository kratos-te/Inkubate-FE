import Skeleton from "react-loading-skeleton";
import CollecionCardLoader from "../Common/CollecionCardLoader";

const Loader = () => {
  return (
    <section
      className="container max-w-full mx-0 xl:mx-auto py-20 xl:py-[90px] relative"
      id="notable-collections"
    >
      <div className="relative z-10 px-6 text-center">
        <Skeleton
          className="!w-[300px] lg:!w-[400px] xld:!w-[602px] !h-7 lg:!h-11 xl:!h-[58px]"
          baseColor="#141414"
          highlightColor="#222"
        />
        <Skeleton
          className="!w-[240px] xl:!w-[480px] !h-[21px] xl:!h-[25px] mt-1.5 xl:mt-5"
          baseColor="#141414"
          highlightColor="#222"
        />
      </div>
      <div className="relative z-10 grid place-content-center ">
        <div className="mt-4 xl:mt-[70px] flex gap-10  overflow-x-auto px-6 max-w-[1304px] mx-auto w-full">
          <CollecionCardLoader />
          <CollecionCardLoader />
          <CollecionCardLoader />
        </div>
      </div>
    </section>
  );
};

export default Loader;
