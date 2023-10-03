"use client";
import { useEffect, useState, useMemo } from "react";
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
import { useModal } from "@/contexts/ModalContext";
import MainLayout from "@/layouts/MainLayout";
import { Meta } from "@/layouts/Meta";
import { useRouter, useSearchParams } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import ProfileOverviewLoader from "@/components/ProfileOverview/Loader";
import ActivityDetail from "@/components/ActivityDetail";
import { useUser } from "@/contexts/UserContext";
import { getNftbyOwner } from "@/actions/nft";
import { NftTypes } from "@/utils/types";
import { Listings } from "@/components/Listings";
import { Offer } from "@/components/Offer";
// import { AcceptModal } from "@/components/AcceptModal";

export default function ProfilePage() {
  const query = useSearchParams();
  const router = useRouter();
  const { openSettingModal } = useModal();
  const { userData } = useUser();

  // const tab = query?.get("tab");
  const filter = query?.get("filter");
  const profileName = "My Profile";

  const { profile, getUserData, getProfileData } = useUser();
  const [sort, setSort] = useState("p-l-h");
  const [isDense, setIsDense] = useState(true);
  const [loading, setLoading] = useState(true);
  const [nftByOwner, setNftByOwner] = useState<NftTypes[]>([]);

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

  const handleEditProfile = async () => {
    openSettingModal();
    getProfileData();
    getUserData();
  };

  useEffect(() => {
    const getNftData = async () => {
      const nftData = await getNftbyOwner(userData.id);
      console.log("NFTs", nftData);
      if (nftData) {
        setNftByOwner(nftData.data);
      }
    };
    getNftData();
  }, [userData]);
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
              {tabs.map((item, key) => (
                <button
                  key={key}
                  onClick={() =>
                    router.push(`?tab=${tab}&filter=${item.value}`)
                  }
                  className={`text-light-100 text-[12px] lg:text-[15px] duration-300 font-semibold font-readex rounded-xl uppercase py-2.5 px-[14px] ${
                    filter === item.value
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
          <div className="border-b-[0.5px] border-light-400 relative z-10">
            <button
              onClick={() => router.push(`?tab=1`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ${
                tab === "1"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Items
            </button>
            <button
              onClick={() => router.push(`?tab=2`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ml-[30px] ${
                tab === "2"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Activity
            </button>
            <button
              onClick={() => router.push(`?tab=3`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ml-[30px] ${
                tab === "3"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Listings
            </button>
            <button
              onClick={() => router.push(`?tab=4`)}
              className={`text-[15px] font-semibold py-2 border-b-2 ml-[30px] ${
                tab === "4"
                  ? "text-secondary border-secondary"
                  : "text-light-200 border-transparent"
              }`}
            >
              Offer
            </button>
          </div>
          <div className="relative flex gap-3 mt-6 lg:mt-12 z-20">
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
              tab === "1" || tab === "2" ? "show" : "hidden"
            }`}
          >
            <div className="hidden lg:block w-[300px]">
              <CollectionFilter />
            </div>
            <div className="w-full lg:w-[calc(100%-350px)] lg:ml-[50px]">
              {tab === "1" && (
                <NftGrid
                  nftData={nftByOwner}
                  collectionId="opbunnies"
                  isDense={isDense}
                />
              )}
              {tab === "2" && <ActivityDetail nftData={nftByOwner} />}
            </div>
          </div>
          {tab === "3" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Listings />
            </div>
          )}
          {tab === "4" && (
            <div className="flex gap-3 mt-9 lg:mt-12  relative z-20">
              <Offer />
            </div>
          )}
        </div>
      </MainLayout>
      {/* {DEMO_NFTS[0] && <AcceptModal nft={DEMO_NFTS[0]} />} */}
    </>
  );
}

const tabs = [
  {
    title: "NFTS",
    value: "nfts",
  },
  {
    title: "ERC-115 NFTS",
    value: "erc-115",
  },
  {
    title: "Created",
    value: "created",
  },
  {
    title: "Favorite",
    value: "favorite",
  },
  {
    title: "Hidden",
    value: "hidden",
  },
  {
    title: "Activity",
    value: "activity",
  },
];
