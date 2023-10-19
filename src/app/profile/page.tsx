"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Skeleton from "react-loading-skeleton";

import {
  getActivityByUser,
  getListByUser,
  getNftbyOwner,
  getOfferByBuy,
  getOfferBySell,
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
import { PROFILE_TABS } from "@/config";
import { useModal } from "@/contexts/ModalContext";
import { useUser } from "@/contexts/UserContext";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import {
  ActivityTypes,
  ListingTypes,
  NftTypes,
  OfferTypes,
} from "@/utils/types";
import { ListModal } from "@/components/ListModal";

const profileName = "My Profile";

export default function ProfilePage() {
  const query = useSearchParams();
  const router = useRouter();
  const { openSettingModal } = useModal();
  const { profile, userData, getUserData, getProfileData } = useUser();

  const [sort, setSort] = useState("p-l-h");
  const [isDense, setIsDense] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nftByOwner, setNftByOwner] = useState<NftTypes[]>([]);
  const [activeListing, setActiveListing] = useState<NftTypes | undefined>(
    undefined
  );
  const [_activeBuy, setActiveBuy] = useState<NftTypes | undefined>(undefined);
  const [listByUser, setListByUSer] = useState<ListingTypes[]>([]);
  const [offerByBuy, setOfferByBuy] = useState<OfferTypes[]>([]);
  const [offerBySell, setOfferBySell] = useState<OfferTypes[]>([]);
  const [actByUser, setActByUser] = useState<ActivityTypes[]>([]);

  const tab = useMemo(() => {
    let t = "1";
    if (query && query?.get("tab")) {
      t = query?.get("tab") as string;
    }
    return t;
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  useEffect(() => {
    const getNftData = async () => {
      const nftData = await getNftbyOwner(userData.id);
      const listingData = await getListByUser();
      const buyOffer = await getOfferByBuy();
      const sellOffer = await getOfferBySell();
      const activity = await getActivityByUser();
      setListByUSer(listingData?.data);
      setOfferByBuy(buyOffer?.data);
      setOfferBySell(sellOffer?.data);
      setActByUser(activity?.data);
      if (nftData) {
        setNftByOwner(nftData.data);
      }
    };
    getNftData();
  }, [userData]);

  const handleEditProfile = async () => {
    openSettingModal();
    getProfileData();
    getUserData();
  };

  const selectActiveNftIdx = (nft: NftTypes) => {
    setActiveListing(nft);
  };

  const selectBuyNftIdx = (nft: NftTypes) => {
    setActiveBuy(nft);
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
            <ProfileOverview />
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
            className={`relative flex gap-3 mt-6 lg:mt-12 z-20 ${
              tab === "7" || tab === "8" || tab === "9" ? "hidden" : "show"
            }`}
          >
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
              <SortDropdown value={sort} setValue={setSort} />
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
            className={`mt-[28px] lg:mt-[38px] flex relative z-10 ${
              tab === "7" || tab === "8" || tab === "9" ? "hidden" : "show"
            }`}
          >
            <div className="hidden lg:block w-[300px]">
              {nftByOwner[0] && <CollectionFilter nft={nftByOwner[0]} />}
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {tab === "1" && (
                <NftGrid
                  nftData={nftByOwner}
                  setActiveListing={selectActiveNftIdx}
                  setActiveBuy={selectBuyNftIdx}
                  collectionId="opbunnies"
                  isDense={isDense}
                />
              )}
              {tab === "6" && <ActivityDetail actData={actByUser} />}
            </div>
          </div>
          {tab === "7" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Listings listData={listByUser} />
            </div>
          )}
          {tab === "8" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offers offerData={offerByBuy} />
            </div>
          )}
          {tab === "9" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offers offerData={offerBySell} />
            </div>
          )}
        </div>
      </MainLayout>
      {activeListing && <ListModal nft={activeListing} />}
    </>
  );
}
