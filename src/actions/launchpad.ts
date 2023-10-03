import axios from "axios";
import { API_BASE_URL } from "@/config";
import { CreateLaunchpadParam } from "@/utils/types";
import { checkAuthorization } from ".";

export async function createLaunchpad(createData: CreateLaunchpadParam) {
  try {
    console.log("create data", createData);
    await checkAuthorization();
    const response = await axios.post(
      `${API_BASE_URL}/api/launchpad`,
      createData,
      { withCredentials: true }
    );
    console.log("response", response);
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

export async function getLaunchpad() {
  try {
    await checkAuthorization();
    const response = await axios.get(`${API_BASE_URL}/api/launchpad`, {
      withCredentials: true,
    });
    console.log("launchpad", response);
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

export async function getLaunchpadById(id: number) {
  try {
    await checkAuthorization();
    const response = await axios.get(`${API_BASE_URL}/api/launchpad/${id}`, {
      withCredentials: true,
    });
    console.log("launchpad by Id", response);
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
