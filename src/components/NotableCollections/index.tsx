"use client";
import { useEffect, useState } from "react";
import CollectionCard from "../CollectionCard";
import Typography from "../Typography";
import Loader from "./Loader";
import { CollectionParam } from "@/utils/types";
import { getNotableCollections } from "@/actions";

const NotableCollections = () => {
  const [loading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<CollectionParam[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const handleGetNotableCollection = async () => {
      const getData = await getNotableCollections();
      setCollections(getData);
    };
    handleGetNotableCollection();
  }, []);

  return !loading ? (
    <section
      className="container max-w-full mx-0 xl:mx-auto py-20 xl:py-[90px] relative"
      id="notable-collections"
    >
      <div className="relative z-10 px-6 text-center">
        <Typography
          component="h2"
          className="font-semibold leading-[1.2] tracking-[-1.2px] text-[24px] md:text-[36px] lg:text-[48px] xl:text-[60px] font-poppins"
        >
          Notable Collections
        </Typography>
        <Typography
          component="p"
          className="mt-2.5 text-[14px] xl:text-[20px] font-readex"
        ></Typography>
      </div>
      <div className="relative z-10 grid place-content-center ">
        <div className="mt-4 xl:mt-[70px] flex gap-10  overflow-x-auto px-6 max-w-[1304px] mx-auto w-full">
          {collections &&
            collections.map((collection, key) => (
              <CollectionCard collection={collection} key={key} />
            ))}
        </div>
      </div>
    </section>
  ) : (
    <Loader />
  );
};

export default NotableCollections;
