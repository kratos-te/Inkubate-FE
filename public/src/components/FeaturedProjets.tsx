"use client";
import { FC, useEffect, useState } from "react";
import Typography from "./Typography";
import Button from "./Button";
import Link from "next/link";
import { DEMO_COLLECTIONS } from "@/config";
import CollectionCard from "./CollectionCard";
import CollecionCardLoader from "./Common/CollecionCardLoader";

const FeaturedProjects: FC = () => {
  const collections = Array(8).fill(DEMO_COLLECTIONS[0]);

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

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
          <Link href={"/stats"}>
            <Button>View All</Button>
          </Link>
        </div>
        <div className="flex xl:grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 xl:gap-x-[30px] gap-y-10 mt-8 xl:mt-9 overflow-x-auto pb-8 xl:pb-0 px-6">
          {!loading
            ? collections.map((item, key) => (
                <CollectionCard collection={item} key={key} />
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
