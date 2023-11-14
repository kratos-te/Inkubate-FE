/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { FC, useCallback, useEffect, useState } from "react";
// import { DEMO_COLLECTIONS } from "@/config";
import Link from "next/link";
import Typography from "../Typography";
import CollectionItemLine from "../CollectionItemLine";
import Button from "../Button";
import DateTab from "../DateTab";
import Loader from "./Loader";
import { CollectionParam } from "@/utils/types";
import { getTopCollections } from "@/actions";

const TopCollections: FC = () => {
  const [period, setPeriod] = useState("HOUR");
  const [topCollections, setTopCollections] = useState<CollectionParam[]>([]);

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  const handleGetTopCollections = useCallback(async () => {
    const getData = await getTopCollections(period);
    setTopCollections(getData);
  }, [period]);

  useEffect(() => {
    handleGetTopCollections();
  }, [period]);

  if (!loading) {
    return (
      <section className="max-w-[1240px] mx-6 xl:mx-auto relative z-10">
        <div className="flex items-center justify-between">
          <Typography
            component="h2"
            className="font-semibold leading-[1.2] text-[14px] lg:text-[18px] xl:text-[30px]"
          >
            Top Collections
          </Typography>
          <DateTab current={period} setTab={setPeriod} />
        </div>
        <div className="mt-[42px]">
          <div className="grid xl:grid-cols-2 gap-[100px]">
            <div className="relative grid grid-cols-1 gap-7">
              {topCollections &&
                topCollections.map(
                  (collection, index) =>
                    index < 6 && (
                      <CollectionItemLine
                        collection={collection}
                        num={index + 1}
                        key={index}
                      />
                    )
                )}
              <div
                className="h-[72px] w-full absolute left-0 bottom-0 z-10 rotate-180 pointer-events-none home-mask-1"
                style={{
                  backgroundImage:
                    "linear-gradient(#1c1c1d 0%, #041b2d0f 81.13%, #d9d9d900 100%)",
                }}
              />
            </div>
            <div className="relative hidden grid-cols-1 xl:grid gap-7">
              {topCollections &&
                topCollections.map(
                  (collection, index) =>
                    index >= 6 && (
                      <CollectionItemLine
                        collection={collection}
                        num={index + 1}
                        key={index}
                      />
                    )
                )}
              <div
                className="h-[72px] w-full absolute left-0 bottom-0 z-10 rotate-180 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(#1f1d1f 0%, #1f1d1f0f 81.13%, #d9d9d900 100%)",
                }}
              />
            </div>
          </div>
          <div className="text-center py-7">
            <Link href="/stats">
              <Button>View Stats</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  } else {
    return <Loader />;
  }
};
export default TopCollections;
