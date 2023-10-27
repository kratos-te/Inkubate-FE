import axios from "axios";
import { API_STAT_URL } from "@/config";

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
