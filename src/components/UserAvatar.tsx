import Image from "next/image";
import { FC } from "react";

interface AvatarProps {
  src?: string;
  gradientFrom: string;
  gradientTo: string;
  className?: string;
  size?: "sm" | "md" | "large";
}

const UserAvatar: FC<AvatarProps> = ({
  src,
  gradientFrom,
  gradientTo,
  className,
}) => {
  return (
    <div
      className={`w-[30px] h-[30px] rounded-full ${className ? className : ""}`}
      style={{
        backgroundImage: `linear-gradient(-45deg, ${gradientFrom}, ${gradientTo})`,
      }}
    >
      {src && (
        <Image
          src={src}
          width={30}
          height={30}
          className="object-cover rounded-full"
          alt=""
        />
      )}
    </div>
  );
};

export default UserAvatar;
