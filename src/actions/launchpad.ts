import axios from "axios";
import { API_BASE_URL } from "@/config";
import { CreateLaunchpadParam } from "@/utils/types";
import { checkAuthorization } from ".";

export async function createLaunchpad(createData: CreateLaunchpadParam) {
  await checkAuthorization();
  const accessToken = localStorage.getItem("accessToken");
  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };
  const res = await axios.post(`${API_BASE_URL}/api/launchpad`, createData, {
    headers,
  });
  return res.data;
}

export async function getLaunchpad() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/launchpad`);
    console.log("launchpad", response);
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

export async function getLaunchpadById(id: string) {
  try {
    const res = await axios.get(`${API_BASE_URL}/api/launchpad/${id}`);
    console.log("launchpad By Id :", res.data);
    return res.data;
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
