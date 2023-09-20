"use client";
import { FC, useState } from "react";
import Typography from "./Typography";
import { ArrowDownLineIcon } from "./SvgIcons";

interface BoxProps {
  icon: React.ReactNode;
  title: React.ReactNode;
  defaultCollapsed?: boolean;
  children?: React.ReactNode;
}

const AssetDetailBox: FC<BoxProps> = ({
  icon,
  title,
  children,
  defaultCollapsed,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  return (
    <div className="rounded-xl bg-dark-200 shadow-box lg:shadow-none">
      <div
        className="flex items-center justify-between w-full p-5 cursor-pointer"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <Typography className="text-[14px] xl:text-[16px] flex items-center gap-2.5 font-semibold font-readex">
          {icon} {title}
        </Typography>
        <button>
          <ArrowDownLineIcon
            className={`${isCollapsed ? "rotate-0" : "-rotate-90"}`}
          />
        </button>
      </div>
      {isCollapsed && <div className="px-5 pb-5">{children}</div>}
    </div>
  );
};

export default AssetDetailBox;
