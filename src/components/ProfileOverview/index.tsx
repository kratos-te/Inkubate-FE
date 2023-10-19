import Link from "next/link";
import {
  DiscordIcon,
  FacebookIcon,
  MenuDotsIcon,
  RedditIcon,
  ShareMdIcon,
  TwitterIcon,
} from "../SvgIcons";
import Typography from "../Typography";
import Image from "next/image";
import CopyAddress from "../CopyAddress";
import { useUser } from "@/contexts/UserContext";

const ProfileOverview = () => {
  const { username, userAddress, userData, profile } = useUser();
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
                <span>{userData.username ? userData.username : username}</span>
              </Typography>
              <CopyAddress address={userAddress} />
            </div>
            <div className="flex gap-[14px]">
              <button>
                <ShareMdIcon className="md:w-5 w-6 h-5 md:h-6" />
              </button>
              <button>
                <MenuDotsIcon className="md:w-5 w-6 h-5 md:h-6" />
              </button>
            </div>
          </div>

          <Typography
            component="p"
            className="text-[14px] leading-5 text-light-200 max-w-[600px] xl:max-w-[700px] mt-[18px]"
          >
            {profile?.bio || "<Empty Bio>"}
          </Typography>

          <div className="flex gap-4 mt-5 xl:gap-6">
            {profile?.twitter &&
              <Link href={profile.twitter} className="w-6 h-6">
                <TwitterIcon />
              </Link>
            }
            <Link href={"#"} className="w-6 h-6">
              <DiscordIcon />
            </Link>
            <Link href={"#"} className="w-6 h-6">
              <RedditIcon />
            </Link>
            <Link href={"#"} className="w-6 h-6">
              <FacebookIcon />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
