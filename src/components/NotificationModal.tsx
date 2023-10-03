import { FC } from "react";
import Image from "next/image";
import { NOTIFICATIONS } from "@/config";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: FC<NotificationModalProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  return (
    <div className="absolute right-36 top-32 bg-dark-200  w-[529px] rounded-2xl overflow-hidden px-6 max-lg:w-[369px] max-lg:-right-4">
      <div className="modal_body text-center flex-col gap-8">
        {NOTIFICATIONS.map((item, key) => (
          <div
            key={key}
            className="flex gap-6 items-center pb-[38px] pt-6 border-b-[1px] border-[#666666]"
          >
            <Image
              src={item.pfp}
              className=""
              width={114}
              height={114}
              alt="profile image on Notification"
            />
            <div className="flex flex-col gap-4 justify-start items-start">
              <div className="flex text-[20px] font-semibold text-white text-left">
                {item.title}
              </div>
              <div className="flex text-[14px] font-medium text-[#666666]">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
