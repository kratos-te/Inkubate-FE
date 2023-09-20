"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SessionContextType {
  signed: boolean;
  sign: () => void;
  logout: () => void;
  setSigned: React.Dispatch<React.SetStateAction<boolean>>;
  signature: string;
  setSignature: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

const SessionContext = createContext<SessionContextType>({
  signed: false,
  sign: () => {},
  logout: () => {},
  setSigned: () => {},
  signature: "",
  setSignature: () => {},
  token: "",
  setToken: () => {},
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

interface SessionProviderProps {
  children: ReactNode;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
  children,
}) => {
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

  const contextValue: SessionContextType = {
    signed,
    sign,
    logout,
    setSigned,
    signature,
    setSignature,
    token,
    setToken,
  };

  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
