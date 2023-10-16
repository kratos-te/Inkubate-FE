import {
  MenuFavorIcon,
  MenuListIcon,
  MenuOfferIcon,
  MenuSettingIcon,
  MenuUserIcon,
} from "./components/SvgIcons";

// Define your backend API base URL in your environment variables
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : "https://marketapi.5thweb.io";

export const INFURN_APU_KEY = "dfb6591f687e4a37b958417070e73dab";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const ZERO_HASH =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const SALT =
  "24446860302761739304752683030156737591518664810215442929804740456659635214915";
export const DEFAULT_GAS = BigInt("3000000");
export const MIN_GAS = BigInt("500000");
export const DEFAULT_GAS_PRICE = BigInt("20000000000");
export const MIN_GAS_PRICE = BigInt("1000000000");

export const HEADER_LINKS = [
  {
    title: "Explore",
    link: "/explore",
  },
  {
    title: "Stats",
    link: "/stats",
  },
  {
    title: "Bridge",
    link: "/bridge",
  },
  {
    title: "Launchpad",
    link: "/launchpad",
  },
];

export const PROFILE_TABS = [
  {
    tab: "1",
    title: "NFTS",
    value: "nfts",
  },
  {
    tab: "2",
    title: "ERC-1155 NFTS",
    value: "erc-1155",
  },
  {
    tab: "3",
    title: "Created",
    value: "created",
  },
  {
    tab: "4",
    title: "Favorite",
    value: "favorite",
  },
  {
    tab: "5",
    title: "Hidden",
    value: "hidden",
  },
  {
    tab: "6",
    title: "Activity",
    value: "activity",
  },
  {
    tab: "7",
    title: "Listing",
    value: "listing",
  },
  {
    tab: "8",
    title: "Buy Offer",
    value: "buyoffer",
  },
  {
    tab: "9",
    title: "Sell Offer",
    value: "selloffer",
  },
];

export const DROPDOWN_LINKS = [
  {
    icon: MenuUserIcon,
    title: "My Nfts",
    link: "/profile?tab=1",
  },
  {
    icon: MenuFavorIcon,
    title: "Favourites",
    link: "/",
  },
  {
    icon: MenuListIcon,
    title: "Listings",
    link: "/profile?tab=7",
  },
  {
    icon: MenuOfferIcon,
    title: "Offers",
    link: "/profile?tab=8",
  },
  {
    icon: MenuSettingIcon,
    title: "Settings",
    link: "/",
  },
];
export const DEMO_COLLECTIONS = [
  {
    title: "Optimistic",
    collectionId: "opbunnies",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "HeyMint",
    collectionId: "heymint",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Bueno",
    collectionId: "bueno",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Magic Eden",
    collectionId: "magiceden",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Magic Eden",
    collectionId: "magiceden",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Magic Eden",
    collectionId: "magiceden",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Magic Eden",
    collectionId: "magiceden",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
  {
    title: "Magic Eden",
    collectionId: "magiceden",
    totalSupply: 3900,
    owners: 2400,
    listed: 2.4,
    sales: 1100,
    pfp: "/assets/images/pfp-demo.gif",
    floorPrice: 0.025,
    volume: 31.2,
    description:
      "The first NFTs on Optimism. Optimistic Bunnies NFT is a collection of 5151 unique bunnies featuring 100+ traits. They have great personalities and are optimistic about the future. Adopt one and show off your awesome personality. Owner of the NFT has right to the image. Minting is open at https://www.optiland.xyz",
    cover: "/assets/images/cover-demo.png",
    verified: true,
  },
];

export const DEMO_NFTS = [
  {
    name: "Galxe#1344",
    image: "/assets/images/nft-demo.png",
    price: 0.056,
    ownerBy: "gley.eth",
    rarity: 3500,
    contract: "0x2f05e799C61b600c65238a9DF060cABA63Db8E78",
    nftId: 56,
    favorited: false,
  },
];

export const SORT_LIST = [
  {
    title: "Price low to high",
    value: "p-l-h",
  },
  {
    title: "Price high to low",
    value: "p-h-l",
  },
  {
    title: "Recently listed",
    value: "rl",
  },
  {
    title: "Best offer",
    value: "be",
  },
  {
    title: "Highest last sale",
    value: "hls",
  },
  {
    title: "Recently sold",
    value: "rs",
  },
  {
    title: "Recently created",
    value: "rc",
  },
  {
    title: "Most viewed",
    value: "mv",
  },
  {
    title: "Oldest",
    value: "o",
  },
  {
    title: "Most favorited",
    value: "mf",
  },
  {
    title: "Ending soon",
    value: "es",
  },
  {
    title: "Recently received",
    value: "rce",
  },
];

export const PROPERTIES = [
  {
    traitType: "Background",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Body",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Head",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Personality",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Neck",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Clothes",
    value: "Color",
    description: "Lorem",
  },
  {
    traitType: "Eyes",
    value: "Color",
    description: "Lorem",
  },
];

export const DEMO_ACTIVITY = [
  {
    event: "sale",
    item: {
      name: "Galxe#1344",
      image: "/assets/images/nft-demo.png",
      price: 0.056,
      ownerBy: "gley.eth",
      rarity: 3500,
      contract: "0x2f05e799C61b600c65238a9DF060cABA63Db8E78",
      nftId: 56,
      favorited: false,
    },
    price: 0.025,
    from: "0x2f05e799C61b600c65238a9DF060cABA63Db8E78",
    to: "0x2f05e799C61b600c65238a9DF060cABA63Db8E78",
    timeStamp: 1691766542,
  },
];

export const DEMO_CHART = [
  { day: "6-30", value: 1.68 },
  { day: "7-1", value: 1.07 },
  { day: "7-2", value: 1.16 },
  { day: "7-3", value: 2 },
  { day: "7-4", value: 1.77 },
  { day: "7-5", value: 1.25 },
  { day: "7-6", value: 1.57 },
  { day: "7-7", value: 1.48 },
  { day: "7-8", value: 1.19 },
  { day: "7-9", value: 1.91 },
  { day: "7-10", value: 1.23 },
  { day: "7-11", value: 1.61 },
  { day: "7-12", value: 1.41 },
  { day: "7-13", value: 1.05 },
  { day: "7-14", value: 1.82 },
  { day: "7-15", value: 1.83 },
  { day: "7-16", value: 1.17 },
  { day: "7-17", value: 1.51 },
  { day: "7-18", value: 1.41 },
  { day: "7-19", value: 1.44 },
  { day: "7-20", value: 1.28 },
  { day: "7-21", value: 1.06 },
  { day: "7-22", value: 1.06 },
  { day: "7-23", value: 1.67 },
  { day: "7-24", value: 1.79 },
  { day: "7-25", value: 1.25 },
  { day: "7-26", value: 1.26 },
  { day: "7-27", value: 1.94 },
  { day: "7-28", value: 1.89 },
  { day: "7-29", value: 1.68 },
  { day: "7-30", value: 1.55 },
  { day: "7-31", value: 1.09 },
  { day: "8-1", value: 1.77 },
  { day: "8-2", value: 1.3 },
  { day: "8-3", value: 1.61 },
  { day: "8-4", value: 1.2 },
  { day: "8-5", value: 1.45 },
  { day: "8-6", value: 1.41 },
  { day: "8-7", value: 1.62 },
  { day: "8-8", value: 1.96 },
  { day: "8-9", value: 1.68 },
  { day: "8-10", value: 1.08 },
  { day: "8-11", value: 1.88 },
  { day: "8-12", value: 1.91 },
];

export const DATE_RANGE = [
  {
    title: "1 Day",
    type: "day",
    range: 1,
  },
  {
    title: "3 Days",
    type: "day",
    range: 3,
  },
  {
    title: "1 Month",
    type: "month",
    range: 1,
  },
  {
    title: "3 Months",
    type: "month",
    range: 3,
  },
  {
    title: "6 months",
    type: "month",
    range: 6,
  },
];

export const DURATION_RANGE = ["1 day", "7 days", "30 days", "Custom"];
export const TOKEN = ["ETH", "USDT", "USDC", "WETH"];

export const NOTIFICATIONS = [
  {
    pfp: "/assets/images/nft-demo.png",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "3 minutes ago",
  },
  {
    pfp: "/assets/images/nft-demo.png",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "3 minutes ago",
  },
  {
    pfp: "/assets/images/nft-demo.png",
    title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    time: "3 minutes ago",
  },
];
