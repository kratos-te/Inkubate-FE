"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";

import {
  getActivityByUser,
  getNftsByUser,
  getProfileById,
  getUserById,
} from "@/actions";
import {
  FilterIcon,
  ListIcon,
  ListSmIcon,
  SearchIcon,
} from "@/components/SvgIcons";
import Typography from "@/components/Typography";
import SortDropdown from "@/components/SortDropdown";
import CollectionFilter from "@/components/CollectionFilter";
import NftGrid from "@/components/NftGrid";
import CoverBanner from "@/components/CoverBanner";
import ProfileOverview from "@/components/ProfileOverview";
import ProfileOverviewLoader from "@/components/ProfileOverview/Loader";
import ActivityDetail from "@/components/ActivityDetail";
import { USER_TABS } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import {
  ActivityTypes,
  NftTypes,
  ProfileItem,
  UserFilterByOption,
  UserItem,
} from "@/utils/types";
import { ListModal } from "@/components/ListModal";

const profileName = "User Page";

export default function UserPage() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sortBy, setSortBy] = useState<string>("nfts");
  const [_sortAscending, setSortAscending] = useState<string>("desc");

  const [userData, setUserData] = useState<UserItem>({
    id: "",
    username: "",
    walletAddress: "",
  });
  const [profile, setProfile] = useState<ProfileItem>({
    bio: "",
    twitter: "",
    discord: "",
    facebook: "",
    reddit: "",
    avatarId: "",
    bannerId: "",
    avatar: {
      id: "",
      url: "",
      fileEntityId: "",
    },
    banner: {
      id: "",
      url: "",
      fileEntityId: "",
    },
  });
  const [isDense, setIsDense] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nftByOwner, setNftByOwner] = useState<NftTypes[]>([]);
  const [activeListing, setActiveListing] = useState<NftTypes | undefined>(
    undefined
  );
  const [actByUser, setActByUser] = useState<ActivityTypes[]>([]);

  const tab = useMemo(() => {
    let t = "1";
    if (query && query?.get("tab")) {
      t = query?.get("tab") as string;
    }
    return t;
  }, [query]);

  const userId = useMemo(() => {
    let path = "";
    if (pathname) {
      path = pathname.split("/")[2] as string;
    }
    return path;
  }, [pathname]);

  useEffect(() => {
    setLoading(true);
    const getNftData = async () => {
      switch (tab) {
        case "4":
          const activity = await getActivityByUser(userId);
          setActByUser(activity?.data);
          break;
        case "1":
          await getNftsByUser(userId, UserFilterByOption.ERC721_NFTS)
            .then((res) => res?.data)
            .then((nftData) => setNftByOwner(nftData));
          break;
        case "2":
          await getNftsByUser(userId, UserFilterByOption.ERC1155_NFTS)
            .then((res) => res?.data)
            .then((nftData) => setNftByOwner(nftData));
          break;
        case "3":
          await getNftsByUser(userId, UserFilterByOption.CREATED)
            .then((res) => res?.data)
            .then((nftData) => setNftByOwner(nftData));
          break;
      }
      setLoading(false);
    };
    getNftData();
  }, [userId, tab]);

  useEffect(() => {
    setLoading(true);
    getUserData(userId).then(() => {
      setLoading(false);
    });
  }, [userId]);

  const getUserData = async (userId: string) => {
    const user = await getUserById(userId);
    if (user) {
      setUserData(user);
    }
    const profile = await getProfileById(userId);
    if (profile) {
      setProfile(profile);
    }
  };

  const selectActiveNftIdx = (nft: NftTypes) => {
    setActiveListing(nft);
  };

  return (
    <>
      <MainLayout
        className="!bg-dark-200"
        bgSrc="/assets/images/bg-profile.png"
        bgClass="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none w-[2167px] h-[2624px] object-cover opacity-60 lg:opacity-100"
        pageLoading={loading}
        meta={
          <Meta title={profileName} description="Lorem ipsum dolor sit amet." />
        }
      >
        {!loading ? (
          <>
            <CoverBanner
              src={profile?.banner?.url || "/assets/images/profile-cover.jpg"}
            />
            <ProfileOverview userData={userData} profile={profile} />
          </>
        ) : (
          <>
            <Skeleton
              width={"100%"}
              className="h-![392px] xl:!h-[556px]"
              baseColor="#333"
              highlightColor="#444"
            />
            <ProfileOverviewLoader />
          </>
        )}
        <div className="max-w-[1600px] mx-5 2xl:mx-auto relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 mb-[23px] flex-wrap">
              {USER_TABS.map((item, key) => (
                <button
                  key={key}
                  onClick={() => router.push(`?tab=${item.tab}`)}
                  className={`text-light-100 text-[12px] lg:text-[15px] duration-300 font-semibold font-readex rounded-xl uppercase py-2.5 px-[14px] ${
                    tab === item.tab
                      ? "bg-secondary hover:bg-[#AE115B]"
                      : "bg-dark-400 hover:bg-[#444]"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>
          <div className="border-b-[0.5px] border-light-400 relative z-10  mt-6"></div>
          <div className={`relative flex gap-3 mt-6 lg:mt-12 z-20`}>
            <button className="flex py-3 px-2.5 w-11 lg:w-auto justify-center rounded-lg bg-dark-400 items-center h-11">
              <FilterIcon />
              <Typography className="ml-2.5 text-[14px] leading-[20px] hidden lg:block">
                Filters
              </Typography>
            </button>
            <div className="items-center w-[calc(100%-150px)] lg:w-[calc(100%-400px)] relative">
              <SearchIcon className="absolute left-3 top-4" />
              <input
                className="font-readex text-[14px] text-light-100 bg-dark-400 rounded-lg w-full h-11 pl-9"
                placeholder="Search items"
              />
            </div>
            <div className="hidden lg:block">
              <SortDropdown
                value={sortBy}
                setValue={setSortBy}
                setSortAscending={setSortAscending}
              />
            </div>
            <div className="flex rounded-lg bg-dark-400 items-center h-11 overflow-hidden">
              <button
                className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
                onClick={() => setIsDense(false)}
              >
                <ListIcon color={`${!isDense ? "#EA4492" : "#F2F3F4"}`} />
              </button>
              <button
                className="grid w-11 h-11 place-content-center hover:bg-dark-500 duration-300"
                onClick={() => setIsDense(true)}
              >
                <ListSmIcon color={`${isDense ? "#EA4492" : "#F2F3F4"}`} />
              </button>
            </div>
          </div>
          <div className={`mt-[28px] lg:mt-[38px] flex relative z-10 `}>
            <div className="hidden lg:block w-[300px]">
              {nftByOwner[0] && <CollectionFilter nft={nftByOwner[0]} />}
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {(tab === "1" || tab === "2" || tab === "3") && (
                <NftGrid
                  nftData={nftByOwner}
                  setActiveItem={(item) =>
                    selectActiveNftIdx(item as unknown as NftTypes)
                  }
                  isDense={isDense}
                />
              )}
              {tab === "4" && <ActivityDetail actData={actByUser} />}
            </div>
          </div>
        </div>
      </MainLayout>
      {activeListing && <ListModal nft={activeListing} />}
    </>
  );
}
