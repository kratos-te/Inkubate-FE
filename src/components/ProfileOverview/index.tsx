import { useState, useEffect } from "react";
import Link from "next/link";
import {
  DiscordIcon,
  FacebookIcon,
  MenuDotsIcon,
  MenuSettingIcon,
  RedditIcon,
  ReportIcon,
  ShareMdIcon,
  TwitterIcon,
} from "../SvgIcons";
import Typography from "../Typography";
import copy from "copy-to-clipboard";
import Image from "next/image";
import CopyAddress from "../CopyAddress";
import { ProfileItem, UserItem } from "@/utils/types";
import Logo from "../Logo";
import { successAlert } from "../ToastGroup";
import { ORIGIN_URI, SHARE_TWITTER_LINK } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import ClickAwayComponent from "../ClickAwayComponent";


interface IProfileOverViewProps {
  userData: UserItem;
  profile: ProfileItem;
}

const ProfileOverview = ({ userData, profile }: IProfileOverViewProps) => {

  const [openShare, setOpenShare] = useState(false)
  const [openMenuDots, setOpenMenuDots] = useState(false)
  const [copied, setCopied] = useState(false);
  const { openSettingModal } = useModal()

  const handleOpenShare = () => {
    setOpenShare(!openShare)
    setOpenMenuDots(false)
  }

  const handleMenuDots = () => {
    setOpenMenuDots(!openMenuDots)
    setOpenShare(false)
  }

  const handleCopy = (link: string) => {
    setCopied(true);
    copy(link);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  useEffect(() => {
    if (copied === true) {
      successAlert("Link copied successfully!")
    }
  }, [copied])

  return (
    <div className="max-w-[1600px] mx-6 relative 2xl:mx-auto z-10">
      <div className="pt-8 xl:pt-12 mb-[30px] md:mb-[60px] lg:mb-[100px] flex gap-[22px] lg:gap-10 xl:gap-[68px] flex-col lg:flex-row">
        <div
          className="p-[1px] xl:p-[3px] rounded-lg xl:rounded-[20px] inline-flex h-[188px] w-[188px] xl:h-[292px] xl:w-[292px] -mt-[156px] lg:-mt-[72px] xl:-mt-[110px] z-10"
          style={{
            background: "linear-gradient(90deg, #428CD4, #FF9CDA)",
          }}
        >
          <div className="relative w-[186px] xl:w-[286px] h-[186px] xl:h-[286px] rounded-lg xl:rounded-[19px] overflow-hidden">
            {profile?.avatar?.url && (
              <Image
                src={profile?.avatar?.url}
                fill
                objectFit="cover"
                priority
                alt=""
              />
            )}
          </div>
        </div>
        <div className="w-full lg:w-[calc(100%-158px)] xl:w-[calc(100%-360px)]">
          <div className="flex justify-between items-center">
            <div className="flex gap-5">
              <Typography
                component="h2"
                className="text-[28px] lg:text-[30px] font-bold font-poppins flex gap-2 items-center leading-[1]"
              >
                <span>{userData?.username || "Unnamed User"}</span>
              </Typography>
              <CopyAddress address={userData?.walletAddress || ""} />
            </div>
            <div className="flex gap-[14px]">
              <div className="relative">
                <button className="" onClick={handleOpenShare}>
                  <ShareMdIcon className="md:w-5 w-6 h-5 md:h-6" />
                </button>
                {openShare && (
                  <ClickAwayComponent onClickAway={() => setOpenShare(false)}>
                    <div className="absolute w-[200px] flex flex-col gap-1 top-[30px] rounded-xl backdrop-blur-sm text-white p-1 right-0 z-30" style={{
                      backgroundImage:
                        "linear-gradient(120deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%, rgba(246, 246, 246, 0.00) 100%)",
                    }}>
                      <div className="flex gap-[10px] hover:bg-black/30 rounded-xl p-3" onClick={() => handleCopy(`${ORIGIN_URI}/user/${userData.id}`)}>
                        <Logo className="w-[25px] h-[25px]" />
                        <p className="text-white text-[16px] font-readex ">
                          Copy link
                        </p>
                      </div>
                      <Link href={SHARE_TWITTER_LINK} passHref className="flex gap-[10px] hover:bg-black/30 rounded-xl p-3" >
                        <TwitterIcon className="w-[25px] h-[25px]" />
                        <p className="text-white text-[16px] font-readex ">
                          Share on Twitter
                        </p>
                      </Link>
                    </div>
                  </ClickAwayComponent>
                )}
              </div>
              <div className="relative">
                <button onClick={handleMenuDots}>
                  <MenuDotsIcon className="md:w-5 w-6 h-5 md:h-6" />
                </button>
                {openMenuDots && (
                  <ClickAwayComponent onClickAway={() => setOpenMenuDots(false)}>
                    <div className="absolute w-[200px] flex flex-col gap-1 top-[30px] rounded-xl backdrop-blur-sm text-white p-1 right-0 z-30" style={{
                      backgroundImage:
                        "linear-gradient(120deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.03) 100%, rgba(246, 246, 246, 0.00) 100%)",
                    }}>
                      <div className="flex gap-[10px] hover:bg-black/30 rounded-xl p-3" onClick={openSettingModal}>
                        <MenuSettingIcon />
                        <p className="text-white text-[16px] font-readex ">
                          Settings
                        </p>
                      </div>
                      <Link href={SHARE_TWITTER_LINK} passHref className="flex gap-[10px] hover:bg-black/30 rounded-xl p-3" >
                        <ReportIcon className="w-[25px] h-[25px]" />
                        <p className="text-white text-[16px] font-readex ">
                          Report
                        </p>
                      </Link>
                    </div>
                  </ClickAwayComponent>
                )}
              </div>
            </div>
          </div>

          <Typography
            component="p"
            className="text-[14px] leading-5 text-light-200 max-w-[600px] xl:max-w-[700px] mt-[18px]"
          >
            {profile?.bio || "<Empty Bio>"}
          </Typography>

          <div className="flex gap-4 mt-5 xl:gap-6">
            {profile?.twitter && (
              <Link href={profile.twitter} className="w-6 h-6">
                <TwitterIcon />
              </Link>
            )}
            {profile?.discord && (
              <Link href={profile.discord} className="w-6 h-6">
                <DiscordIcon />
              </Link>
            )}
            {profile?.reddit && (
              <Link href={profile.reddit} className="w-6 h-6">
                <RedditIcon />
              </Link>
            )}
            {profile?.facebook && (
              <Link href={"#"} className="w-6 h-6">
                <FacebookIcon />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
