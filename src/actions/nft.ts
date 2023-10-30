import axios from "axios";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";
import { NftParams } from "@/utils/types";

export async function getNft(
  collectionId: string,
  ascending?: boolean,
  sortBy?: string,
  startId?: number,
  offset?: number,
  limit?: number
) {
  try {
    const query = `${API_BASE_URL}/api/nft/${collectionId}?sortAscending=${ascending}${
      sortBy ? "&sortBy=" + sortBy : ""
    }${startId ? "&startId=" + startId : ""}${
      offset ? "&offset=" + offset : ""
    }${limit ? "&limit=" + limit : ""}`;

    const response = await axios.get(query);
    console.log("nfts", response);
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

export async function getNftbyOwner(userId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(`${API_BASE_URL}/api/nft/owner/${userId}`);
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
    const response = await axios.get(
      `${API_BASE_URL}/api/nft/minter/${userId}`
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
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${API_BASE_URL}/api/nft`, createData, {
      headers,
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

export async function getNftByOne(tokenId: string, tokenAddress: string) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/nft/get`, {
      tokenId: tokenId,
      tokenAddress: tokenAddress,
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
