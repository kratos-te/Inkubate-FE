import { OrderType } from "./constants";
export type VariantSize =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";
export type CollectionItem = {
  title: string;
  collectionId: string;
  totalSupply: number;
  owners: number;
  listed: number;
  sales: number;
  pfp: string;
  floorPrice: number;
  volume: number;
  description: string;
  cover: string;
  verified?: boolean;
};
export type NftItem = {
  name: string;
  image: string;
  price: number;
  last?: number;
  ownerBy: string;
  rarity: number;
  contract: string;
  nftId: number;
  favorited: boolean;
};
export type StatsItem = {
  rank: number;
  collection: CollectionItem;
  volumeH24: number;
  volumeD7: number;
};

export type ModalItem = {
  nft: NftTypes;
  className?: string;
};

export type TokenButton = {
  icon: string;
  symbol: string;
};

export type UserItem = {
  id: string;
  username: string;
  walletAddress: string;
};

export type ProfileItem = {
  bio: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  avatarId: string;
  bannerId: string;
  avatar: PhotoItem;
  banner: PhotoItem;
};

export type PhotoItem = {
  id: string;
  url: string;
  fileEntityId: string;
};

export interface CreateLaunchpadParam {
  name: string;
  symbol: string;
  desc: string;
  logoId: string;
  imageId: string;
  mintPrice: bigint;
  supply: number;
  owners: string[];
  ownerRoyalties: number[];
  maxPerTx: number;
  maxPerWallet: number;
  wlEnabled: boolean;
  wlAddresses: string[];
  enableReserveTokens: boolean;
  startDate: string;
  endDate: string;
  network: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  collectionUri: string;
}

export interface LaunchpadParam {
  id: string;
  name: string;
  symbol: string;
  desc: string;
  logoId: string;
  logoImg: PhotoItem;
  imageId: string;
  image: PhotoItem;
  mintPrice: bigint;
  supply: number;
  owners: string[];
  ownerRoyalties: number[];
  maxPerTx: number;
  maxPerWallet: number;
  wlEnabled: boolean;
  wlAddresses: string[];
  enableReserveTokens: boolean;
  startDate: string;
  endDate: string;
  network: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  collectionUri: string;
}

export interface CollectionParam {
  id: string;
  name: string;
  address: string;
  desc: string;
  avatarId: string;
  avatar: PhotoItem;
  bannerId: string;
  banner: PhotoItem;
  mintPrice: bigint;
  launchpadId: number;
  network: string;
  twitter: string;
  discord: string;
  website: string;
  verified: boolean;
}

export interface InputData {
  input: any;
  input_rank: number | null;
}

export interface NftParams {
  collectionId: string;
  name: string;
  nftId: string;
  address: string;
  assetUrl: string;
  imgUrl: string;
  royalty: Number;
  contractType: string;
  attributes: string;
}

export interface NftTypes {
  id: string;
  address: string;
  assetUrl: string;
  attributes: string[];
  collection: CollectionParam;
  collectionId: string;
  contractType: string;
  imgUrl: string;
  minterId: string;
  name: string;
  nftId: string;
  owner: UserItem;
  ownerId: string;
  royalty: number;
  createdAt: string;
}

export interface OfferItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string; // BigNumber / uint256
  startAmount: string; // BigNumber / uint256
  endAmount: string; // BigNumber / uint256
}

export interface ConsiderationItem {
  itemType: number;
  token: string;
  identifierOrCriteria: string; // BigNumber / uint256
  startAmount: string; // BigNumber / uint256
  endAmount: string; // BigNumber / uint256
  recipient: string;
}

export type OrderParameters = {
  offerer: string;
  orderType: OrderType;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  startTime: string; // BigNumber
  endTime: string; // BigNumber
  zone: string;
  zoneHash: string;
  salt: string;
  totalOriginalConsiderationItems: string; // BigNumber
  conduitKey: string;
};

export type OrderComponents = OrderParameters & {
  counter: string /* BigNumber */;
};

export type ListingTypes = {
  id: string;
  nftId: string;
  nft: NftTypes;
  price: bigint;
  sellerId: string;
  status: string;
  expiresAt: Date;
};

export type OfferTypes = {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  nft: NftTypes;
  nftId: string;
  offerPrice: bigint;
  txHash: string;
  expiresAt: Date;
  status: string;
  createdAt: Date;
};