import axios from "axios";
import { API_BASE_URL } from "@/config";
import { ProfileItem } from "@/utils/types";
import { checkAuthorization } from ".";

export async function getProfile(): Promise<ProfileItem | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const response = await axios
      .get(`${API_BASE_URL}/api/profile`, { headers })
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

export async function getProfileById(
  userId: string
): Promise<ProfileItem | null> {
  try {
    const response = await axios
      .get(`${API_BASE_URL}/api/profile/${userId}`)
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
  bio?: string;
  twitter?: string;
  discord?: string;
  facebook?: string;
  reddit?: string;
  email?: string;
  offerToken?: string;
  minOfferThreshold?: bigint;
  avatarId?: string;
  bannerId?: string;
}): Promise<string | null> {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    const {
      bio,
      twitter,
      discord,
      facebook,
      reddit,
      email,
      offerToken,
      minOfferThreshold,
      avatarId,
      bannerId,
    } = updateData;

    const response = await axios
      .patch(
        `${API_BASE_URL}/api/profile`,
        {
          bio,
          twitter,
          discord,
          facebook,
          email,
          offerToken,
          minOfferThreshold: minOfferThreshold?.toString(),
          reddit,
          avatarId,
          bannerId,
        },
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

export async function createPhoto(image: File) {
  try {
    await checkAuthorization();
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(`${API_BASE_URL}/api/file`, formData, {
      headers,
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
    const response = await axios.get(`${API_BASE_URL}/api/file/${photoId}`);
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
    const accessToken = localStorage.getItem("accessToken");
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("file", image);
    const response = await axios.post(
      `${API_BASE_URL}/api/file/${photoId}`,
      formData,
      {
        headers,
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
