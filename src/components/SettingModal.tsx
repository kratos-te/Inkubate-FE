"use client";
import { FC, useState } from "react";
import { useModal } from "@/contexts/ModalContext";
import {
  CloseCircleIcon,
  NotificationIcon,
  OffersIcon,
  UserIcon,
} from "./SvgIcons";
import Typography from "./Typography";
import NotificationForms from "./Setting/NotificationForms";
import ProfileForms from "./Setting/ProfileForms";
import OffersForms from "./Setting/OffersForms";

const SettingModal: FC = () => {
  const { isOpenedSetting, closeSettingModal } = useModal();

  const [tab, setTab] = useState("profile");

  if (!isOpenedSetting) return;
  return (
    <div className="fixed top-0 left-0 z-50 grid w-screen h-screen xld:place-content-center">
      <div className="absolute left-0 top-0 w-full h-full bg-[#000000] opacity-50" />
      <div className="w-screen xld:w-[1300px] h-screen xld:h-auto max-h-screen xld:max-h-[calc(100vh-60px)] roudned-none xld:rounded-xl relative bg-dark-200">
        <button
          className="group rounded-lg md:rounded-xl p-1 md:p-2.5 absolute right-2 md:right-9 top-2 md:top-9 z-10"
          onClick={closeSettingModal}
          style={{
            background:
              "linear-gradient(135deg, rgba(113, 113, 113, 0.30) 0%, rgba(171, 171, 171, 0.70) 100%)",
          }}
        >
          <CloseCircleIcon className="group-hover:rotate-90 duration-300" />
        </button>
        <div className="px-6 lg:px-[58px] xl:px-[144px] pt-[60px] lg:pt-20 xl:pt-[111px]">
          <Typography className="text-[36px] xl:text-[48px] font-poppins font-semibold -tracking-[0.96px] leading-[48px] xl:leading-[60px]">
            Setting
          </Typography>
        </div>
        <div className="px-6 lg:px-[58px] xl:px-[144px] mt-6 xl:mt-[45px] border-b border-[#404040]">
          <div className="flex gap-4 lg:gap-10">
            {settingTabs.map((item, key) => (
              <div
                key={key}
                className={`flex items-center gap-2 py-2.5 cursor-pointer relative ${
                  tab === item.value ? "opacity-100" : "opacity-40"
                }`}
                onClick={() => setTab(item.value)}
              >
                {item.icon}
                <Typography className="text-[14px] font-semibold leading-5 capitalize">
                  {item.value}
                </Typography>
                <div
                  className={`w-full absolute -bottom-0.5 h-1 ${
                    tab === item.value ? "bg-secondary" : "bg-transparent"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
        {tab === "profile" && <ProfileForms />}
        {tab === "notification" && <NotificationForms />}
        {tab === "offers" && <OffersForms />}
      </div>
    </div>
  );
};

export default SettingModal;

const settingTabs = [
  {
    value: "profile",
    icon: <UserIcon />,
  },
  {
    value: "notification",
    icon: <NotificationIcon />,
  },
  {
    value: "offers",
    icon: <OffersIcon />,
  },
];
