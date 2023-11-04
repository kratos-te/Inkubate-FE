import axios from "axios";
import { API_BASE_URL } from "@/config";

interface ACTAPIParam {
  userId: string;
  startId?: number;
  offset?: number;
  limit?: number;
}

export async function getActivityByUser({
  userId,
  startId,
  offset,
  limit,
}: ACTAPIParam) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/activity/user/${userId}?filterBy=ACTIVITY${
        startId ? "&startId=" + startId : ""
      }${offset ? "&offset=" + offset : ""}${limit ? "&limit=" + limit : ""}`
    );
    console.log("activity", response);
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

export async function getActivityByCollection(collectionId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/activity/collection/${collectionId}`
    );
    console.log("activity by collection", response);
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

export async function getActivityByNft(nftId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/activity/nft/${nftId}`
    );
    console.log("activity by nft", response);
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
