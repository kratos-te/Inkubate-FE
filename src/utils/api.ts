import axios, { AxiosResponse } from "axios";
import { ProfileItem, UserItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : "http://localhost:8080"; // Define your backend API base URL in your environment variables

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

// @ts-ignore
BigInt.prototype.toJSON = function () {
  return this.toString();
};

// axiosInstance.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${localStorage.getItem("accessToken")}`;

// export const api = {
//   // Example function for making a GET request
//   async get(endpoint: string) {
//     try {
//       const response = await axiosInstance.get(endpoint);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }, // Example function for making a POST request

//   async post(endpoint: string, data: any) {
//     try {
//       const response = await axiosInstance.post(endpoint, data);
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   },
// };

export async function signUp(userAddress: string): Promise<string | null> {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `${API_BASE_URL}/api/auth/signup`,
      {
        walletAddress: userAddress,
      }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}
export async function signIn(
  userAddress: string,
  signature: string
): Promise<string | null> {
  try {
    const response: AxiosResponse<string> = await axios.post(
      `${API_BASE_URL}/api/auth/signin`,
      {
        walletAddress: userAddress,
        signature: signature,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function signOut(): Promise<string | null> {
  try {
    console.log("here");
    // const response = await fetch(`${API_BASE_URL}/api/auth/signout`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   credentials: "include",
    // });
    const response = await axios
      .post(`${API_BASE_URL}/api/auth/signout`, {}, { withCredentials: true })
      .then((res) => res.data);
    // let text = ""
    // if (response.status == 200) {
    //   text = await response.data
    //   console.log(text);
    // }
    console.log(response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function getUser(): Promise<UserItem | null> {
  try {
    const response = await axios
      .get(`${API_BASE_URL}/api/user/me`, { withCredentials: true })
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function availableUsername(
  username: string
): Promise<string | null> {
  try {
    const response = await axios
      .post(
        `${API_BASE_URL}/api/user/available-username`,
        { username: username },
        { withCredentials: true }
      )
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function updateUsername(username: string): Promise<string | null> {
  try {
    const response = await axios
      .patch(
        `${API_BASE_URL}/api/user/update-username`,
        { username: username },
        { withCredentials: true }
      )
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function updateProfile(updateData: {
  bio: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
}): Promise<string | null> {
  try {
    const { bio, twitter, discord, facebook, reddit } = updateData;
    const response = await axios
      .patch(
        `${API_BASE_URL}/api/profile`,
        {
          bio: bio,
          twitter: twitter,
          discord: discord,
          facebook: facebook,
          reddit: reddit,
        },
        { withCredentials: true }
      )
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function getProfile(): Promise<ProfileItem | null> {
  try {
    const response = await axios
      .get(`${API_BASE_URL}/api/profile`, { withCredentials: true })
      .then((res) => res.data);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}

export async function createLaunchpad(createData: {
  name: string;
  symbol: string;
  desc: string;
  logoImg: string;
  image: string;
  mintPrice: bigint;
  supply: number;
  owners: string[];
  ownerRoyalties: number[];
  maxPerTx: number;
  maxPerWallet: number;
  wlEnabled: boolean;
  wlAddresses: string[];
  enableReserveTokens: boolean;
  startDate: string;
  endDate: string;
  network: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  collectionId: string;
}) {
  try {
    const {
      name,
      symbol,
      desc,
      logoImg,
      image,
      mintPrice,
      supply,
      owners,
      ownerRoyalties,
      maxPerTx,
      maxPerWallet,
      wlEnabled,
      wlAddresses,
      enableReserveTokens,
      startDate,
      endDate,
      network,
      twitter,
      discord,
      facebook,
      reddit,
      collectionId,
    } = createData;
    console.log("create data", createData);
    const response = await axios.post(
      `${API_BASE_URL}/api/launchpad`,
      {
        name: name,
        symbol: symbol,
        desc: desc,
        logoImg: logoImg,
        image: image,
        mintPrice: mintPrice,
        supply: supply,
        owners: owners,
        ownerRoyalties: ownerRoyalties,
        maxPerTx: maxPerTx,
        maxPerWallet: maxPerWallet,
        wlEnabled: wlEnabled,
        wlAddresses: wlAddresses,
        enableReserveTokens: enableReserveTokens,
        startDate: startDate,
        endDate: endDate,
        network: network,
        twitter: twitter,
        discord: discord,
        facebook: facebook,
        reddit: reddit,
        collectionId: collectionId,
      },
      { withCredentials: true }
    );
    console.log("response", response);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
      throw new Error(`Axios Error: ${error.message}`);
    } else {
      console.error(error);
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      return null; // Return null when an error occurs
    }
  }
}
