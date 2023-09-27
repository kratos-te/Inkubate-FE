"use client";
import { getProfile, getUser } from "@/utils/api";
import { UserItem, ProfileItem } from "@/utils/types";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount } from "wagmi";

interface UserContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userAddress: string;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  userData: UserItem;
  setUserData: React.Dispatch<React.SetStateAction<UserItem>>;
  getUserData: () => void;
  profile: ProfileItem;
  setProfile: React.Dispatch<React.SetStateAction<ProfileItem>>;
  getProfileData: () => void;
}

const UserContext = createContext<UserContextType>({
  username: "",
  setUsername: () => {},
  userAddress: "",
  setUserAddress: () => {},
  date: "",
  setDate: () => {},
  userData: { id: "", username: "", walletAddress: "" },
  setUserData: () => {},
  getUserData: () => {},
  profile: {
    bio: "",
    twitter: "",
    discord: "",
    facebook: "",
    reddit: "",
  },
  setProfile: () => {},
  getProfileData: () => {},
});

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [date, setDate] = useState("");
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    walletAddress: "",
  });
  const [profile, setProfile] = useState({
    bio: "",
    twitter: "",
    discord: "",
    facebook: "",
    reddit: "",
  });

  const getUserData = async () => {
    const profile = await getProfile();
    console.log("profile", profile)
    if (profile) {
      setProfile({
        bio: profile.bio,
        twitter: profile.twitter,
        discord: profile.discord,
        facebook: profile.facebook,
        reddit: profile.reddit,
      });
    }
    const user = await getUser();
    console.log("user", user)
    if (user) {
      setUserData({
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress,
      });
    }

  };

  const getProfileData = async () => {

  };

  const contextValue: UserContextType = {
    username,
    setUsername,
    userAddress,
    setUserAddress,
    date,
    setDate,
    userData,
    setUserData,
    getUserData,
    profile,
    setProfile,
    getProfileData,
  };

  useEffect(() => {
    getUserData();
    getProfileData();
  }, [address]);

  useEffect(() => {
    let name = "";
    if (address) {
      name =
        (address as string).slice(0, 5) + "..." + (address as string).slice(-5);
      setUsername(name);
      setUserAddress(address.toString());
    }
  }, [address, isConnected]);

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
