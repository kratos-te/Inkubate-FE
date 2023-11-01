import axios from "axios";
import { API_BASE_URL } from "@/config";

export async function getAllCollections(contains?: string) {
  try {
    const response = await axios
      .get(
        `${API_BASE_URL}/api/collection?contains=${contains ? contains : ""}`
      )
      .then((res) => res.data);
    console.log("collection", response);
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

export async function getCollectionById(id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/collection/${id}`);
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
      `${API_BASE_URL}/api/collection/${contract}`
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
