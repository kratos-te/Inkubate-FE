/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import { DEFAULT_LIST_ITEMS_COUNT, USER_TABS } from "@/config";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import {
  ActivityTypes,
  NftTypes,
  ProfileItem,
  UserItem,
} from "@/utils/types";
import { ListModal } from "@/components/ListModal";
import useScroll from "@/utils/useScroll";

const profileName = "User Page";

export default function UserPage() {
  const query = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [sort, setSort] = useState<string>("nfts");
  const [sortAscending, setSortAscending] = useState<string>("desc");

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
  // const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [isDense, setIsDense] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nftByOwner, setNftByOwner] = useState<NftTypes[]>([]);
  const [activeListing, setActiveListing] = useState<NftTypes | undefined>(
    undefined
  );
  const [actByUser, setActByUser] = useState<ActivityTypes[]>([]);
  const [endPageLoading, setEndPageLoading] = useState(false);


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
  const { top, height } = useScroll();


  useEffect(() => {
    if (loading) return;
    handleFetchStatsData(true);
  }, [sortAscending, loading]);

  // Fetch initial data when reloading
  useEffect(() => {
    handleFetchStatsData(true);
  }, [search]);

  useEffect(() => {
    if (loading || !nftByOwner) return;
    if (nftByOwner && top > 400 * nftByOwner.length - height) {
      handleFetchStatsData(false);
    }
  }, [top, height, loading]);

  const handleFetchStatsData = useCallback(
    (withClear: boolean) => {
      if (withClear) setEndPageLoading(false);
      if (!withClear && endPageLoading) return;
      const lastSroll = top;
      setLoading(true);
      if (tab === "1") {
        getNftsByUser({
          userId: userData.id,
          sortAscending: sortAscending,
          sortBy: sort,
          filterBy: "ERC721_NFTS",
          search,
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res)
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "2") {
        getNftsByUser({
          userId: userData.id,
          sortAscending: sortAscending,
          sortBy: sort,
          filterBy: "ERC1155_NFTS",
          search,
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res)
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "3") {
        getNftsByUser({
          userId: userData.id,
          sortAscending: sortAscending,
          sortBy: sort,
          filterBy: "CREATED",
          search,
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res)
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "4") {
        getActivityByUser({
          userId: userData.id,
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then((res) => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setActByUser(res)
            } else {
              const oldData: ActivityTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setActByUser(oldData)
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [search, top, tab]
  );


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
                  className={`text-light-100 text-[12px] lg:text-[15px] duration-300 font-semibold font-readex rounded-xl uppercase py-2.5 px-[14px] ${tab === item.tab
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
                value={search}
                onChange={(e) => setSearch(e.target.value || "")}
              />
            </div>
            <div className="hidden lg:block">
              <SortDropdown
                value={sort}
                setValue={setSort}
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
