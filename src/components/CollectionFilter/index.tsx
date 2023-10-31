"use client";
import { FC, useState, Dispatch, SetStateAction, useEffect } from "react";
import { ArrowDownLineIcon, BnbIcon, EthIcon } from "../SvgIcons";
import Loader from "./Loader";
import { NftTypes } from "@/utils/types";

const CollectionFilter: FC<{ nft: NftTypes }> = ({ nft }) => {
  const [status, setStatus] = useState("all");
  const [currency, setCurrency] = useState("all");

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return !loading ? (
    <div className="sticky top-0">
      <FilterGroup title="Status" opend={true}>
        <FilterItem
          title="All"
          value="all"
          isCurrent={status === "all"}
          setValue={setStatus}
        />
        <FilterItem
          title="Buy Now"
          value="now"
          isCurrent={status === "now"}
          setValue={setStatus}
        />
        <FilterItem
          title="Has Offers"
          value="offers"
          isCurrent={status === "offers"}
          setValue={setStatus}
        />
      </FilterGroup>
      <FilterGroup title="Price" opend={true}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            className="p-3 text-light-100 placeholder:text-third border-[0.5px] border-third bg-transparent text-[14px] rounded-xl outline-none hover:bg-dark-500"
            placeholder="Min"
          />
          <input
            type="number"
            className="p-3 text-light-100 placeholder:text-third border-[0.5px] border-third bg-transparent text-[14px] rounded-xl outline-none hover:bg-dark-500"
            placeholder="Max"
          />
        </div>
      </FilterGroup>
      <FilterGroup title="Currency" opend={true}>
        <FilterItem
          title="All"
          value="all"
          isCurrent={currency === "all"}
          setValue={setCurrency}
        />
        <FilterItem
          title={
            <div className="flex gap-[5px] items-center">
              <EthIcon />
              ETH
            </div>
          }
          value="eth"
          isCurrent={currency === "eth"}
          setValue={setCurrency}
        />
        <FilterItem
          title={
            <div className="flex gap-[5px] items-center">
              <BnbIcon color="#ff0" />
              BNB
            </div>
          }
          value="bnb"
          isCurrent={currency === "bnb"}
          setValue={setCurrency}
        />
      </FilterGroup>
      {nft.attributes?.length > 0 &&
        nft.attributes.map((item, key) => (
          <FilterGroup key={key} title={item.trait_type}></FilterGroup>
        ))}
    </div>
  ) : (
    <Loader />
  );
};
export default CollectionFilter;

interface FilterGroupProps {
  title: string;
  children?: React.ReactNode;
  opend?: boolean;
}

export const FilterGroup: FC<FilterGroupProps> = ({
  title,
  children,
  opend,
}) => {
  const [isOpen, setIsOpen] = useState(opend);
  return (
    <div
      className={`border-b-[0.5px] border-b-light-400 last:border-none ${
        isOpen ? "mt-6 pb-5" : "pb-0"
      }`}
    >
      <div
        className="flex items-center justify-between py-5 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="font-readex text-[16px] font-semibold text-secondary">
          {title}
        </div>
        <ArrowDownLineIcon
          color="#EA4492"
          className={`${isOpen ? "rotate-0" : "-rotate-90"}`}
        />
      </div>
      <div
        className={`overflow-hidden duration-300 ${isOpen ? "h-auto" : "h-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

interface FilterItemProps {
  title: React.ReactNode;
  value: string;
  isCurrent: boolean;
  setValue: Dispatch<SetStateAction<string>>;
}
export const FilterItem: FC<FilterItemProps> = ({
  title,
  value,
  setValue,
  isCurrent,
}) => {
  return (
    <div
      className={`p-3 rounded-xl cursor-pointer mb-2 text-[14px] font-[500] text-light-100 ${
        isCurrent ? "bg-secondary" : "bg-dark-400 hover:bg-dark-500"
      }`}
      onClick={() => setValue(value)}
    >
      {title}
    </div>
  );
};
