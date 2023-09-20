"use client";
import { FC, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Typography from "../Typography";
import { EthSmIcon } from "../SvgIcons";
import Skeleton from "react-loading-skeleton";

interface ItemProps {
  src: string;
  price: number;
  width?: number;
  height?: number;
  left?: number;
  top?: number;
  title: string;
  zIndex?: number;
}

const SliderItem: FC<ItemProps> = ({
  src,
  width,
  height,
  left,
  top,
  title,
  zIndex,
  price,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const topValue = top ? top : 0;

  const [loading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1200);
  }, []);
  return (
    <div
      ref={itemRef}
      className={`absolute slider-item overflow-hidden rounded-2xl bg-[#444]`}
      style={{
        width,
        height,
        top,
        left,
        zIndex: zIndex,
      }}
    >
      {!loading && (
        <>
          <Image
            src={src}
            className="absolute z-0 overflow-hidden rounded-2xl"
            alt=""
            fill
            objectFit="cover"
          />
          <div
            className="absolute left-0 bottom-0 z-10 w-full h-[160px]"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(0, 0, 0, 0.00) 23.23%, #000 100%)",
            }}
          />
          {topValue < 250 && (
            <div className="absolute z-10 left-[14px] bottom-[22px]">
              <Typography className="font-readex font-medium text-[15px] mb-[3px]">
                {title}
              </Typography>
              <Typography className="font-readex font-medium text-[12px] flex items-center gap-1">
                Floor:
                <EthSmIcon /> {price}
              </Typography>
            </div>
          )}
        </>
      )}
      {loading && (
        <>
          <Skeleton
            className="h-full w-full absolute -top-1 left-0 z-30"
            baseColor="#2b2b2b"
            highlightColor="#313131"
          />
          <Skeleton
            className="absolute bottom-[74px] left-4 z-30"
            width={78}
            height={24}
            baseColor="#313131"
            highlightColor="#393939"
          />
          <Skeleton
            className="absolute bottom-[72px] left-4 z-30"
            width={70}
            height={16}
            baseColor="#313131"
            highlightColor="#393939"
          />
        </>
      )}
    </div>
  );
};

export default SliderItem;
