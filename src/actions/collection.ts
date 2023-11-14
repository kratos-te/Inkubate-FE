import axios from "axios";
import { API_BASE_URL } from "@/config";

interface CollectionUrl {
  search?: string;
  startId?: number;
  offset?: number;
  limit?: number;
}

export async function getAllCollections({
  search,
  startId,
  offset,
  limit,
}: CollectionUrl) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/collection${offset ? "?offset=" + offset : ""}${
        limit ? "&limit=" + limit : ""
      }${startId ? "&startId=" + startId : ""}${
        search ? "?contains=" + search : ""
      }`
    );
    console.log("collection", response);
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

export async function getCollectionById(id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collection/id/${id}`);
    console.log("collection by Id", response);
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

export async function getCollectionByContract(contract: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/collection/id/${contract}`
    );
    console.log("collection by Id", response);
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

export async function getTopCollections(period: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collection/top`, {
      params: { period },
    });
    console.log("top colleciton", response.data);
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

export async function getNotableCollections() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collection/notable`);
    console.log("notable", response.data);
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

export async function getFeaturedCollections() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collection/feature`);
    console.log("feature", response.data);
    return response.data || [];
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
