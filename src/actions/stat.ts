import axios from "axios";
import { API_STAT_URL } from "@/config";
import { API_INDEXER_URL, DEFAULT_LIST_ITEMS_COUNT } from "@/config";
import {
  CollectionStats,
  PeriodType,
  SortType,
  StatsSortBy,
} from "@/utils/types";

export interface StatsQueryParams {
  filter?: string;
  period?: PeriodType;
  sortBy?: string;
  sortType?: SortType;
  pageId?: number;
  offset?: number;
  limit?: number;
}

export async function getAllStats(
  params: StatsQueryParams
): Promise<CollectionStats[]> {
  const period = params.period || PeriodType.DAY;
  const sortBy = params.sortBy || StatsSortBy.VOLUME;
  const sortType = params.sortType || SortType.DESC;
  const offset = params.offset || DEFAULT_LIST_ITEMS_COUNT;
  const startId = params.pageId || 0;
  const limit = DEFAULT_LIST_ITEMS_COUNT;

  let queryString = `period=${period}&sortBy=${sortBy}&sortAscending=${sortType}`;

  if (params.filter) queryString += `&contains=${params.filter}`;
  if (offset)
    queryString += `&offset=${offset}&startId=${startId}&limit=${limit}`;

  try {
    const response = await axios
      .get(`${API_INDEXER_URL}/api/stat?${queryString}`)
      .then((res) => res.data);

    let result = response.map((stat: any) => ({
      collection: {
        title: stat.collection.name,
        collectionId: stat.collectionId,
        totalSupply: stat.collection.supply,
        owners: stat.owners,
        listed: stat.listedItems,
        sales: stat.salesItems,
        pfp: stat.collection.avatar?.url,
        floorPrice: stat.floorPrice,
        volume: stat.volume,
        description: stat.collection.desc,
        cover: stat.collection.banner?.url,
        verified: stat.collection.verified || false,
      },
      liquidity: stat.increased,
    }));
    return result;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return []; // Return null when an error occurs
  }
}

export async function getTopCollection(range: string) {
  try {
    const response = await axios.post(`${API_STAT_URL}/api/stat/top`, {
      sortBy: range,
    });
    console.log("top colleciton", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getFeature() {
  try {
    const response = await axios.get(`${API_STAT_URL}/api/stat/feature`);
    console.log("feature", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getNotable() {
  try {
    const response = await axios.get(`${API_STAT_URL}/api/stat/notable`);
    console.log("notable", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getStatByCollectionId(collectionId: string) {
  try {
    const response = await axios.get(
      `${API_STAT_URL}/api/stat/${collectionId}`
    );
    console.log("stat collection", response.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}
