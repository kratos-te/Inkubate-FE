import { BACKEND_API_URL } from "@/config";
import axios from "axios";

// export const updateUsername = async () => {
//   try {
//     const res = await axios.post(
//       `${BACKEND_API_URL}/api/v1/userupdate-username`,
//       { payload: "", usernameDto: "" }
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

export const getNonce = async (userAddress: string) => {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/api/auth/nonce`, {
      walletAddress: userAddress,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (userAddress: string, signature: string) => {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/api/auth/signin`, {
      walletAddress: userAddress,
      signature: signature,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async () => {
  try {
    // const headers = {
    //   'Content-Type': 'application/json',
    //   'Authorization': "Bearer" + " " + token
    // }
    const res = await axios.post(`${BACKEND_API_URL}/api/auth/signout`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
