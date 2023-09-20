"use client";
import { FC, useState, useEffect } from "react";
import SliderItem from "./SliderItem";
import useWindowSize from "@/utils/useWindowSize";

const initialStylesDesktop = [
  {
    width: 162,
    height: 121,
    left: 0,
    top: 250.5,
    zIndex: 1,
  },
  {
    width: 162,
    height: 210,
    left: 193,
    top: 206,
    zIndex: 2,
  },
  {
    width: 384,
    height: 496,
    left: 386,
    top: 63,
    zIndex: 3,
  },
  {
    width: 384,
    height: 622,
    left: 801,
    top: 0,
    zIndex: 4,
  },
  {
    width: 384,
    height: 496,
    left: 1216,
    top: 63,
    zIndex: 3,
  },
  {
    width: 162,
    height: 210,
    left: 1631,
    top: 206,
    zIndex: 2,
  },
  {
    width: 162,
    height: 121,
    left: 1822,
    top: 250.5,
    zIndex: 1,
  },
];

const initialStylesMobile = [
  {
    width: 188,
    height: 176,
    left: 0,
    top: 250.5,
    zIndex: 1,
  },
  {
    width: 188,
    height: 230,
    left: 203,
    top: 55,
    zIndex: 2,
  },
  {
    width: 220,
    height: 290,
    left: 406,
    top: 24,
    zIndex: 3,
  },
  {
    width: 257,
    height: 340,
    left: 640,
    top: 0,
    zIndex: 4,
  },
  {
    width: 220,
    height: 290,
    left: 913,
    top: 24,
    zIndex: 3,
  },
  {
    width: 188,
    height: 230,
    left: 1148,
    top: 55,
    zIndex: 2,
  },
  {
    width: 188,
    height: 176,
    left: 1351,
    top: 82,
    zIndex: 1,
  },
];

const HomeSlider: FC = () => {
  const { width } = useWindowSize();

  const [styles, setStyles] = useState(initialStylesDesktop);

  useEffect(() => {
    setStyles(width > 1080 ? initialStylesDesktop : initialStylesMobile);
  }, [width]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStyles((prevStyles: any) => {
        return [
          prevStyles[prevStyles.length - 1],
          ...prevStyles.slice(0, prevStyles.length - 1),
        ];
      });
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div className="h-[133px]" />
      <div
        className="relative mt-0 lg:mt-[110px] mb-[54px] lg:mb-[110px]"
        style={{
          height: width && width <= 1080 ? 340 : 622,
        }}
      >
        <div
          className="inline-flex gap-[31px] custom-slider items-center absolute left-1/2 -translate-x-1/2 z-10"
          style={{
            width: width && width <= 1080 ? 1540 : 1986,
            height: width && width <= 1080 ? 340 : 622,
          }}
        >
          {sliders.map((item, key) => (
            <SliderItem
              key={key}
              src={item.src}
              title={item.title}
              price={item.price}
              width={styles[key]?.width}
              height={styles[key]?.height}
              left={styles[key]?.left}
              top={styles[key]?.top}
              zIndex={styles[key]?.zIndex}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeSlider;

const sliders = [
  {
    src: "/assets/images/slider/1.png",
    title: "Kenny Bear",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/2.png",
    title: "Tiger Gang",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/3.png",
    title: "Bored Town",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/4.png",
    title: "Pixel Brian",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/5.png",
    title: "Kenny Bear",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/6.png",
    title: "Bored Town",
    price: 0.02,
  },
  {
    src: "/assets/images/slider/4.png",
    title: "Tiger Gang",
    price: 0.02,
  },
];
