import { FC } from "react";
import Link from "next/link";

interface MenuButtonProps {
  className?: string;
  icon: JSX.Element;
  title: string;
  link: string;
}
export const MenuButton: FC<MenuButtonProps> = ({
  className,
  icon,
  title,
  link,
}) => {
  return (
    <div className={`flex space-x-4 ${className ? className : ""}`}>
      <Link href={link} className="flex space-x-4 items-center">
        <div className="w-6 h-6 flex items-center justify-between">{icon}</div>
        <p className="text-white text-lg font-semibold">{title}</p>
      </Link>
    </div>
  );
};
