import axios from "axios";
import { UserTypes } from "@/utils/types";
import { API_BASE_URL } from "@/config";
import { checkAuthorization } from ".";

export async function getAllUsers(search?: string) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/user?contains=${search}`
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

export async function getUser(): Promise<UserTypes | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios
      .get(`${API_BASE_URL}/api/user/me`, { headers })
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

export async function getUserById(userId: string): Promise<UserTypes | null> {
  try {
    const response = await axios
      .get(`${API_BASE_URL}/api/user/${userId}`)
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

export async function availableUsername(
  username: string
): Promise<string | null> {
  try {
    const response = await axios
      .post(`${API_BASE_URL}/api/user/available-username`, {
        username: username,
      })
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

export async function updateUsername(username: string): Promise<string | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios
      .patch(
        `${API_BASE_URL}/api/user/update-username`,
        { username: username },
        { headers }
      )
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
