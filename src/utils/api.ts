import axios, { AxiosResponse } from "axios";
import { UserItem } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
  ? process.env.NEXT_PUBLIC_API_BASE_URL
  : "http://localhost:8080"; // Define your backend API base URL in your environment variables

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

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
      .then(res => res.data);
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
      .then(res => res.data);
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
      .then(res => res.data);
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

export async function updateUsername(username: string): Promise<string | null> {
  try {
    const response = await axios
      .patch(
        `${API_BASE_URL}/api/user/update-username`,
        { username: username },
        { withCredentials: true }
      )
      .then(res => res.data);
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
      .then(res => res.data);
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

export async function getProfile() {
  try {
    const response = await axios
      .get(`${API_BASE_URL}/api/profile`, { withCredentials: true })
      .then(res => res.data);
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
// export async function signUp(userAddress: string): Promise<string | null> {
//   try {
//     const response: AxiosResponse<string> = await axios.post(
//       `${API_BASE_URL}/api/auth/nonce`,
//       {
//         walletAddress: userAddress,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       // Handle Axios errors (e.g., network issues, 4xx/5xx responses) here
//       throw new Error(`Axios Error: ${error.message}`);
//     } else {
//       // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
//       return null; // Return null when an error occurs
//     }
//   }
// }

// export const updateUsername = async () => {
//   try {
//     const res = await axios.post(
//       `${BACKEND_API_URL}/api/v1/userupdate-username`,
//       { payload: "", usernameDto: "" }
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

// export const signIn = async (userAddress: string, signature: string) => {
//   try {
//     const res = await axios.post(`${BACKEND_API_URL}/api/auth/signin`, {
//       walletAddress: userAddress,
//       signature: signature,
//     });
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const signOut = async () => {
//   try {
//     // const headers = {
//     //   'Content-Type': 'application/json',
//     //   'Authorization': "Bearer" + " " + token
//     // }
//     const res = await axios.post(`${BACKEND_API_URL}/api/auth/signout`);
//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
