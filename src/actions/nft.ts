import axios from "axios";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";
import { NftParams } from "@/utils/types";

export async function getNft(collectionId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(
      `${API_BASE_URL}/api/nft/${collectionId}`,
      { withCredentials: true }
    );
    console.log("nfts", response);
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

export async function getNftbyOwner(userId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(
      `${API_BASE_URL}/api/nft/owner/${userId}`,
      { withCredentials: true }
    );
    console.log("nft by owner", response);
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

export async function getNftByMinter(userId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(
      `${API_BASE_URL}/api/nft/minter/${userId}`,
      { withCredentials: true }
    );
    console.log("nft by owner", response);
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

export async function createNft(createData: NftParams) {
  try {
    await checkAuthorization();
    const response = await axios.post(`${API_BASE_URL}/api/nft`, createData, {
      withCredentials: true,
    });
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
