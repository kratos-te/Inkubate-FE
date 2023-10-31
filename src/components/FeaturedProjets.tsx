"use client";

import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import Button from "./Button";
import CollectionCard from "./CollectionCard";
import CollecionCardLoader from "./Common/CollecionCardLoader";
import Typography from "./Typography";
import { getFeature } from "@/actions/stat";
import { StatTypes } from "@/utils/types";

const FeaturedProjects: FC = () => {
  const pathname = usePathname();
  const [collections, setCollections] = useState<StatTypes[]>([]);
  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const getFeatureCollection = async () => {
      const getData = await getFeature();
      setCollections(getData?.data || []);
    };
    getFeatureCollection();
  }, [pathname]);

  return (
    <section className="mt-[72px] xl:mt-[180px] relative">
      <div className="max-w-[1600px] xl:mx-[30px] 2xl:mx-auto relative z-10">
        <div className="flex justify-between px-[30px]">
          <Typography
            component="h2"
            className="font-semibold leading-[1.2] text-[14px] xl:text-[30px]"
          >
            Featured Projects
          </Typography>
          <Link href={"/launchpad"}>
            <Button>View All</Button>
          </Link>
        </div>
        <div className="flex xl:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 xl:gap-x-[30px] gap-y-10 mt-8 xl:mt-9 overflow-x-auto pb-8 xl:pb-0 px-6">
          {!loading
            ? collections.map((item, key) => (
                <CollectionCard
                  item={item}
                  collection={item.collection}
                  key={key}
                />
              ))
            : Array.from({ length: 8 }).map((_, key) => (
                <CollecionCardLoader key={key} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
