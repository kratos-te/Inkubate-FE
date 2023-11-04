import axios from "axios";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";

interface GetOffer {
  startId: number;
  offset: number;
  limit: number;
}

export async function createOffer(
  nftId: string,
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
      `${API_BASE_URL}/api/offer`,
      {
        nftId,
        signature,
        parameters,
        network,
      },
      { headers }
    );
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

export async function getOfferBySell({ startId, offset, limit }: GetOffer) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/offer/sell${startId ? "?startId=" + startId : ""}${
        offset ? "&offset=" + offset : ""
      }${limit ? "&limit=" + limit : ""}`,
      {
        headers,
      }
    );
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

export async function getOfferByBuy({ startId, offset, limit }: GetOffer) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/offer/buy${startId ? "?startId=" + startId : ""}${
        offset ? "&offset=" + offset : ""
      }${limit ? "&limit=" + limit : ""}`,
      {
        headers,
      }
    );
    console.log("offer", response);
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

export async function getOffersByNftId(nftId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(`${API_BASE_URL}/api/offer/nft/${nftId}`);
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

export async function acceptListingOffer(
  offerId: string,
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
      `${API_BASE_URL}/api/offer/accept`,
      {
        id: offerId,
        txHash,
        network,
      },
      { headers }
    );
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

export const cancelOffer = async (id: string, network: string) => {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/offer`,
      { id, network },
      { headers }
    );

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
};
