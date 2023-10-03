"use client";
import { signIn, signOut, signUp } from "@/actions";
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useUser } from "./UserContext";
// import { useAccount, useSignMessage } from "wagmi";

// import { signIn, signUp } from "@/actions";

interface AuthContextType {
  signed: boolean;
  sign: () => void;
  logout: () => void;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  signed: false,
  sign: () => {},
  logout: () => {},
  setSigned: () => {},
  signature: "",
  setSignature: () => {},
  accessToken: "",
  setAccessToken: () => { },
  refreshToken: "",
  setRefreshToken: () => { },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// const message = "Connected with Inkubate";

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isConnected } = useAccount();
  // const { signMessageAsync } = useSignMessage();
  const [signed, setSigned] = useState(false);
  const [signature, setSignature] = useState("");
  const { userAddress, getUserData } = useUser();
  const { signMessageAsync } = useSignMessage();
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const message = "Connected with Inkubate";

  const sign = async () => {
    console.log("signed");
    setSigned(true);
  };

  const logout = () => {
    console.log("logout");
    signOut(accessToken)
    setAccessToken("");
    setRefreshToken("");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setSigned(false);
  };

  const contextValue: AuthContextType = {
    signed,
    sign,
    logout,
    setSigned,
    signature,
    setSignature,
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
  };

  useEffect(() => {
    const localAccessToken = localStorage.getItem("accessToken");
    if (localAccessToken) setAccessToken(localAccessToken);
    const localRefreshToken = localStorage.getItem("refreshToken");
    if (localRefreshToken) setRefreshToken(localRefreshToken);
  }, []);

  const signInWallet = useCallback(async () => {
    const nonce = await signUp(userAddress);
    const verifyMsg = `${message}\nnonce:${nonce}`;
    signMessageAsync({ message: verifyMsg })
      .then(async (sign) => {
        const token = await signIn(userAddress, sign.toString());
        if (token) {
          console.log("token", token.accessToken)
          setAccessToken(token.accessToken);
          localStorage.setItem("accessToken", token.accessToken);
          setRefreshToken(token.refreshToken);
          localStorage.setItem("refreshToken", token.refreshToken)
          getUserData();
        }
      })
      .catch((e) => {
        console.log("====", e);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAddress]);

  useEffect(() => {
    if (!userAddress) return;
    if (!isConnected) {
      // signOut();
      return;
    }
    signInWallet();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, userAddress]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

