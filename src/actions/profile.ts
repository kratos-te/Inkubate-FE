import axios from "axios";
import { API_BASE_URL } from "@/config";
import { ProfileItem } from "@/utils/types";
import { checkAuthorization } from ".";

export async function getProfile(): Promise<ProfileItem | null> {
  try {
    await checkAuthorization();
    const response = await axios
      .get(`${API_BASE_URL}/api/profile`, { withCredentials: true })
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

export async function updateProfile(updateData: {
  bio: string;
  twitter: string;
  discord: string;
  facebook: string;
  reddit: string;
  avatarId?: string;
  bannerId?: string;
}): Promise<string | null> {
  try {
    await checkAuthorization();
    const { bio, twitter, discord, facebook, reddit, avatarId, bannerId } =
      updateData;
    console.log("update ");
    const response = await axios
      .patch(
        `${API_BASE_URL}/api/profile`,
        {
          bio: bio,
          twitter: twitter,
          discord: discord,
          facebook: facebook,
          reddit: reddit,
          avatarId: avatarId,
          bannerId: bannerId,
        },
        { withCredentials: true }
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

export async function createPhoto(image: File) {
  try {
    await checkAuthorization();
    const formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(`${API_BASE_URL}/api/file`, formData, {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
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

export async function getPhoto(photoId: string) {
  try {
    await checkAuthorization();
    const response = await axios.get(`${API_BASE_URL}/api/file/${photoId}`, {
      withCredentials: true,
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

export async function updatePhoto(image: File, photoId: string) {
  try {
    await checkAuthorization();
    const formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(
      `${API_BASE_URL}/api/file/${photoId}`,
      formData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
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
