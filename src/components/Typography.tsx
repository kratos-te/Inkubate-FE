"use client";
import { FC } from "react";

interface TypographyProps {
  children?: any;
  component?: string;
  className?: string;
  color?: string;
}

const Typography: FC<TypographyProps> = ({
  children,
  component,
  className,
}) => {
  const HeadingComponent = (
    component ? component : "div"
  ) as keyof JSX.IntrinsicElements;

  return (
    <HeadingComponent
      className={`text-[#F2F3F4] ${className ? className : ""}`}
    >
      {children}
    </HeadingComponent>
  );
};

export default Typography;
