"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
// import { useAccount, useSignMessage } from "wagmi";

// import { signIn, signUp } from "@/actions";

interface AuthContextType {
  signed: boolean;
  sign: () => void;
  logout: () => void;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>({
  signed: false,
  sign: () => {},
  logout: () => {},
  setSigned: () => {},
  signature: "",
  setSignature: () => {},
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
  // const { address } = useAccount();
  // const { signMessageAsync } = useSignMessage();
  const [signed, setSigned] = useState(false);
  const [signature, setSignature] = useState("");

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
  };

  // const [loading, setLoading] = useState(false);

  // const walletSign = async () => {
  //   if (!address) return;
  //   setLoading(true);
  //   const nonce = await signUp(address);
  //   const verifyMsg = `${message}\nnonce:${nonce}`;
  //   signMessageAsync({ message: verifyMsg })
  //     .then(async sign => {
  //       const token = await signIn(address, sign.toString());
  //       console.log("token", token);
  //       if (token) {
  //         localStorage.setItem("accessToken", token);
  //       }
  //     })
  //     .catch(e => {
  //       console.log("wallet sign in error:", e);
  //     });
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   console.log("===============", loading);
  // }, [loading]);

  // useEffect(() => {
  //   if (isConnected && address) {
  //     walletSign();
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [address, isConnected]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
