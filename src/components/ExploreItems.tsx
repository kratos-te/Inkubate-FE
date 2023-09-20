"use client";
import { FC, useState } from "react";
import { FilterIcon, ListIcon, ListSmIcon, SearchIcon } from "./SvgIcons";
import Typography from "./Typography";
import SortDropdown from "./SortDropdown";
import CollectionFilter from "./CollectionFilter";
import NftGrid from "./NftGrid";

const ExploreItems: FC = () => {
  const [sort, setSort] = useState("p-l-h");
  const [isDense, setIsDense] = useState(true);
  return (
    <>
      <div className="relative z-30 flex gap-3 mt-6 lg:mt-12">
        <button className="flex py-3 px-2.5 w-11 lg:w-auto justify-center rounded-lg bg-dark-400 items-center h-11">
          <FilterIcon />

          <Typography className="ml-2.5 text-[14px] leading-[20px] hidden lg:block">
            Filters
          </Typography>
        </button>
        <div className="items-center w-[calc(100%-150px)] lg:w-[calc(100%-400px)] relative">
          <SearchIcon className="absolute left-3 top-4" />
          <input
            className="font-readex text-[14px] text-light-100 bg-dark-400 rounded-lg w-full h-11 pl-9"
            placeholder="Search items"
          />
        </div>
        <div className="hidden lg:block">
          <SortDropdown value={sort} setValue={setSort} />
        </div>
        <div className="flex rounded-lg bg-dark-400 items-center h-11 overflow-hidden">
          <button
            className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
            onClick={() => setIsDense(false)}
          >
            <ListIcon color={`${!isDense ? "#EA4492" : "#F2F3F4"}`} />
          </button>
          <button
            className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
            onClick={() => setIsDense(true)}
          >
            <ListSmIcon color={`${isDense ? "#EA4492" : "#F2F3F4"}`} />
          </button>
        </div>
      </div>
      <div className="mt-[28px] lg:mt-[38px] flex relative z-10 ">
        <div className="hidden lg:block w-[300px]">
          <CollectionFilter />
        </div>
        <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
          <NftGrid collectionId="opbunnies" isDense={isDense} />
        </div>
      </div>
    </>
  );
};

export default ExploreItems;
