"use client";
import { getNonce } from "@/utils/api";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useAccount, useSignMessage } from "wagmi";

interface AuthContextType {
  signed: boolean;
  sign: () => void;
  logout: () => void;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  signed: false,
  sign: () => {},
  logout: () => {},
  setSigned: () => {},
  signature: "",
  setSignature: () => {},
  token: "",
  setToken: () => {},
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

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { address, isConnected } = useAccount();

  const { data, signMessageAsync } = useSignMessage();
  const [signed, setSigned] = useState(false);
  const [signature, setSignature] = useState("");
  const [token, setToken] = useState("");

  const sign = async () => {
    console.log("signed");
    setSigned(true);
  };

  const logout = () => {
    console.log("logout");
    setSigned(false);
  };

  const contextValue: AuthContextType = {
    signed,
    sign,
    logout,
    setSigned,
    signature,
    setSignature,
    token,
    setToken,
  };

  const [loading, setLoading] = useState(false);

  const walletSign = async () => {
    if (!address) return;
    setLoading(true);
    const nonce = await getNonce(address);
    if (nonce) {
      await signMessageAsync({
        message: `Connected with Inkubate\nnonce:${nonce}`,
      }).then(sign => {
        console.log(sign);
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("===============", loading);
  }, [loading]);

  useEffect(() => {
    console.log("address, isConnected", address, isConnected);
    if (isConnected) {
      walletSign();
    }
  }, [address, isConnected]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
