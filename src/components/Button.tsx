import { FC, ReactNode } from "react";
interface ButtonProps {
  children?: ReactNode;
  isButton?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({
  children,
  className,
  isButton,
  onClick,
}) => {
  const HeadingComponent = (isButton
    ? "button"
    : "div") as keyof JSX.IntrinsicElements;

  return (
    <HeadingComponent
      className={`text-dark bg-light-100 py-2 lg:py-2.5 px-5 lg:px-8 xl:px-10 text-[12px] lg:text-[16px] rounded-lg lg:rounded-xl inline-block font-semibold hover:bg-[#c5c5c5] cursor-pointer duration-300 ${
        className ? className : ""
      }`}
      onClick={onClick ? onClick : () => {}}
    >
      {children}
    </HeadingComponent>
  );
};

export default Button;
