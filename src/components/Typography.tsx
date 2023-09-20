"use client";
import { FC, ReactNode } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface TypographyProps {
  children?: ReactNode;
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
    <HeadingComponent
      className={`${className ? className : ""}`}
      style={{
        color: color || (theme === "dark" ? "#F2F3F4" : "#041B2D"),
      }}
    >
      {children}
    </HeadingComponent>
  );
};

export default Typography;
