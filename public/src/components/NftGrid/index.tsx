import { DEMO_NFTS } from "@/config";
import useWindowSize from "@/utils/useWindowSize";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import NftCard from "../NftCard";
import NftCardLoader from "../Common/NftCardLoader";

interface GridProps {
  collectionId: string;
  isDense: boolean;
}

const NftGrid: FC<GridProps> = ({ isDense }) => {
  const nfts = Array(40).fill(DEMO_NFTS[0]);
  const gridRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const colCont = useMemo(() => {
    let cnt = 5;
    if (gridRef.current) {
      const boxSize = gridRef.current.offsetWidth;
      cnt = Math.floor(boxSize / (isDense ? 240 : 300));
      if (windowSize.width < 768 && windowSize.width > 480) {
        cnt = 3;
      } else if (windowSize.width <= 480) {
        cnt = 2;
      }
    }
    return cnt;
  }, [windowSize.width, isDense]);

  const width = useMemo(() => {
    let w = 250;
    if (gridRef.current) {
      const boxSize = gridRef.current.offsetWidth;
      w = (boxSize - (colCont - 1) * 20) / colCont;
      if (windowSize.width < 1400) {
        w = (boxSize - (colCont - 1) * 20) / colCont;
      }
    }
    return w;
  }, [colCont, windowSize.width]);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);
  return (
    <div
      className={`grid w-full gap-y-10 gap-x-3 lg:gap-x-5`}
      ref={gridRef}
      style={{
        gridTemplateColumns: `repeat(${colCont}, minmax(0, 1fr))`,
      }}
    >
      {!loading
        ? nfts.map((item, key) => (
            <NftCard nft={item} key={key} width={width} />
          ))
        : Array.from({ length: 20 }).map((_, key) => (
            <NftCardLoader key={key} width={width} />
          ))}
    </div>
  );
};

export default NftGrid;
