import axios from "axios";
import { API_BASE_URL } from "@/config";
import { DEFAULT_LIST_ITEMS_COUNT } from "@/config";
import {
  CollectionParam,
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
): Promise<CollectionParam[]> {
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
      .get(`${API_BASE_URL}/api/collection?${queryString}`)
      .then((res) => res.data);

    return response;
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

export async function getStatByCollectionId(collectionId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/collection/id/${collectionId}`
    );
    console.log("stat collection", response.data);
    return response.data;
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
