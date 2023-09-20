"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextType {
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    userAddress: string;
    setUserAddress: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextType>({
    userName: "",
    setUserName: () => { },
    userAddress: "",
    setUserAddress: () => { }
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
    const [userName, setUserName] = useState("");
    const [userAddress, setUserAddress] = useState("");

    const contextValue: UserContextType = {
        userName,
        setUserName,
        userAddress,
        setUserAddress
    };

    return (
        <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
    );
};
