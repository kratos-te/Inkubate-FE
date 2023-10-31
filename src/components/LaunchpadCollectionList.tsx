import { LaunchpadParam } from "@/utils/types";
import Typography from "./Typography";
import LaunchpadCard from "./LaunchpadCard";

interface ListProps {
  title: string;
  description: string;
  launchpads: LaunchpadParam[];
}

const LaunchpadCollectionList = ({
  title,
  description,
  launchpads,
}: ListProps) => {
  return (
    <div className="mx-auto px-0 lg:px-6 2xl:px-0 text-center lg:text-left relative z-10">
      <Typography
        component="h2"
        className="font-poppins font-semibold text-[24px] 2xl:text-[36px] -tracking-[0.72px] leading-[1.33]"
      >
        {title}
      </Typography>
      <Typography
        component="p"
        className="xl:mt-[14px] font-400 text-14px lg:text-[20px] 2xl:text-[24px] leading-[1.33] font-poppins"
      >
        {description}
      </Typography>
      <div className="flex gap-[30px] overflow-auto w-full mt-7 xl:mt-9 custom-scroll pb-5 px-6 lg:px-0">
        {launchpads.map((launchpad, key) => (
          <LaunchpadCard className="" launchpad={launchpad} key={key} />
        ))}
      </div>
    </div>
  );
};

export default LaunchpadCollectionList;
