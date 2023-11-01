import axios from "axios";
import { API_BASE_URL } from "@/config";

export async function getActivityByUser(userId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/activity/user/${userId}?filterBy=ACTIVITY`
    );
    console.log("activity", response);
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
