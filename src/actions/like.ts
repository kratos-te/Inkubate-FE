import axios from "axios";
import { InactiveNftTypes, UserFilterByOption } from "@/utils/types";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";

interface NftAPIParam {
  startId?: number;
  offset?: number;
  limit?: number;
}

export async function createLikes(
  nftId: string
): Promise<InactiveNftTypes[] | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${API_BASE_URL}/api/like`,
      { nftId },
      { headers }
    );
    console.log("like", response.data);
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

export async function getLikes({ startId, offset, limit }: NftAPIParam) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(
      `${API_BASE_URL}/api/like?filterBy=${UserFilterByOption.FAVORITE}${
        startId ? "&startId=" + startId : ""
      }${offset ? "&offset=" + offset : ""}${limit ? "&limit=" + limit : ""}`,
      {
        headers,
      }
    );
    // return response.map((data: any) => ({
    //   ...data.nft,
    //   assetUrl: data.tokenUri,
    //   like: {
    //     id: data.id,
    //   },
    // }));
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

export async function getLikeByNft(
  nftId: string
): Promise<InactiveNftTypes | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios.get(`${API_BASE_URL}/api/like/${nftId}`, {
      headers,
    });
    console.log("Like by Nft", response);
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

export async function removeLike(id: string): Promise<boolean> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    await axios
      .delete(`${API_BASE_URL}/api/like/${id}`, {
        headers,
      })
      .catch((e) => {
        throw e;
      });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return false; // Return null when an error occurs
  }
}
