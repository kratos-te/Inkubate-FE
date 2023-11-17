import { OrderType, Side } from "./constants";
export type VariantSize =
  | "2xs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl";

export type NftItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  last?: number;
  ownerBy: string;
  rarity: number;
  contract: string;
  tokenAddress: string;
  tokenId: string;
  tokenUri: string;
  favorited: boolean;
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

export type UserTypes = {
  id: string;
  username: string;
  walletAddress: string;
  profile: ProfileItem;
};

export type ProfileItem = {
  bio: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  email: string;
  offerToken: string;
  minOfferThreshold: bigint;
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

export interface CreateLaunchpadParam extends UpdateLaunchpadParam {
  name: string;
  symbol: string;
  desc: string;
  logoId: string;
  imageId: string;
  enableReserveTokens: boolean;
  network: string;
  twitter?: string;
  discord?: string;
  facebook?: string;
  reddit?: string;
}

export interface UpdateLaunchpadParam {
  mintPrice: bigint;
  supply: number;
  owners: string[];
  ownerRoyalties: number[];
  maxPerTx: number;
  maxPerWallet: number;
  wlEnabled: boolean;
  wlAddresses: string[];
  startDate: string;
  endDate: string;
  prefix?: string;
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
  creatorId: string;
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
  collection: CollectionParam;
  collectionId: string;
  collectionUri: string;
  prefix: string;
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
  supply: number;
  mintPrice: bigint;
  launchpadId: string;
  network: string;
  twitter: string;
  discord: string;
  website: string;
  verified: boolean;
  nfts: NftTypes[];
  stats: StatTypes[];
}

export interface InputData {
  input: any;
  input_rank: number | null;
}

export interface ChartType {
  day: string;
  value: number;
}

export interface NftParams {
  collectionId: string;
  contractType: string;
  price: string;
  network: string;
  txHash: string;
}

export interface NftTypes {
  id: string;
  tokenAddress: string;
  assetUrl: string;
  attributes: AttributesTypes[];
  collection: CollectionParam;
  collectionId: string;
  contractType: string;
  image: string;
  minterId: string;
  name: string;
  tokenId: string;
  owner: UserItem;
  ownerId: string;
  royalty: number;
  createdAt: string;
  updatedAt: string;
}

export interface InactiveNftTypes {
  id: string;
  tokenAddress: string;
  assetUrl: string;
  collectionId: string;
  contractType: string;
  image: string;
  minterId: string;
  name: string;
  tokenId: string;
  owner: UserItem;
  ownerId: string;
  royalty: number;
  createdAt: string;
  updatedAt: string;
  like?: LikeTypes;
  hide?: HideTypes;
}

export interface HideTypes {
  id: string;
}

export interface LikeTypes {
  id: string;
}

export interface AttributesTypes {
  trait_type: string;
  value: string;
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
  totalOriginalConsiderationItems?: string; // BigNumber
  conduitKey: string;
};

export type CancelParameters = {
  offerer: string;
  zone: string;
  offer: OfferItem[];
  consideration: ConsiderationItem[];
  orderType: OrderType;
  startTime: string; // BigNumber
  endTime: string; //
  zoneHash: string;
  salt: string;
  conduitKey: string;
  counter: bigint;
};

export type OrderComponents = OrderParameters & {
  counter: string /* BigNumber */;
};

export type BasicOrderParameters = {
  considerationToken: string;
  considerationIdentifier: string;
  considerationAmount: string; // BigNumber / uint256
  offerer: string;
  zone: string;
  offerToken: string;
  offerIdentifier: string;
  offerAmount: string;
  basicOrderType: BasicOrderType;
  startTime: string;
  endTime: string;
  zoneHash: string;
  salt: string;
  offererConduitKey: string;
  fulfillerConduitKey: string;
  totalOriginalAdditionalRecipients: string;
  additionalRecipients: AdditionalRecipient[];
  signature: string;
};

export type AdvancedOrder = {
  parameters: OrderParameters;
  numerator: string;
  denominator: string;
  signature: string;
  extraData: string;
};

export type CriteriaResolver = {
  orderIndex: string;
  side: Side;
  index: string;
  identifier: string;
  criteriaProof: string;
};

export type FulfillmentComponent = {
  orderIndex: string;
  itemIndex: string;
};

export type Fulfillment = {
  offerComponents: FulfillmentComponent[];
  considerationComponents: FulfillmentComponent[];
};

export type AdditionalRecipient = {
  amount: string;
  recipient: string;
};

export type ListingTypes = {
  id: string;
  nftId: string;
  nft: NftTypes;
  price: bigint;
  sellerId: string;
  seller: UserItem;
  network: string;
  status: string;
  startTime: Date;
  endTime: Date;
  signature: string;
  createdAt: Date;
};

export type OfferTypes = {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  nft: NftTypes;
  nftId: string;
  offerPrice: bigint;
  signature: string;
  parameters: string;
  expiresAt: Date;
  status: string;
  createdAt: Date;
  buyer?: UserTypes;
};

export type ActivityTypes = {
  id: string;
  actionType: string;
  buyerId: string;
  buyer: UserTypes;
  nftId: string;
  nft: NftTypes;
  sellerId: string;
  seller: UserTypes;
  txHash: string;
  createdAt: Date;
  price: bigint;
};

export type NotificationTypes = {
  id: string;
  type: string;
  userId: string;
  acknowledged: boolean;
  activityId: string;
  activity: ActivityTypes;
  createdAt: string;
};

export type StatTypes = {
  id: string;
  owners: number;
  listedItems: number;
  salesItems: number;
  floorPrice: bigint;
  volume: bigint;
  increased: number;
  period: PeriodType;
};
enum BasicOrderType {
  ETH_TO_ERC721_FULL_OPEN,
  ETH_TO_ERC721_PARTIAL_OPEN,
  ETH_TO_ERC721_FULL_RESTRICTED,
  ETH_TO_ERC721_PARTIAL_RESTRICTED,
  ETH_TO_ERC1155_FULL_OPEN,
  ETH_TO_ERC1155_PARTIAL_OPEN,
  ETH_TO_ERC1155_FULL_RESTRICTED,
  ETH_TO_ERC1155_PARTIAL_RESTRICTED,
  ERC20_TO_ERC721_FULL_OPEN,
  ERC20_TO_ERC721_PARTIAL_OPEN,
  ERC20_TO_ERC721_FULL_RESTRICTED,
  ERC20_TO_ERC721_PARTIAL_RESTRICTED,
  ERC20_TO_ERC1155_FULL_OPEN,
  ERC20_TO_ERC1155_PARTIAL_OPEN,
  ERC20_TO_ERC1155_FULL_RESTRICTED,
  ERC20_TO_ERC1155_PARTIAL_RESTRICTED,
  ERC721_TO_ERC20_FULL_OPEN,
  ERC721_TO_ERC20_PARTIAL_OPEN,
  ERC721_TO_ERC20_FULL_RESTRICTED,
  ERC721_TO_ERC20_PARTIAL_RESTRICTED,
  ERC1155_TO_ERC20_FULL_OPEN,
  ERC1155_TO_ERC20_PARTIAL_OPEN,
  ERC1155_TO_ERC20_FULL_RESTRICTED,
  ERC1155_TO_ERC20_PARTIAL_RESTRICTED,
}

export enum PeriodType {
  HOUR = "HOUR",
  SIX_HOURS = "SIX_HOURS",
  DAY = "DAY",
  WEEK = "WEEK",
  ALL = "ALL",
}

export enum StatsSortBy {
  VOLUME = "VOLUME",
  LIQUIDITY = "LIQUIDITY",
  FLOOR = "FLOOR",
  SALES = "SALES",
  ITEMS = "ITEMS",
  LISTED = "LISTED",
  OWNERS = "OWNERS",
}

export enum SortType {
  ASC = "asc",
  DESC = "desc",
}

export enum UserFilterByOption {
  ERC721_NFTS = "ERC721_NFTS",
  ERC1155_NFTS = "ERC1155_NFTS",
  CREATED = "CREATED",
  ACTIVITY = "ACTIVITY",
  FAVORITE = "FAVORITE",
  HIDDEN = "HIDDEN",
  LISTING = "LISTING",
  BUY_OFFER = "BUY_OFFER",
  SELL_OFFER = "SELL_OFFER",
}
