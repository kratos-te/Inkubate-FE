"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount } from "wagmi";

import { getProfile, getUser } from "@/actions";
import { UserItem, ProfileItem } from "@/utils/types";
import { addMonths, startOfToday } from "date-fns";

interface UserContextType {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  userAddress: string;
  setUserAddress: React.Dispatch<React.SetStateAction<string>>;
  // token: string;
  // setToken: React.Dispatch<React.SetStateAction<string>>;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  endDate: Date;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  startTime: string;
  setStartTime: React.Dispatch<React.SetStateAction<string>>;
  endTime: string;
  setEndTime: React.Dispatch<React.SetStateAction<string>>;
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
  startDate: new Date(),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
  startTime: "",
  setStartTime: () => {},
  endTime: "",
  setEndTime: () => {},
  // token: "",
  // setToken: () => {},
  userData: { id: "", username: "", walletAddress: "" },
  setUserData: () => {},
  getUserData: () => {},
  profile: {
    bio: "",
    twitter: "",
    discord: "",
    facebook: "",
    reddit: "",
    avatarId: "",
    bannerId: "",
    avatar: {
      id: "",
      url: "",
      fileEntityId: "",
    },
    banner: {
      id: "",
      url: "",
      fileEntityId: "",
    },
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
  const today = startOfToday();
  const [username, setUsername] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addMonths(today, 1));
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  // const [token, setToken] = useState("");
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
    avatarId: "",
    bannerId: "",
    avatar: {
      id: "",
      url: "",
      fileEntityId: "",
    },
    banner: {
      id: "",
      url: "",
      fileEntityId: "",
    },
  });

  const getUserData = async () => {
    const user = await getUser();
    if (user) {
      setUserData({
        id: user.id,
        username: user.username,
        walletAddress: user.walletAddress,
      });
    }
    const profile = await getProfile();
    if (profile) {
      setProfile({
        bio: profile.bio,
        twitter: profile.twitter,
        discord: profile.discord,
        facebook: profile.facebook,
        reddit: profile.reddit,
        avatarId: profile.avatarId,
        bannerId: profile.bannerId,
        avatar: profile.avatar,
        banner: profile.banner,
      });
    }
  };

  const getProfileData = async () => {};

  const contextValue: UserContextType = {
    username,
    setUsername,
    userAddress,
    setUserAddress,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    // token,
    // setToken,
    userData,
    setUserData,
    getUserData,
    profile,
    setProfile,
    getProfileData,
    // nftData,
    // setNftData,
  };

  useEffect(() => {
    console.log("=========");
    getUserData();
  }, [address, isConnected]);

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
