"use client";
import { FC, ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

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
  color,
}) => {
  const { theme } = useTheme();
  const HeadingComponent = (
    component ? component : "div"
  ) as keyof JSX.IntrinsicElements;

  return (
    <HeadingComponent className={`text-[#F2F3F4] ${className ? className : ""}`}>
      {children}
    </HeadingComponent>
  );
};

export default Typography;
