import { CollectionParam } from "@/utils/types";
import { FC } from "react";
import Typography from "./Typography";
import CollectionCard from "./CollectionCard";
interface ListProps {
  title: string;
  description: string;
  collections: CollectionParam[];
}

const LaunchpadDrops: FC<ListProps> = ({ title, description, collections }) => {
  return (
    <div className="max-w-[1630px] mx-auto text-center lg:text-left">
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
      <div className="flex pb-6 lg:pb-0 overflow-auto lg:overflow-hidden lg:grid lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 gap-x-[30px] gap-y-3 xl:gap-y-10 mt-[34px] mx-6 2xl:mx-0">
        {collections.map((item, key) => (
          <CollectionCard collection={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default LaunchpadDrops;
