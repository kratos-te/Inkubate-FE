export type VariantSize = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
export type CollectionItem = {
    title: string,
    collectionId: string,
    totalSupply: number,
    owners: number,
    listed: number,
    sales: number,
    pfp: string,
    floorPrice: number,
    volume: number,
    description: string,
    cover: string,
    verified?: boolean,
}
export type NftItem = {
    name: string,
    image: string,
    price: number,
    last?: number,
    ownerBy: string,
    rarity: number,
    contract: string,
    nftId: number,
    favorited: boolean,
}
export type StatsItem = {
    rank: number
    collection: CollectionItem,
    volumeH24: number,
    volumeD7: number,
}

export type ModalItem = {
  nft: NftItem;
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
};