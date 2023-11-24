/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import Skeleton from "react-loading-skeleton";
import {
  getActivityByUser,
  getHides,
  getLikes,
  getNftsByUser,
  removeHide,
  removeLike,
} from "@/actions";
import {
  EditIcon,
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
import { Listings } from "@/components/Listings";
import { Offers } from "@/components/Offers";
import { DEFAULT_LIST_ITEMS_COUNT, PROFILE_TABS } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import { ActivityTypes, InactiveNftTypes, NftTypes } from "@/utils/types";
import { ListModal } from "@/components/ListModal";
import { errorAlert, successAlert } from "@/components/ToastGroup";
import useScroll from "@/utils/useScroll";

const profileName = "My Profile";

import { metaFaviconData, pageMetadata } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: pageMetadata.profile.title,
  description: pageMetadata.profile.description,
  icons: metaFaviconData,
};

export default function ProfilePage() {
  const query = useSearchParams();
  const router = useRouter();
  const { openSettingModal } = useModal();
  const { profile, userData, getUserData, getProfileData } = useUser();

  const [sort, setSort] = useState("");
  const [sortAscending, setSortAscending] = useState<string>("asc");
  const [search, setSearch] = useState("");
  const [isDense, setIsDense] = useState(true);
  const [loading, setLoading] = useState(true);
  const [endPageLoading, setEndPageLoading] = useState(false);

  const [nftByOwner, setNftByOwner] = useState<NftTypes[] | InactiveNftTypes[]>(
    []
  );
  const [activeListing, setActiveListing] = useState<
    NftTypes | InactiveNftTypes | undefined
    >(undefined);
  const [actByUser, setActByUser] = useState<ActivityTypes[]>([]);

  const { top, height } = useScroll();
  const tab = useMemo(() => {
    let t = "1";
    if (query && query?.get("tab")) {
      t = query?.get("tab") as string;
    }
    return t;
  }, [query]);

  useEffect(() => {
    if (loading) return;
    handleFetchStatsData(true);
  }, [search, tab, sort]);

  // Fetch initial data when reloading
  useEffect(() => {
    handleFetchStatsData(true);
  }, [router]);

  useEffect(() => {
    if (loading || !nftByOwner) return;
    if (nftByOwner && top > 400 * nftByOwner.length - height) {
      handleFetchStatsData(false);
    }
  }, [height, loading, nftByOwner, top, tab, sort]);

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
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res);
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData);
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
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res);
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData);
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
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setNftByOwner(res);
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData);
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "4") {
        getLikes({
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear && res) {
              setNftByOwner(res);
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData);
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "5") {
        getHides({
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear && res) {
              setNftByOwner(res);
            } else {
              const oldData: NftTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setNftByOwner(oldData);
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
      if (tab === "6") {
        getActivityByUser({
          userId: userData.id,
          startId: withClear
            ? 0
            : Math.floor(nftByOwner.length / DEFAULT_LIST_ITEMS_COUNT) + 1,
          offset: DEFAULT_LIST_ITEMS_COUNT,
          limit: DEFAULT_LIST_ITEMS_COUNT,
        })
          .then(res => {
            setEndPageLoading(
              !res?.length || res.length % DEFAULT_LIST_ITEMS_COUNT != 0
            );
            if (withClear) {
              setActByUser(res);
            } else {
              const oldData: ActivityTypes[] = Object.assign(nftByOwner);
              oldData.push(...res);
              setActByUser(oldData);
              window.scrollTo(0, lastSroll);
            }
          })
          .finally(() => {
            setLoading(false);
          });
      }
    },
    [endPageLoading, top, tab, userData.id, sortAscending, sort, search, nftByOwner]
  );

  const handleEditProfile = async () => {
    openSettingModal();
    getProfileData();
    getUserData();
  };

  const selectActiveIdx = (nft: NftTypes | InactiveNftTypes) => {
    setActiveListing(nft);
  };

  const removeNftLike = async (nft: InactiveNftTypes) => {
    if (!nft?.like) return;
    const succes = await removeLike(nft.like.id);
    if (succes) {
      successAlert("Favourite removed!");
      await getLikes({
        startId: 0,
        offset: DEFAULT_LIST_ITEMS_COUNT,
        limit: DEFAULT_LIST_ITEMS_COUNT,
      }).then(nftData => {
        if (nftData) setNftByOwner(nftData);
      });
    } else {
      errorAlert("Remove failed!");
    }
  };

  const removeNftHide = async (nft: InactiveNftTypes) => {
    if (!nft?.hide) return;
    const succes = await removeHide(nft.hide.id);
    if (succes) {
      successAlert("Hidden removed!");
      await getHides({
        startId: 0,
        offset: DEFAULT_LIST_ITEMS_COUNT,
        limit: DEFAULT_LIST_ITEMS_COUNT,
      }).then(nftData => {
        if (nftData) setNftByOwner(nftData);
      });
    } else {
      errorAlert("Remove failed!");
    }
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
              {PROFILE_TABS.map((item, key) => (
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
            <button
              className="flex items-center gap-2 group"
              onClick={handleEditProfile}
            >
              <EditIcon />{" "}
              <Typography className="text-[18px] font-semibold group-hover:text-secondary">
                Edit
              </Typography>
            </button>
          </div>
          <div className="border-b-[0.5px] border-light-400 relative z-10  mt-6"></div>
          <div
            className={`relative flex gap-3 mt-6 lg:mt-12 z-20 ${tab === "4" ||
              tab === "5" ||
              tab === "7" ||
              tab === "8" ||
              tab === "9"
              ? "hidden"
              : "show"
              }`}>
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
                onChange={e => setSearch(e.target.value || "")}
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
          <div
            className={`mt-[28px] lg:mt-[38px] flex relative z-10 ${tab === "7" || tab === "8" || tab === "9" ? "hidden" : "show"
              }`}
          >
            <div
              className={`hidden w-[300px] ${tab === "4" || tab === "5" ? "lg:hidden" : "lg:block"
                }`}
            >
              {nftByOwner && nftByOwner.length > 0 && nftByOwner[0] && (
                <CollectionFilter nft={nftByOwner[0] as unknown as NftTypes} />
              )}
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {(tab === "1" || tab === "2" || tab === "3") && (
                <NftGrid
                  nftData={nftByOwner}
                  setActiveItem={selectActiveIdx}
                  isDense={isDense}
                />
              )}
              {tab === "4" && (
                <NftGrid
                  nftData={nftByOwner}
                  setActiveItem={removeNftLike}
                  isDense={isDense}
                  isInactive={true}
                />
              )}
              {tab === "5" && (
                <NftGrid
                  nftData={nftByOwner}
                  setActiveItem={removeNftHide}
                  isDense={isDense}
                  isInactive={true}
                />
              )}
              {tab === "6" && <ActivityDetail actData={actByUser} />}
            </div>
          </div>
          {tab === "7" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Listings loading={loading} setLoading={setLoading} />
            </div>
          )}
          {tab === "8" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offers loading={loading} tab={tab} setLoading={setLoading} />
            </div>
          )}
          {tab === "9" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offers loading={loading} tab={tab} setLoading={setLoading} />
            </div>
          )}
        </div>
      </MainLayout>
      {activeListing && (
        <ListModal nft={activeListing as unknown as NftTypes} />
      )}
    </>
  );
}
