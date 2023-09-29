import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "@/config";

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
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
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
      console.error(`Axios Error: ${error.message}`);
    } else {
      // Handle other errors (e.g., JSON parsing errors, unexpected errors) here
      console.error(error);
    }
    return null; // Return null when an error occurs
  }
}

export async function signOut(): Promise<string | null> {
  try {
    const response = await axios
      .post(`${API_BASE_URL}/api/auth/signout`, {}, { withCredentials: true })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
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

export async function refresh(): Promise<string | null> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/auth/refresh`,
      {},
      { withCredentials: true }
    );
    console.log("refresh", response);
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

export async function validate(): Promise<boolean> {
  try {
    const response = await axios
      .post(`${API_BASE_URL}/api/auth/validate`, {}, { withCredentials: true })
      .then((res) => res.data)
      .catch((e) => {
        throw e;
      });
    console.log("validate", response);
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

export async function checkAuthorization(): Promise<void> {
  const notExpired = await validate();
  if (!notExpired) await refresh();
}
