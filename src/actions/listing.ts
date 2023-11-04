import axios from "axios";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";

interface GetLIST {
  startId: number;
  offset: number;
  limit: number;
}

export async function listingNft(
  id: string,
  signature: string,
  parameters: string,
  network: string
) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/listing`,
      {
        nftId: id,
        signature,
        parameters,
        network,
      },
      { headers }
    );
    console.log("listing", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getlistingNft() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/listing`);
    console.log("Listings", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function cancelList(
  id: string,
  nftId: string,
  txHash: string,
  network: string
) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/listing/cancel`,
      {
        id: id,
        nftId,
        txHash,
        network,
      },
      {
        headers: headers,
      }
    );
    console.log("cancel listing", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getListByUser({ startId, offset, limit }: GetLIST) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/listing/user${startId ? "?startId=" + startId : ""}${
        offset ? "&offset=" + offset : ""
      }${limit ? "&limit=" + limit : ""}`,
      {
        headers,
      }
    );
    console.log("listing", response);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function getListByNft(nftId: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/listing/nft/${nftId}`
    );
    console.log("list by nft", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function buyNow(
  id: string,
  nftId: string,
  txHash: string,
  network: string
) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/listing/buy`,
      {
        id,
        nftId,
        txHash,
        network,
      },
      {
        headers: headers,
      }
    );
    console.log("direct buy listing", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}
