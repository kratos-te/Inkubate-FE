import { FC } from "react";

interface ToggleProps {
  checked: boolean;
  onToggle: () => void;
  size?: "sm" | "md" | "lg";
}

const ToggleSwitch: FC<ToggleProps> = ({ checked, onToggle }) => {
  return (
    <div
      className={`w-[35px] h-5 rounded-full relative p-[3px] duration-300 ${
        checked ? "bg-secondary" : "bg-black"
      }`}
      onClick={onToggle}
    >
      <div
        className={`w-[14px] h-[14px] rounded-full bg-light-100 absolute duration-300 top-[3px] ${
          checked ? "left-[18px] " : "left-[3px] "
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
