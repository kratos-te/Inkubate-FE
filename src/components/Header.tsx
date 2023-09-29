"use client";
import { FC, useState } from "react";
import { useAccount, useDisconnect, useBalance } from "wagmi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { refresh, signOut, validate } from "@/actions";
import { DROPDOWN_LINKS, HEADER_LINKS, NOTIFICATIONS } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import Button from "./Button";
import ClickAwayComponent from "./ClickAwayComponent";
import { ConvertModal } from "./ConvertModal";
import IconButton from "./IconButton";
import Logo from "./Logo";
import { MenuButton } from "./MenuButton";
import { NotificationModal } from "./NotificationModal";
import SearchBar from "./SearchBar";
import {
  AlarmIcon,
  BadgeIcon,
  BagIcon,
  BnbIcon,
  EthIcon,
  HamburgerIcon,
  MenuLogoutIcon,
  SearchIcon,
} from "./SvgIcons";
import Typography from "./Typography";

const Header: FC = () => {
  const { openWalletModal, closeWalletModal } = useModal();
  const [isNotificationModal, setIsNotificationModal] = useState(false);
  const { username, userAddress, profile } = useUser();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();
  const { data, isError, isLoading } = useBalance({ address: userAddress as `0x${string}` })

  const [isEther, setIsEther] = useState(true);
  const [isBnb, setIsBnb] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [isConvertModal, setIsConvertModal] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const handleDisconnect = async () => {
    if (address) {
      setIsShowDropdown(false);
      disconnect();
      closeWalletModal();
      router.push("/");
      await refresh();
      await signOut();
    }
  };

  const handelSetEther = () => {
    setIsEther(true);
    setIsBnb(false);
  };

  const handleSetBnb = () => {
    setIsEther(false);
    setIsBnb(true);
  };

  const handleDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
    setIsConvertModal(false);
  };

  const handleOpenWrap = () => {
    setIsConvertModal(true);
    setIsShowDropdown(false);
  };

  const handleNotification = () => {
    setIsNotificationModal(!isNotificationModal);
  };

  return (
    <header className="py-8 xl:py-10 2xl:py-[54px] absolute left-0 top-0 w-full z-50">
      <div className="max-w-[1600px] mx-6 2xl:mx-auto">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-6">
            <Link href={"/"}>
              <Logo withTitle className="hidden lg:block" />
              <Logo className="block lg:hidden" />
            </Link>
            <SearchBar />
          </div>

          <div className="items-center gap-[18px] hidden lg:flex">
            <nav>
              <ul className="flex gap-[18px]">
                {HEADER_LINKS.map((item, key) => (
                  <li key={key}>
                    <Link href={item.link} className="relative" passHref>
                      <Typography className="font-semibold leading-[1.5]">
                        {item.title}
                      </Typography>
                      {item.link === pathname && (
                        <div className="h-[3.5px] absolute -bottom-1 w-full bg-secondary" />
                      )}
                    </Link>
                  </li>
                ))}

                {/* <li>
                  <button onClick={openLaunchpadModal}>
                    <Typography className="font-semibold leading-[1.5]">
                      Launchpad
                    </Typography>
                  </button>
                </li> */}
              </ul>
            </nav>
            {isConnected ? (
              <>
                <div className="flex border-2 border-[#EA4492] rounded-full">
                  <div
                    className={`flex space-x-2 border-[#EA4492] py-2 px-4 rounded-full  text-white items-center cursor-pointer ${
                      isEther ? "bg-[#EA4492]" : ""
                    }`}
                    onClick={handelSetEther}
                  >
                    <EthIcon color="white" />
                    <p className="text-[12px] text-white font-bold"> ETH</p>
                  </div>
                  <div
                    className={`flex space-x-2 border-[#EA4492] py-2 px-4 rounded-full text-white items-center cursor-pointer ${
                      isBnb ? "bg-[#EA4492]" : ""
                    }`}
                    onClick={handleSetBnb}
                  >
                    <BnbIcon />
                    <p className="text-[12px] text-white font-bold"> BNB</p>
                  </div>
                </div>
                <IconButton className="relative" onClick={handleNotification}>
                  <AlarmIcon />
                  <BadgeIcon
                    className={`${!NOTIFICATIONS ? "hidden" : "absolute right-0"
                      }`}
                  />
                </IconButton>
                <ClickAwayComponent
                  onClickAway={() => setIsShowDropdown(false)}
                  className="relative w-[44px] h-[44px]"
                >
                  <Image
                    src={
                      profile?.avatar?.url || "/assets/images/default-avatar.svg"
                    }
                    width={44}
                    height={44}
                    alt=""
                    className="rounded-full cursor-pointer"
                    onClick={handleDropdown}
                  />
                  {isShowDropdown && (
                    <div className="w-64 rounded-2xl bg-dark-200 z-10 absolute top-[70px] right-0">
                      <div className="flex-col space-y-10 p-6 border-b border-dark-400">
                        {DROPDOWN_LINKS.map((item, key) => (
                          <MenuButton
                            key={key}
                            icon={<item.icon />}
                            title={item.title}
                            link={item.link}
                          />
                        ))}
                        <button
                          className="flex w-full space-x-4 cursor-pointer"
                          onClick={handleDisconnect}
                        >
                          <MenuLogoutIcon />
                          <p className="text-white text-lg font-semibold">
                            Log out
                          </p>
                        </button>
                      </div>
                      <Link href="/profile" passHref>
                        <div className="flex items-center p-6 gap-[14px] cursor-pointer">
                          <Image
                            src={
                              profile?.avatar?.url ||
                              "/assets/images/default-avatar.svg"
                            }
                            width={40}
                            height={40}
                            alt=""
                            className="rounded-full"
                          />
                          <div className="flex-col space-y-1">
                            <p className="text-white text-lg">{username}</p>
                            <p className="text-white text-[16px]">{data?.formatted} ETH</p>
                          </div>
                        </div>
                      </Link>
                      <button
                        className="flex justify-center py-3 bg-[#EA4492] rounded-b-2xl cursor-pointer w-full"
                        onClick={handleOpenWrap}
                      >
                        <p className="text-white text-lg text-center">
                          Add Funds
                        </p>
                      </button>
                    </div>
                  )}
                </ClickAwayComponent>
                <ConvertModal
                  isOpen={isConvertModal}
                  onClose={() => {
                    setIsConvertModal(false);
                    setIsShowDropdown(false);
                  }}
                />
                <NotificationModal
                  isOpen={isNotificationModal}
                  onClose={() => {
                    setIsNotificationModal(false);
                  }}
                />
              </>
            ) : (
              <Button isButton onClick={openWalletModal}>
                Connect Wallet
              </Button>
            )}

            <IconButton onClick={() => console.log("show bag")}>
              <BagIcon />
            </IconButton>
          </div>

          <div className="flex lg:hidden gap-7">
            <IconButton onClick={() => console.log("show searchbar")}>
              <SearchIcon className="w-6 h-6" />
            </IconButton>
            <ClickAwayComponent
              onClickAway={() => setIsShowDropdown(false)}
              className={`rounded-lg relative z-20 text-[14px]`}
            >
              <div
                className="text-[12px] md:text-[16px] flex items-center text-left text-white font-bold"
                onClick={handleDropdown}
              >
                <HamburgerIcon className="" />
              </div>

              {isShowDropdown && (
                <div className="w-[241px] absolute text-white top-6 z-10 rounded-b-lg overflow-hidden -right-3 pt-2">
                  <div className="text-white bg-dark-200 flex-col justify-start rounded-lg mt-1 duration-300 w-[241px]">
                    <div className="flex-col space-y-10 p-6 border-b border-dark-400">
                      {DROPDOWN_LINKS.map((item, key) => (
                        <MenuButton
                          key={key}
                          icon={<item.icon />}
                          title={item.title}
                          link={item.link}
                        />
                      ))}
                      <button
                        className="flex space-x-4 cursor-pointer"
                        onClick={handleDisconnect}
                      >
                        <MenuLogoutIcon />
                        <p className="text-white text-lg font-semibold">
                          Log out
                        </p>
                      </button>
                    </div>
                    {isConnected ? (
                      <div className="flex items-center p-6 gap-[14px]">
                        <Image
                          src="/assets/images/default-avatar.svg"
                          width={40}
                          height={40}
                          alt=""
                          className="rounded-full cursor-pointer"
                        />
                        <div className="flex-col space-y-1">
                          <p className="text-white text-lg">{username}</p>
                          <p className="text-white text-[16px]">{0.52} ETH</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className="flex mx-auto py-[18px] mb-[18px] text-lg font-semibold justify-center"
                        onClick={openWalletModal}
                      >
                        Connect Wallet
                      </button>
                    )}

                    <button
                      className="flex justify-center py-3 bg-[#EA4492] rounded-b-2xl cursor-pointer w-full"
                      onClick={handleOpenWrap}
                    >
                      <p className="text-white text-lg text-center">
                        Add Funds
                      </p>
                    </button>
                  </div>
                </div>
              )}
              <ConvertModal
                isOpen={isConvertModal}
                onClose={() => {
                  setIsConvertModal(false);
                }}
              />
            </ClickAwayComponent>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;