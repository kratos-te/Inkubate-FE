import { FC, ReactNode } from "react";
interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

const IconButton: FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`grid w-7 h-7 place-content-center ${className}`}
    >
      {children}
    </button>
  );
};

export default IconButton;
